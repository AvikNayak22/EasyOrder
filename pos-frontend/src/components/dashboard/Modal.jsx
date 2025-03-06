import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setIsTableModalOpen }) => {
  const handleCloseModal = () => {
    setIsTableModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Table</h2>
          <button
            onClick={handleCloseModal}
            className="text-[#f5f5f5] hover:text-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <form className="space-y-4 mt-8">
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Table Number
            </label>
            <div className="flex items-center rounded-lg py-3 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="tableNumber"
                placeholder="Enter table number"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Number of Seats
            </label>
            <div className="flex items-center rounded-lg py-3 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="numberOfSeats"
                placeholder="Enter number of seats"
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 text-lg bg-[#f6b100] text-[#1f1f1f] font-bold rounded-lg"
          >
            Add Table
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
