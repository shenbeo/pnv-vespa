import React, { useState, useEffect } from "react";
import axios  from 'axios'
import { Link, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader"

export default function Login_client ()  {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    // axios.defaults.withCredentials = true;
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false);
  
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2500)
    },[])

    // ============POST=========================
    const handleSumit = (e) => {
        e.preventDefault();
        if( values.email == 0 || values.password == 0){
            return alert("Please, enter all information!!");
          }
          setLoadingButton(true);
        axios.post('https://server-pnv-api.onrender.com/loginClient', values)
        .then(res =>{
            if(res.data.Status === 'Success'){
                setLoadingButton(true)
                const id = res.data.id; 
                navigate('/homePage/'+id);
            }else{
                setLoadingButton(false)
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }



  return (
    <div className="start text-white text-sm font-light">
     {
        loading ? 
          <HashLoader  color="#76f6f6"
        //   height={8}
        //   width={400}
          size={80}
          loading={loading}/>
        : 
        <div className=' bg-[#1f1f1f7c]  md:min-w-[360px]  md:w-auto w-full h-full md:h-auto md:rounded-xl md:border-[#5c5c5c]  md:border-[1px] md:p-4 p-2'>

            <div className=" text-red-500 font-light">
                {error && error}
            </div>
            
            
                <h1 className=" font-semibold text-xl text-center md:mt-2 mt-8 mb-4">LOGIN</h1>

                    <form onSubmit={handleSumit} className=' md:m-3 m-2'>

                        <div className="flex flex-col">
                            <label>
                                <i className="ri-mail-fill text-sm text-[#bdbdbd] mr-2"></i>
                                Email
                            </label>
                            <input className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e => setValues({...values, email: e.target.value})} type="text"  placeholder='Email' />
                        </div>
    
                        <div className="flex flex-col mt-4">
                            <label className="" >
                                <i class="ri-lock-fill text-sm text-[#bdbdbd] mr-2"></i>
                                Password
                            </label>
                            <input className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-3" onChange={e => setValues({...values, password: e.target.value})} type="password" placeholder='Password' />
                            <span className=" mt-3 text-sm   text-[#ff6600] duration-500 hover:underline cursor-pointer ">Forgot password ?</span>
                        </div>

                     
            

                        <div className="mb-5 mt-8">
                            Not a member ? <Link to={"/addUser"} className="ml-1 hover:no-underline underline text-[#ff6600] cursor-pointer ">Register</Link>
                        </div>

                        <hr />

                    

                        <div className=" flex mt-5 mb-5 items-center justify-end">
                                {!loadingButton && <button className='  bg-[#ff6600] mr-2 duration-500 w-28 py-2 rounded  hover:bg-[#e67d37] text-[#fff]' type="submit">Login</button>}
                                {loadingButton && <button className=' bg-[#ff6600] mr-2 duration-500 w-28 py-2 rounded  hover:bg-[#e67d37] text-[#fff]' type="submit"><i className="fa fa-spinner fa-spin"></i>Login</button>}

                            <Link to="/"><button className='duration-500 bg-[#373743] text-white   w-28 py-2 rounded hover:bg-[#4f4f5a] '>Cannel</button></Link>
                        </div>

                    </form>

                </div>
            }
    </div>
  );
};

