import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";

import { getAvatarName, getRandomBg } from "../../utils";

const TableCard = ({ name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (name) => {
    if (status === "Booked") return;

    dispatch(updateTable({ tableNo: name }));

    navigate(`/menu`);
  };

  return (
    <div
      onClick={() => handleClick(name)}
      className="w-[400px] hover:bg-[#2e2e2e] bg-[#262626] p-5 rounded-lg mb-4 cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">Table: {name}</h1>
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
          className={`flex items-center justify-center w-16 h-16 text-white rounded-full p-5 text-2xl`}
          style={{ backgroundColor: initials ? getRandomBg() : "#1f1f1f" }}
        >
          {getAvatarName(initials) || "N/A"}
        </h1>
      </div>
      <p className="text-[#ababab] text-sm">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
