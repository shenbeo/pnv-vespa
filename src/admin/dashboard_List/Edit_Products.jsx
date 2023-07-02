import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader"

export default function Edit_Products  ()  {
    
    const [data, setData] = useState({
        name:'',
        price:'',
        category:'',
        color:'',
        quantity:'',
        image:''
    
    })
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading,setLoading] = useState(false)
  
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },1200)
    },[])


// =========GET========================
    useEffect(()=>{
        axios.get('http://localhost:7000/getProducts/'+id)
        .then(res=>{
            setData({...data, name: res.data.Result[0].name, price: res.data.Result[0].price,  category: res.data.Result[0].category, color: res.data.Result[0].color, quantity: res.data.Result[0].quantity, })
        })
        .catch(err => console.log(err))
    },[])


// =========PUT=========================  
        const handleSubmit =(e)=>{
            e.preventDefault();
            axios.put('http://localhost:7000/updateProducts/'+ id, data)
            .then(res => {
                if(res.data.Status === "Success"){
                    navigate('/ad/listProducts')
                }
            })
            .catch(err => console.log(err))
        }
    
// =========SUCCESS=========================  
        const successEdit = () => {
          toast.success("Product Upload successfully!");
        };

        

  return (
    <div className=' w-full'>
            {
        loading ? 
          <BarLoader  color="#001e2b"
          width={"100%"}
          size={14}
          loading={loading}/>
        : 
          <div className='flex items-center justify-center '>
            <div className=' text-sm p-3 my-2'>
                <h3 className=" font-semibold mt-1 mb-2">Edit product</h3>
                  <div className=''>
                    <form onSubmit={handleSubmit} className='border p-3 shadow-md' >
              
                        <div className="flex flex-col">
                            <label  className=' font-medium'>Name:</label>
                            <input className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2" onChange={e=>setData({...data, name: e.target.value})} value={data.name} type="text"/>
                        </div>
              
                        <div className="flex flex-col mt-2">
                          <label  className=' font-medium'>Price:</label>
                          <input className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2" onChange={e=>setData({...data, price: e.target.value})} value={data.price} type="text"/>
                        </div>
              
                        {/* <div className="flex flex-col mt-2">
                          <label  className=' font-medium'>Category:</label>
                          <input className=" bg-transparent border p-2 outline-[#00684a] mt-2" onChange={e=>setData({...data, category: e.target.value})} value={data.category} type="text" />
                        </div> */}

                        <div className='flex items-center justify-between mt-2'>
                          <div className=" flex flex-col w-full">
                            <label className=' font-medium'>Category:</label>
                            <select onChange={e=>setData({...data, category: e.target.value})} value={data.category} className='bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2'>
                              <option disabled="disabled">Choose:</option>
                              <option value="GTSsuper">GTSsuper</option>
                              <option value="Primavera">Primavera</option>
                              <option value="Sprint">Sprint</option>
                            </select>
                          </div>
                          <div className=' flex flex-col w-full ml-2'>
                            <label className=' font-medium'>Color:</label>
                            <select onChange={e=>setData({...data, color: e.target.value})} value={data.color} className='bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2'>
                              <option disabled="disabled">Color:</option>
                              <option >Red</option>
                              <option value="Blue">Blue</option>
                              <option value="Green">Green</option>
                              <option value="Black">Black</option>
                              <option value="White">White</option>
                              <option value="Yellow">Yellow</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="flex flex-col mt-2">
                          <label  className=' font-medium'>Quantity:</label>
                          <input className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2" onChange={e=>setData({...data, quantity: e.target.value})} value={data.quantity} type="text"/>
                        </div>

                        <hr className='mt-8' />
              
                        <div className=" flex  mb-2 items-center justify-end">
                          <button onClick={successEdit} type="submit" className=' bg-[#00684a] mr-2 font-medium   w-28 py-2 duration-500  hover:bg-[#00684bd0] text-[#fff]'>Update</button>
                          <Link to="/ad/listProducts"><button className=' bg-[#001e2b] text-white duration-500   w-28 py-2  hover:bg-[#4f4f5a] '>Cannel</button></Link>
                        </div>
  
                    </form>
                  </div>
            </div>
          </div>
            }
    </div>
  )
}


