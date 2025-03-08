import { FaCheckDouble, FaCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { getAvatarName } from "../../utils";

const OrderList = ({ order }) => {
  return (
    <div className="flex items-center gap-5 mb-3">
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
        {getAvatarName(order?.customerDetails?.name)}
      </button>
      <div className="flex items-start justify-between flex-1">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            {order?.customerDetails?.name}
          </h1>
          {order?.items?.length > 1 ? (
            <p className="text-[#ababab] text-sm">
              {order?.items?.length} Items
            </p>
          ) : (
            <p className="text-[#ababab] text-sm">
              {order?.items?.length} Item
            </p>
          )}
        </div>

        <div className="mx-4">
          <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg px-3 py-1.5">
            Table No: {order?.table?.tableNo}
          </h1>
        </div>

        <div className="flex flex-col items-end gap-2">
          {order?.orderStatus === "Ready" ? (
            <>
              <p className="bg-green-400/10 text-green-600 px-4 py-2 rounded-lg text-sm flex items-center">
                <FaCheckDouble className="mr-1" size={20} />
                {order?.orderStatus}
              </p>
              <p className="text-[#ababab] text-xs flex items-center">
                <FaCircle className="mr-1 text-green-600" />
                Ready to serve
              </p>
            </>
          ) : (
            <>
              <p className="bg-[#f6b100]/10 text-[#f6b100] px-4 py-2 rounded-lg text-sm flex items-center">
                <MdOutlineTimer className="mr-1" size={20} />
                {order?.orderStatus}
              </p>
              <p className="text-[#ababab] text-xs flex items-center">
                <FaCircle className="mr-1 text-[#f6b100]" />
                Preparing your order
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
