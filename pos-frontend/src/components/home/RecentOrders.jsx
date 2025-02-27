import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

const RecentOrders = () => {
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
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>{" "}
      </div>
    </div>
  );
};

export default RecentOrders;
