import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice, removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";

import {
  addOrder,
  updateTable,
  createOrderWithRazorpay,
  verifyPaymentWithRazorpay,
} from "../../https";

import { enqueueSnackbar } from "notistack";
import Invoice from "../invoice/Invoice";

// Helper function to dynamically load Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Bill = () => {
  const dispatch = useDispatch();

  // Get customer and cart data from Redux store
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);

  // Calculate tax and total price
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  // Local state management
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  // Handle order placement based on payment method
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }

    if (paymentMethod === "Online") {
      // Handle online payment through Razorpay
      try {
        // Load Razorpay SDK
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
          enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
            variant: "warning",
          });
          return;
        }

        // Create Razorpay order
        const reqData = {
          amount: totalPriceWithTax.toFixed(2),
        };

        const { data } = await createOrderWithRazorpay(reqData);

        // Configure Razorpay payment options
        const options = {
          key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "EasyOrder",
          description: "Secure Payment for your order",
          order_id: data.order.id,
          handler: async function (response) {
            // Verify payment after successful transaction
            const verification = await verifyPaymentWithRazorpay(response);
            enqueueSnackbar(verification.data.message, { variant: "success" });

            // Prepare order data with payment details
            const orderData = {
              customerDetails: {
                name: customerData.customerName,
                phone: customerData.customerPhone,
                guests: customerData.guests,
              },
              orderStatus: "In Progress",
              bills: {
                total: total,
                tax: tax,
                totalWithTax: totalPriceWithTax,
              },
              items: cartData,
              table: customerData.table.tableId,
              paymentMethod: paymentMethod,
              paymentData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
              },
            };

            // Place order after successful payment
            setTimeout(() => {
              orderMutation.mutate(orderData);
            }, 1500);
          },
          prefill: {
            name: customerData.name,
            email: "",
            contact: customerData.phone,
          },
          theme: { color: "#025cca" },
        };

        // Initialize Razorpay payment
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Payment Failed!", { variant: "error" });
      }
    } else {
      // Handle cash payment
      const orderData = {
        customerDetails: {
          name: customerData.customerName,
          phone: customerData.customerPhone,
          guests: customerData.guests,
        },
        orderStatus: "In Progress",
        bills: {
          total: total,
          tax: tax,
          totalWithTax: totalPriceWithTax,
        },
        items: cartData,
        table: customerData.table.tableId,
        paymentMethod: paymentMethod,
      };

      orderMutation.mutate(orderData);
    }
  };

  // Mutation for creating new order
  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (res) => {
      const { data } = res.data;

      setOrderInfo(data);

      // Prepare data for table update
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      // Update table status after order creation
      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", { variant: "success" });

      setShowInvoice(true);
    },
    onError: () => {
      enqueueSnackbar("Failed to place order!", { variant: "error" });
    },
  });

  // Mutation for updating table status
  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: () => {
      // Clear customer and cart data after successful order
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: () => {
      enqueueSnackbar("Failed to update table status!", { variant: "error" });
    },
  });

  return (
    <>
      {/* Bill Summary Section */}
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-sm text-[#ababab] font-medium mt-2">
          Items ({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-sm text-[#ababab] font-medium mt-2">Tax (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-sm text-[#ababab] font-medium mt-2">
          Total With Tax
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      {/* Payment Method Selection */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-3 w-full rounded-lg font-semibold text-[#ababab] ${
            paymentMethod === "Cash" ? "bg-[#383838]" : "bg-[#1f1f1f]"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-3 w-full rounded-lg font-semibold text-[#ababab] ${
            paymentMethod === "Online" ? "bg-[#383838]" : "bg-[#1f1f1f]"
          }`}
        >
          Online
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-md">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-md"
        >
          Place Order
        </button>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
