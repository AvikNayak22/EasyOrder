import { FaCheckDouble, FaCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { formatDateAndTime, getAvatarName } from "../../utils";

const OrderCard = ({ order }) => {
  return (
    <div className="w-[420px] bg-[#262626] p-5 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          {getAvatarName(order.customerDetails.name)}
        </button>
        <div className="flex items-start justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              {order.customerDetails.name}
            </h1>
            <p className="text-[#ababab] text-xs">
              #{Math.floor(new Date(order.orderDate).getTime())} / Dine In
            </p>
            <p className="text-[#ababab] text-xs">
              Table {order.table.tableNo}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="bg-green-400/10 text-green-600 px-4 py-2 rounded-lg text-sm">
                  {" "}
                  <FaCheckDouble className="inline mr-1" size={20} />{" "}
                  {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-xs">
                  {" "}
                  <FaCircle className="inline mr-1 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="bg-[#f6b100]/10 text-[#f6b100] px-4 py-2 rounded-lg text-sm">
                  {" "}
                  <MdOutlineTimer className="inline mr-1" size={20} />{" "}
                  {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-xs">
                  {" "}
                  <FaCircle className="inline mr-1 text-[#f6b100]" /> Preparing
                  your order
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-[#ababab] text-sm">
        <p>{formatDateAndTime(order.createdAt)}</p>
        {order.items.length > 1 ? (
          <p>{order.items.length} Items</p>
        ) : (
          <p>{order.items.length} Item</p>
        )}
      </div>

      <hr className="mt-4 w-full border-t-1 border-gray-500" />

      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">
          ₹{order.bills.totalWithTax.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
