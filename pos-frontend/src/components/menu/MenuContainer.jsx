import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../../redux/slices/cartSlice";

import { menus } from "../../constants";

import { GrRadialSelected } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";

const MenuContainer = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(menus[0]);
  const [itemCount, setItemCount] = useState(0);
  const [itemId, setItemId] = useState();

  const increment = (id) => {
    setItemId(id);

    if (itemCount >= 4) return;

    setItemCount((prev) => prev + 1);
  };

  const decrement = (id) => {
    setItemId(id);

    if (itemCount <= 0) return;

    setItemCount((prev) => prev - 1);
  };

  const handleAddToCart = (item) => {
    if (itemCount === 0) return;

    const { name, price } = item;

    const newObj = {
      id: new Date(),
      name,
      pricePerQuantity: price,
      quantity: itemCount,
      price: itemCount * price,
    };

    dispatch(addItems(newObj));

    setItemCount(0);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 px-10 py-4 w-[100%]">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[100px] cursor-pointer "
              style={{ backgroundColor: menu.bgColor }}
              onClick={() => {
                setSelected(menu);
                setItemId(0);
                setItemCount(0);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {menu.icon} {menu.name}
                </h1>
                {selected.id === menu.id && (
                  <GrRadialSelected className="text-white" size={20} />
                )}
              </div>
              <p className="text-[#f5f5f5] text-sm font-semibold">
                {menu.items.length} Items
              </p>
            </div>
          );
        })}
      </div>

      <hr className="border-[#2a2a2a] border-t-2 mt-4 mx-6" />

      <div className="grid grid-cols-3 gap-4 px-10 py-4 w-[100%]">
        {selected?.items.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-start justify-between p-4 rounded-lg h-[140px] cursor-pointer bg-[#2a2a2a] hover:bg-[#383838]"
            >
              <div className="flex items-start justify-between w-full">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">
                  {item.name}
                </h1>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-[#02ca3a]/30 text-[#fafafa] p-2 rounded-lg"
                >
                  <FaShoppingCart size={20} />
                </button>
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[#f5f5f5] text-lg font-bold">
                  ₹{item.price}
                </p>
                <div className="flex items-center justify-between bg-[#262626] px-4 py-3 rounded-lg gap-6">
                  <button
                    onClick={() => decrement(item.id)}
                    className="text-[#f6b100] text-2xl"
                  >
                    &minus;
                  </button>
                  <span className="text-white">
                    {item.id === itemId ? itemCount : "0"}
                  </span>
                  <button
                    onClick={() => increment(item.id)}
                    className="text-[#f6b100] text-2xl"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MenuContainer;
