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

  const customerData = useSelector((state) => state.customer);

  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);
  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method!", {
        variant: "warning",
      });
      return;
    }

    //load the script
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
          variant: "warning",
        });
        return;
      }

      //create order
      const reqData = {
        amount: totalPriceWithTax.toFixed(2),
      };

      const { data } = await createOrderWithRazorpay(reqData);

      const options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "EasyOrder",
        description: "Secure Payment for your order",
        order_id: data.order.id,
        handler: async function (response) {
          const verification = await verifyPaymentWithRazorpay(response);
          console.log(verification);
          enqueueSnackbar(verification.data.message, { variant: "success" });

          //Place the order
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
          };

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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Payment Failed!", { variant: "error" });
    }
  };

  const orderMutation = useMutation({
    mutationFn: (reqData) => addOrder(reqData),
    onSuccess: (res) => {
      const { data } = res.data;
      console.log(data);

      //Update Table
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };

      setTimeout(() => {
        tableUpdateMutation.mutate(tableData);
      }, 1500);

      enqueueSnackbar("Order Placed!", { variant: "success" });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const tableUpdateMutation = useMutation({
    mutationFn: (reqData) => updateTable(reqData),
    onSuccess: (res) => {
      console.log(res);
      dispatch(removeCustomer());
      dispatch(removeAllItems());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
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
    </>
  );
};

export default Bill;
