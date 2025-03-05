import { useSelector } from "react-redux";

import MenuContainer from "../components/menu/MenuContainer";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import CustomerInfo from "../components/menu/CustomerInfo";

import { MdRestaurantMenu } from "react-icons/md";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] h-full overflow-y-auto flex gap-3">
      {/* left section */}
      <div className="flex-[3] mb-16">
        <div className="flex items-center justify-between px-10 py-4 mt-2">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>
          <div className="flex items-center justify-around gap-4 mr-8">
            <div className="flex items-center gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-white text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  {customerData.tableNo || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>

      {/* right section */}
      <div className="flex-[1] mb-20 bg-[#1a1a1a] mt-4 mr-3 h-[800px] rounded-lg p-2">
        {/* Customer Info */}
        <CustomerInfo />
        <hr className="border-[#2a2a2a] border-t-2 mx-4" />
        {/* Cart Items */}
        <CartInfo />

        <hr className="border-[#2a2a2a] border-t-2 mx-4" />
        {/* Bills */}
        <Bill />
      </div>

      <BottomNav />
    </section>
  );
};

export default Menu;
