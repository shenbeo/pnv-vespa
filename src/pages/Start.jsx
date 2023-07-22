import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import HashLoader  from "react-spinners/HashLoader"

export default function Start  ()  {

    const naigate = useNavigate()
    const [loading,setLoading] = useState(false)
    // LOADING
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2500)
    },[])


  return (
    <div className='start text-white font-light text-sm p-1 md:p-0'>
      {
          loading ? 
            <HashLoader   color="#76f6f6"
            // height={50}
            // width={00}
            size={80}
            loading={loading}/>
            : 
            <div className=' bg-[#1f1f1f7c] min-w-[320px]  py-8 rounded-xl border-[#5c5c5c]  border-[1px] p-3'>
                <div className=' mb-6 text-center'>
                    <span className='text-2xl font-bold '>Welcome</span>
                </div>
                <hr />
                {/* <div className='flex items-center justify-start'>
                    <div className='ri-home-4-fill text-sm text-[#bdbdbd]'></div>
                    <div className=' text-sm ml-1 text-[#9b9b9b9c] font-medium'>Home</div>
                </div> */}

                {/* <div className='mt-3'>
                  <span className='text-white'>You want to login with account ?</span>
                </div> */}
{/* BUTTON */}
              <div className='flex mt-6 items-center justify-center'>
                <button className=' font-medium bg-[#ff6600] duration-500 w-28 py-2 rounded mr-2 hover:bg-[#ff6600c7] text-[#fff]' onClick={e=>naigate('/loginclient')} >LOGIN USER</button>
                <button className=' duration-500 bg-[#373743] text-white cursor-not-allowed  w-28 py-2 rounded  ' onClick={e=>naigate('/loginadmin')} disabled>ADMIN</button>
              </div>
            </div>
      }
      </div>
  )
}


