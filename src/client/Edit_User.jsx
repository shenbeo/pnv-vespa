import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader"

export default function Edit_User  ()  {
    
    const [data, setData] = useState({
        name:'',
        email:'',
        address:''
    })
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading,setLoading] = useState(false)

//   LOADING
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2200)
    },[])


//GET
    useEffect(()=>{
        axios.get('http://localhost:7000/get/'+id)
        .then(res=>{
            setData({...data, name: res.data.Result[0].name, email: res.data.Result[0].email,address: res.data.Result[0].address})
        })
        .catch(err => console.log(err))
    },[])
 

// UPDATE
        const handleSubmit =(e)=>{
            e.preventDefault();
            axios.put('http://localhost:7000/update/'+id, data)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/listUser')
                }
            })
            .catch(err => console.log(err))
        }


//SUCCESS
        const successEdit = () => {
            toast.success("Product Upload successfully!");
          };
          

  return (
    <div>
      {
        loading ? 
          <PulseLoader className='ml-20'   color="#76f6f6"
          margin={8}
          size={14}
          loading={loading}/>
        : 
        <div className=' text-white text-sm ml-5'>
            <h2 className=" font-semibold mt-2 mb-4">Edit Users</h2>
          <div className='bg-[#1f1f1fef] min-w-[350px]  rounded-xl border-[#5c5c5c]  border-[1px] p-3'>
              <form onSubmit={handleSubmit} >
{/* NAME */}
                    <div className="flex flex-col mt-4">
                        <label >UserName</label>
                        <input className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-2" onChange={e=>setData({...data, name: e.target.value})} value={data.name} type="text"  placeholder="name"/>
                    </div>
{/* EMAIL */}
                    <div  className="flex flex-col mt-4">
                        <label >Email</label>
                        <input className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-2" onChange={e=>setData({...data, email: e.target.value})} value={data.email} type="email"    placeholder="email"/>
                    </div>
{/* ADDRESS */}
                    <div className="flex flex-col mt-4">
                        <label >Address</label>
                        <input className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-2" onChange={e=>setData({...data, address: e.target.value})} value={data.address} type="text" placeholder="address"/>
                    </div>

                    <hr className='mt-12' />
{/* BUTTON */}
                    <div className=" flex mt-4 mb-3 items-center justify-end">
                        <button  onClick={successEdit} type="submit" className=' bg-[#6eacf3] mr-2 font-medium   w-28 py-2 rounded duration-500  hover:bg-[#8fbef3] text-[#1f1f1f]'>update</button>
                        <Link to="/listUser"><button className=' bg-[#373743] text-white duration-500   w-28 py-2 rounded hover:bg-[#4f4f5a] '>Cannel</button></Link>   
                    </div>

                </form>
          </div>
        </div>
        }
    </div>
  )
}


