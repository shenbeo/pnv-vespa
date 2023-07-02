import React from "react";
import { useCart } from "react-use-cart";
import { toast } from "react-toastify";

export default function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const successDel = () => {
    toast.success("Product Deleted successfully!");
  };

  if (isEmpty)
    return (
      <div className=" text-center py-2 text-lg font-semibold">
        <p>No products!!!</p>
      </div>
    );

  return (
    <div>
      {items.map((item, index) => {
        return (
          <div key={index} className=" py-3 my-3 border-b-[1px] text-sm border-[#cccccc7e]">
            <div className="flex w-full text-sm">
              <img
                className="w-32 object-center"
                src={item.image}
                alt=""
              />

              <div className="flex flex-col w-full mr-4 ml-4">
                {/* title */}
                <div className="flex justify-between text-md">
                  <div className="font-medium hover:underline">
                    <span>{item.name}</span>
                  </div>

                  <div onClick={successDel}>
                    <div
                      onClick={() => removeItem(item.id)}
                      className=" hover:bg-[#cccccc7e] w-5 h-5 flex items-center justify-center rounded-full duration-700"
                    >
                      <i className="ri-close-fill cursor-pointer"></i>
                    </div>
                  </div>
                </div>

                {/* category */}
                <div className=" text-[#969595] text-xs mt-1 mb-1 flex">
                  <span>Color: {item.color}</span>
                </div>

                {/* price */}
                <div className="flex items-center justify-between mb-2 mt-2">
                  <span className="flex font-medium bg-[#ff6600] p-2 ">
                    $ {item.price}
                  </span>

                  <div>
                    <div className="flex items-center justify-center">
                      <i
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                        className="ri-add-line cursor-pointer flex items-center justify-center w-5 h-5 bg-[#7070707e]  hover:bg-[#ccccccbb] transition-all duration-300 rounded-full p-1"
                      ></i>
                      <span className="px-3 w-3 flex items-center  justify-center ">
                        {item.quantity}
                      </span>
                      <i
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        className="ri-subtract-line cursor-pointer flex items-center justify-center w-5 h-5 bg-[#7070707e]  hover:bg-[#ccccccbb] transition-all duration-300 rounded-full p-1"
                      ></i>
                    </div>
                  </div>
                </div>

                {/* <div className="flex justify-between items-center">
                  <h1 className="bg-[#cccccc7e] p-1">Tạm tính: </h1>
                  <div className="flex font-medium">
                    <span>{` ${parseFloat(price * amount).toFixed(3)}`}</span>
                    <h1 className="ml-1 underline">đ</h1>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
