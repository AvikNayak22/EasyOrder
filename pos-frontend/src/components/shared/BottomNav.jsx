import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className="text-[#f5f5f5] flex items-center justify-center bg-[#343434] w-[200px] rounded-lg"
      >
        {" "}
        <FaHome className="inline mr-3" size={25} /> <p>Home</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className="text-[#f5f5f5] flex items-center justify-center w-[200px]"
      >
        {" "}
        <MdOutlineReorder className="inline mr-3" size={25} /> <p>Orders</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className="text-[#f5f5f5] flex items-center justify-center w-[200px]"
      >
        {" "}
        <MdTableBar className="inline mr-3" size={25} /> <p>Tables</p>
      </button>
      <button className="text-[#f5f5f5] flex items-center justify-center w-[200px]">
        {" "}
        <CiCircleMore className="inline mr-3" size={25} /> <p>More</p>
      </button>

      <button className="absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3 items-center">
        <BiSolidDish size={30} />
      </button>
    </div>
  );
};

export default BottomNav;
