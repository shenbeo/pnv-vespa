import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader"

export default function Add_User  () {

const [data, setData] = useState({
    name:'',
    email:'',
    password:'',
    address:'',
    image:''
})
const navigate = useNavigate()

const [loading,setLoading] = useState(false)
const [loadingButton, setLoadingButton] = useState(false);
  
useEffect(()=>{
  setLoading(true)
  setTimeout(()=>{
    setLoading(false)
  },2500)
},[])



//=====CREATE===============
    const handleSubmit =(e)=>{
        e.preventDefault();
        const formdata= new FormData();
        formdata.append("name", data.name);
        formdata.append("email", data.email);
        formdata.append("password", data.password);
        formdata.append("address", data.address);
        formdata.append("image", data.image);
        if(data.name == 0 || data.email == 0 || data.password == 0 || data.address == 0 || data.image == 0){
          return alert("Your information is missing. Please re-enter !!!");
        }
        setLoadingButton(true);
        axios.post('https://server-pnv-api.onrender.com/create', formdata)
        .then( res => {
          setLoadingButton(true)
            navigate('/loginclient')
        })
        .catch(err => console.log(err))
    }

//=====SUCCESS-ADD==============
    const successAdd = () => {
      if(data.name != 0 &&  data.email != 0 && data.password != 0 && data.address != 0 && data.image != 0 )
     return toast.success("Signup successfully!");
    };


  return (
    <div className="start text-white text-sm font-light">
      {
        loading ? 
          <HashLoader  color="#76f6f6"
          // height={8}
          // width={400}
          size={80}
          loading={loading}/>
        : 
        <div className=' bg-[#1f1f1f7c] md:min-w-[420px] md:w-auto w-full h-full md:h-auto  md:rounded-xl md:border-[#5c5c5c]  md:border-[1px] md:p-4 p-2'>

        <h3 className=" font-semibold text-xl text-center mt-2 md:mb-4 mb-2">REGISTER</h3>
            
          <form onSubmit={handleSubmit} className=' md:m-3 m-2'>
  
              <div className="flex flex-col">
                  <label ><i className="ri-user-fill text-sm text-[#bdbdbd] mr-2"></i>UserName</label>
                  <input className=" bg-[#373743] w-full border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e=>setData({...data, name: e.target.value})} type="text" placeholder="UserName"/>
              </div>
  
              <div>
                <label className="flex  md:mt-4 mt-3" ><i className="ri-mail-fill text-sm text-[#bdbdbd] mr-2"></i>Email</label>
                <input className=" w-100 bg-[#373743] w-full border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e=>setData({...data, email: e.target.value})} type="email"  placeholder="Email"/>
              </div>
  
              <div>
                <label className="flex md:mt-4 mt-3" ><i class="ri-lock-fill text-sm text-[#bdbdbd] mr-2"></i>Password</label>
                <input className="w-100 bg-[#373743] w-full border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e=>setData({...data, password: e.target.value})} type="password" placeholder="Password"/>
              </div>
  
              <div >
                <label className="flex md:mt-4 mt-3" ><i class="ri-map-pin-2-fill text-sm text-[#bdbdbd] mr-2"></i>Address</label>
                <input className=" w-100 bg-[#373743] w-full border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e=>setData({...data, address: e.target.value})} type="text" placeholder="Address"/>
              </div>
  
              <div>
                <label className="flex md:mt-4 mt-3"><i className="ri-image-fill text-sm text-[#bdbdbd] mr-2"></i>Image</label>
                <input className=" bg-[#373743]  w-full  border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e=>setData({...data, image: e.target.files[0]})} type="file" />
              </div>

              <div className="md:my-5 mt-4 mb-3 flex flex-wrap ">Do you already have an account?<Link to={"/loginclient"} className="ml-1  text-[#ff6600] cursor-pointer hover:no-underline underline ">Login</Link></div>

                  <hr/>

              <div className=" flex mt-5 items-center justify-end">
                    {!loadingButton && <button  className=' bg-[#ff6600] mr-2   w-28 py-2 rounded  hover:bg-[#e67d37] text-[#fff]' type="submit">Register</button>}
                    {loadingButton && <button disabled onClick={successAdd}  className=' bg-[#ff6600] mr-2   w-28 py-2 rounded  hover:bg-[#e67d37] text-[#fff]' type="submit"><i className="fa fa-spinner fa-spin mr-2 text-white"></i>Register</button>}

                    <Link to="/"><button className=' bg-[#373743] text-white   w-28 py-2 rounded hover:bg-[#4f4f5a] '>Cannel</button></Link>
              </div>

          </form>
        </div>
        }
    </div>
  )
}


