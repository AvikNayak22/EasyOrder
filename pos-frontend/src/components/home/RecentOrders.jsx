import { keepPreviousData, useQuery } from "@tanstack/react-query";

import OrderList from "./OrderList";

import { getOrders } from "../../https";

import { FaSearch } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg ">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>
        <div className="flex items-center gap-4 bg-[#2a2a2a] px-6 py-3 rounded-md mx-6">
          <FaSearch className="text-white" />
          <input
            type="text"
            placeholder="Search recent orders..."
            className=" text-white bg-transparent focus:outline-none"
          />
        </div>
        {/* Order List */}
        <div className="mt-4 px-6 overflow-y-scroll h-[300px] scrollbar-hide">
          {resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderList key={order._id} order={order} />;
            })
          ) : (
            <p className="col-span-3 text-gray-500">No orders available</p>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default RecentOrders;
