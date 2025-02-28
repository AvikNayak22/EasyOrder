import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderCard = () => {
  return (
    <div className="w-[400px] bg-[#262626] p-5 rounded-lg mb-4">
      <div className="flex items-center gap-5">
        <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
          AN
        </button>
        <div className="flex items-start justify-between w-[100%]">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
              Avik Nayak
            </h1>
            <p className="text-[#ababab] text-sm">#101/Dine In</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <p className="bg-green-400/10 text-green-600 px-4 py-2 rounded-lg text-sm">
              {" "}
              <FaCheckDouble className="inline mr-2" /> Ready
            </p>
            <p className="text-[#ababab] text-sm">
              {" "}
              <FaCircle className="inline mr-1 text-green-600" /> Ready to serve
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-[#ababab]">
        <p>February 28, 2025 13:03 AM</p>
        <p>8 Items</p>
      </div>

      <hr className="mt-4 w-full border-t-1 border-gray-500" />

      <div className="flex items-center justify-between mt-4">
        <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
        <p className="text-[#f5f5f5] text-lg font-semibold">₹250.00</p>
      </div>
    </div>
  );
};

export default OrderCard;
