import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Cart from "./Cart";
import { useCart } from "react-use-cart";

export default function Sidebar() {
  const { isOpen, handleClose } = useContext(AppContext);
  const { cartTotal, emptyCart } = useCart();



  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } py-2 bg-white fixed top-0   shadow-lg w-full md:max-w-[30vw] transition-all duration-500 z-50 px-3 `}
    >
      <div className="flex items-center justify-end  pb-2 mb-2 md:mb-0 border-b-[1px] border-[#ccc]">
        {/* <h1 className="flex items-center font-bold border-l-4 text-base border-red-600 text-red-600 pl-1">
          CART
          <img
            className=" w-9 ml-2"
            src="https://www.pngkit.com/png/full/116-1169537_cart-png-clipart-icon-gi-hng-png.png"
            alt=""
          />
        </h1> */}
{/* CLOSE */}
        <button
          className="hover:bg-[#cccccc4f] relative w-6 h-6 flex items-center justify-center rounded-full duration-700 transition-all cursor-pointer"
          onClick={handleClose}
        >
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>

{/* CART */}
      <div className="flex-col flex w-full overflow-y-auto max-h-[50vh]">
        <Cart />
      </div>

{/* TOTAL */}
      <div>
        <div className="flex justify-between  items-center mt-3">
          <div className="flex font-semibold">
            Total:
            <span className="ml-5 flex font-semibold text-[#ff6600]">
              $ {cartTotal}
            </span>
          </div>

{/* DEL */}
          <button
            onClick={() => emptyCart()}
            className=" bg-[#ff6600] w-10 flex items-center justify-center hover:bg-[#ff6600cb] duration-700 h-10 rounded-sm text-black"
          >
            <i className="ri-delete-bin-line text-md"></i>
          </button>
        </div>

{/* BUY */}
        <div
          onClick={handleClose}
          className=" md:my-6 my-4 bg-[#001e2b] w-full text-md font-medium  text-sm  cursor-pointer hover:bg-[#001e2bdd] duration-700  text-white flex items-center justify-center py-2"
        >
          <button>BUY</button>
        </div>
      </div>
    </div>
  );
}
