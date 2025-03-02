import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

import { FaNotesMedical } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";

const CartInfo = () => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [cartData]);

  const handleRemove = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order details
      </h1>

      <div
        ref={scrollRef}
        className="mt-4 overflow-y-scroll scrollbar-hide h-[380px]"
      >
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center h-[380px]">
            Your cart is empty. Start adding items!
          </p>
        ) : (
          cartData.map((item) => {
            return (
              <div key={item.id} className="bg-[#262626] rounded-lg p-4 mb-2">
                <div className="flex items-center justify-between">
                  <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                    {item.name}
                  </h1>
                  <p className="text-[#ababab] font-semibold">
                    x{item.quantity}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <RiDeleteBin2Fill
                      onClick={() => handleRemove(item.id)}
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                    <FaNotesMedical
                      className="text-[#ababab] cursor-pointer"
                      size={20}
                    />
                  </div>
                  <p className="text-[#f5f5f5] text-md font-bold">
                    ₹{item.price}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CartInfo;
