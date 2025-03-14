import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

import Modal from "./Modal";

import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import { CiCircleMore } from "react-icons/ci";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if (guestCount >= 6) return;

    setGuestCount((prev) => prev + 1);
  };
  const decrement = () => {
    if (guestCount <= 0) return;

    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    //send the data to store
    dispatch(setCustomer({ name, phone, guests: guestCount }));

    navigate("/tables");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center w-[200px] rounded-lg ${
          isActive("/") ? "text-[#f5f5f5] bg-[#3e3e3e]" : "text-[#ababab]"
        }`}
      >
        {" "}
        <FaHome className="inline mr-3" size={25} /> <p>Home</p>
      </button>
      <button
        onClick={() => navigate("/orders")}
        className={`flex items-center justify-center w-[200px] rounded-lg ${
          isActive("/orders") ? "text-[#f5f5f5] bg-[#3e3e3e]" : "text-[#ababab]"
        }`}
      >
        {" "}
        <MdOutlineReorder className="inline mr-3" size={25} /> <p>Orders</p>
      </button>
      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center w-[200px] rounded-lg ${
          isActive("/tables") ? "text-[#f5f5f5] bg-[#3e3e3e]" : "text-[#ababab]"
        }`}
      >
        {" "}
        <MdTableBar className="inline mr-3" size={25} /> <p>Tables</p>
      </button>
      <button className="text-[#f5f5f5] flex items-center justify-center w-[200px]">
        {" "}
        <CiCircleMore className="inline mr-3" size={25} /> <p>More</p>
      </button>

      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-6 bg-[#f6b100] text-[#f5f5f5] rounded-full p-3 items-center"
      >
        <BiSolidDish size={30} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg px-4 py-3 bg-[#262626]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg px-4 py-3 bg-[#262626]">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="+91-9999999999"
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
            Guests
          </label>

          <div className="flex items-center justify-between bg-[#262626] px-4 py-3 rounded-lg">
            <button onClick={decrement} className="text-[#f6b100] text-2xl">
              &minus;
            </button>
            <span className="text-white">{guestCount} Person</span>
            <button onClick={increment} className="text-[#f6b100] text-2xl">
              &#43;
            </button>
          </div>
        </div>
        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#f6b100] text-white py-3 rounded-lg mt-6 hover:bg-yellow-600"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
