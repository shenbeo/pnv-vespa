import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useCart } from "react-use-cart";

export default function Header() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);

  const [open, setOpen] = useState(false);
  const { totalUniqueItems } = useCart();
  const { isOpen, setIsOpen } = useContext(AppContext);

  // =====================GET=====================
  useEffect(() => {
    axios
      .get('https://server-pnv-api.onrender.com/get/'+id)
      .then((res) => {
        setEmployee(res.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // =====================GET--LOGOUT=====================
  const handleLogout = () => {
    axios
      .get("https://server-pnv-api.onrender.com/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // =====================OPEN=====================
  const menuRef = useRef();
  const imgRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });
  return (
    <div className=" bg-[#001e2b] fixed w-full z-50 text-white shadow-md">
      <div className="py-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* ================= */}

          <div>
            <div className="flex items-center font_logo justify-center font-black italic bg-[#ff6600] w-20 py-1 ml-3   text-[#001e2b]">
              <div>
                <span className=" text-base">P</span>
                <span className=" text-xl">N</span>
                <span className=" text-base">V</span>
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-center">
            {/* <i class="ri-customer-service-fill"></i> */}

            <div className="relative   transition-all cursor-pointer rounded-full w-10 h-10 flex items-center justify-center duration-500 hover:bg-[#505050b2]">
              <i className="ri-customer-service-fill text-xl text-[#9d9d9d]"></i>
            </div>

            <div className="relative   transition-all cursor-pointer rounded-full w-10 h-10 flex items-center justify-center duration-500 hover:bg-[#505050b2] md:ml-1 ">
              <i className="ri-notification-4-fill text-xl text-[#9d9d9d]"></i>
              <div className="flex absolute bg-[#ff6600] top-0 right-0 w-4 h-4 rounded-full text-xs  items-center justify-center">
                <span className=" text-black font-bold">0</span>
              </div>
            </div>

            <div
              onClick={() => setIsOpen(!isOpen)}
              className="relative    transition-all cursor-pointer rounded-full w-10 h-10 flex items-center justify-center duration-500 hover:bg-[#505050b2]  md:ml-1"
            >
              <i className="ri-shopping-cart-fill text-xl text-[#9d9d9d]"></i>
              <div className="flex absolute bg-[#ff6600] top-0 right-0 w-4 h-4 rounded-full text-xs  items-center justify-center">
                <span className=" font-bold text-black">
                  {totalUniqueItems}
                </span>
              </div>
            </div>

            <div className="ml-2">
              <div className="flex items-center mr-3 justify-center relative overflow-hidden">
                <img
                  className="w-10 h-10 rounded-full cursor-pointer relative hover:scale-95 transition duration-500   "
                  ref={imgRef}
                  onClick={() => setOpen(!open)}
                  src={`https://server-pnv-api.onrender.com/images/`+ employee.image}
                  alt=""
                />
                <i className="ri-arrow-down-s-fill "></i>
              </div>
              <div className="  relative flex items-start justify-center">
                {open && (
                  <div
                    className=" absolute  text-[#fff] shadow-md text-sm mt-1  bg-[#001e2b] border-[1px] border-[#5a5a5a] w-[5rem] flex flex-col "
                    ref={menuRef}
                  >
                    {/* <div className='border-b-[1px] py-2 px-1  border-[#ff6600] text-start'><i className="ri-user-fill text-[#9d9d9d]"></i>{employee.name}dcedcedced</div> */}
                    <div
                      onClick={handleLogout}
                      className=" cursor-pointer  py-2 px-1 hover:bg-[#ff6600] hover:text-[#001e2b] duration-500   text-start"
                    >
                      {" "}
                      <i className="ri-logout-box-r-fill text-[#9d9d9d] mr-1"></i>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ================= */}
      </div>
    </div>
  );
}
