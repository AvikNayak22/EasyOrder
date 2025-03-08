import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getOrders, updateOrderStatus } from "../../https";
import { formatDateAndTime } from "../../utils";

import { GrUpdate } from "react-icons/gr";
import { enqueueSnackbar } from "notistack";

const RecentOrders = () => {
  const queryClient = useQueryClient();

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: () => {
      enqueueSnackbar("Order status updated!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Order update failed:", error);
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    },
  });

  // Handle Status Change
  const handleStatusChange = ({ orderId, orderStatus }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  // Fetch Orders
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="container mx-auto bg-[#262626] p-8 rounded-lg mb-12">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto rounded-lg border border-gray-600">
        <table className="w-full text-left text-[#f5f5f5]">
          <thead className="bg-[#333] text-[#ababab]">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Status",
                "Date & Time",
                "Items",
                "Table No",
                "Total",
                "Action",
              ].map((header) => (
                <th key={header} className="p-3 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resData?.data?.data?.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-600 hover:bg-[#333]"
              >
                <td className="p-4 text-center">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </td>
                <td className="p-4 text-center">
                  {order.customerDetails.name}
                </td>
                <td className="p-4 text-center">
                  <select
                    className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none transition-colors 
                      ${
                        order.orderStatus === "Ready"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        orderStatus: e.target.value,
                      })
                    }
                  >
                    <option className="text-yellow-500" value="In Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                  </select>
                </td>
                <td className="p-4 text-center">
                  {formatDateAndTime(order.createdAt)}
                </td>
                <td className="p-4 text-center">{order.items.length} Items</td>
                <td className="p-4 text-center">
                  Table - {order.table.tableNo}
                </td>
                <td className="p-4 text-center">
                  ₹{order.bills.totalWithTax.toFixed(2)}
                </td>
                <td className="p-4 text-center">
                  <button className="text-blue-400 hover:text-blue-500 transition">
                    <GrUpdate size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
