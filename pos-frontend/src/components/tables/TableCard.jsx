import { getRandomBg } from "../../utils";

const TableCard = ({ name, status, initials }) => {
  return (
    <div className="w-[400px] hover:bg-[#2e2e2e] bg-[#262626] p-5 rounded-lg mb-4 cursor-pointer">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">{name}</h1>
        <p
          className={` ${
            status === "Booked"
              ? "bg-green-400/10 text-green-600"
              : "text-[#f6b100] bg-yellow-400/10"
          }  px-4 py-2 rounded-lg text-sm`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 mb-10">
        <h1
          className={`${getRandomBg()} flex items-center justify-center w-16 h-16 text-white rounded-full p-5 text-2xl`}
        >
          {initials}
        </h1>
      </div>
    </div>
  );
};

export default TableCard;
