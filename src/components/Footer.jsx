import React from "react";
import bct from "../assets/icon/bocongthuong.png";

import pay from "../assets/icon/pay.png";

export default function Footer ()  {
  return (
    <div className="  bg-[#001e2b] text-xs  py-8">
      <div className="md:flex px-3 items-start justify-between container md:mx-auto">

        {/* N1 */}
        <div className="  flex-1 md:mb-0 mb-4 ">
          <div className="flex items-center font_logo justify-center font-black italic bg-[#ff6600] w-20 py-1 mb-3   text-[#001e2b]">
              <div>
                <span className=" text-base">P</span>
                <span className=" text-xl">N</span>
                <span className=" text-base">V</span>
              </div>
          </div>
          <div>
            <div className="text-[#e9e4e486] font-light">
              <li className="mb-2">
                Address: Binh Thanh District, HCM City
              </li>
              <li className="mb-2">
                Email: contact@pnv.com
              </li>
              <li className="mb-2">
                Fax: +8424 - 0000.0000
              </li>
              <li className="mb-1">
                Tel: (+84) 64.999.999
              </li>
            </div>
          </div>
        </div>

        {/* N2 */}
        <div className="  flex-1 md:mb-0 mb-4">
          <h1 className=" text-base font-medium mb-2 text-[#e9e4e4]">Products</h1>
          <div>
            <div className="text-[#e9e4e486] font-light">
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                GTS Super
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                Primavera
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                Sprint
              </li>
            </div>
          </div>
        </div>


        {/* N3 */}
        <div className="  flex-1 md:mb-0 mb-4">
          <h1 className=" text-base font-medium mb-2 text-[#e9e4e4]">
              Introduce
          </h1>
          <div>
            <div className="text-[#e9e4e486] font-light  ">
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                News
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                Recruitment
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                With the community
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
                 Shop system
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
              Contact
              </li>
            </div>
          </div>
        </div>

        {/* N4 */}
        <div className="  flex-1 md:mb-0 mb-4">
          <h1 className=" text-base font-medium mb-2 text-[#e9e4e4]">Contact</h1>
          <div>
            <div className="text-[#e9e4e486] font-light">
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
              Terms of Service
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
              Program for new customers
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
              Information privacy policy
              </li>
              <li className=" hover:text-[#ff6600] duration-500 transition-all cursor-pointer mb-1">
              Payment policy
              </li>
            </div>
          </div>
          <div>
            <div className="flex text-[#e9e4e4]">
              <li className=" text-xl pr-2 pt-2 pb-2 cursor-pointer hover:text-[#ff6600] transition-all duration-300">
                <i className="ri-facebook-box-fill"></i>
              </li>
              <li className=" text-xl p-2 cursor-pointer hover:text-[#ff6600] transition-all duration-300">
                <i className="ri-instagram-fill"></i>
              </li>
              <li className=" text-xl p-2 cursor-pointer hover:text-[#ff6600] transition-all duration-300">
                <i className="ri-twitter-fill"></i>
              </li>
              <li className=" text-xl p-2 cursor-pointer hover:text-[#ff6600] transition-all duration-300">
                <i className="ri-youtube-fill"></i>
              </li>
            </div>
          </div>
        </div>
        {/* N5 */}
        <div className="  flex-1 md:mb-0 mb-4">
        <h1 className=" text-base font-medium mb-2 text-[#e9e4e4]">Payment methods</h1>
        <div>
            <img className=" object-cover w-48" src={pay} alt="pay" />
        </div>
        <div className="mt-2">
            <img className=" object-cover w-20" src={bct} alt="pay" />
        </div>

        </div>
      </div>


        
        {/*  */}
      <div className="border-t border-gray-600  mt-4 font-extralight">
        <div className="md:flex items-center md:text-end justify-between container mx-auto mt-6 md:px-0 px-4 ">
          <div className=" flex-1 text-sm text-[#e9e4e4] md:mb-0 mb-4  ">
            <span>© 2023 NguyenThanhVinh </span>
          </div>
        </div>
      </div>
    </div>
  );
};

