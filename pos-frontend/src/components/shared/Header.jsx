import { FaSearch, FaUserCircle, FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-[#1a1a1a]">
      {/* logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="POS logo" className="h-12 w-12" />
        <h1 className="text-xl font-semibold text-[#f5f5f5] ">EasyOrder</h1>
      </div>

      {/* search bar */}
      <div className="flex items-center gap-4 bg-[#2a2a2a] px-4 py-3 rounded-md w-[500px]">
        <FaSearch className="text-white" />
        <input
          type="text"
          placeholder="Search..."
          className=" text-white bg-transparent focus:outline-none"
        />
      </div>

      {/* logged user details */}
      <div className="flex items-center gap-4">
        <div className="bg-[#2a2a2a] p-3 rounded-full cursor-pointer">
          <FaBell className="text-white text-2xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-white text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">Avik Nayak</h1>
            <p className="text-xs text-[#ababab] font-medium">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
