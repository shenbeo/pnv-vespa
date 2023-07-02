import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

export default function Dashboard () {

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

// =======GET====================================
    useEffect(()=>{
        axios.get('http://localhost:7000/dashboard')
        .then(res=>{
            if(res.data.Status === "Success"){
                if(res.data.role === "admin"){
                        navigate('/ad')
                }else{
                    const id= res.data.id;
                    navigate('/employeedetail'+id)
                }
            } else{
                navigate('/')
            }
        })
    },[])


// =======LOGOUT====================================
    const handleLogout = ()=>{
        axios.get('http://localhost:7000/logout')
        .then(res => {
            navigate('/')
        }).catch(err => console.log(err) )
    }


// =======SUCCESS-ADD====================================
    const successAdd = () => {
       return toast.success("Logout successfully!");
      };



  return (
    <div className='bg-slate-200  w-full md:h-[100vh]'>
        
        <div className=' container mx-auto md:flex pt-4 pb-4'>
            <div className=' flex bg-white shadow-md min-w-[280px] mt-2'>
                <div className=' p-2 w-full '>
                    <p className=' font-semibold text-xl border-b-[1px] p-2 text-green-600'>Admin</p>
    
                    {/* home */}
                            <div className=''>
                                <Link to="" className=' no-underline text-black'>
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <li className='ri-home-4-fill text-lg mr-2 text-gray-400 '></li>
                                        Dashboard
                                    </div>
                                </Link>
                             
                            </div>
    
                    {/* List users */}
                            <div className=''>
                                <Link to="/ad/listUser" className=' no-underline text-black'>
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <i className="ri-user-3-fill text-lg mr-2 text-gray-400"></i>
                                        Users
                                    </div>
                                </Link>
                            </div>

                    {/* add products */}
                             <div>
                                <Link to="/ad/addProducts" className=' no-underline text-black'  >
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <li className="ri-shopping-cart-2-fill text-lg mr-2 text-gray-400"></li>
                                        Add product
                                    </div>
                                </Link>
                            </div>
     
                    {/* List products */}
                            <div>
                                <Link to="/ad/listProducts"  className=' no-underline text-black'  >
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <li className="ri-handbag-fill text-lg mr-2 text-gray-400 "></li>
                                        Product
                                    </div>
                                    
                                </Link>
                            </div>

                    {/* slide*/}
                            {/* <div>
                                <Link to="/listProducts"  className=' no-underline text-black'  >
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <li class="ri-slideshow-fill text-lg mr-2 text-gray-400 "></li>
                                        Slide
                                    </div>
                                    
                                </Link>
                            </div> */}

                   
                    
                    {/* Logout */}
                            <div onClick={handleLogout}>
                                <Link onClick={successAdd} href="/" className=' no-underline text-black' >
                                    <div className='flex items-center font-medium justify-start p-2 duration-500  hover:bg-[#001e2b] hover:text-white'>
                                        <li className=" text-lg ri-logout-box-r-fill mr-2 text-gray-400"></li>
                                        Logout
                                    </div>
                                </Link>
                            </div>
                </div>
            </div>
    
            <div className='flex w-100 bg-white  md:ml-3 mt-2  md:mt-0'>
                    <Outlet/>
            </div>
        </div>
    </div>
  )
}
