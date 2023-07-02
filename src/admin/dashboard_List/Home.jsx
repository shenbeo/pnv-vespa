import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BarLoader  from "react-spinners/BarLoader"

export default function Home ()  {

const [adminCount, setAdminCount] = useState()
const [employeeCount, setEmployeeCount] = useState()
const [productsCount, setProductsCount] = useState()
const [name, setName] = useState()

    useEffect(()=>{
      setTimeout(()=>{
      //tolal admin
          axios.get('http://localhost:7000/totalAdmin')
              .then(res=>{
                    setAdminCount(res.data[0].admin)
                    setLoadingv(false)
              }).catch(err=>console.log(err))
        },[3000])

      //total employ
      axios.get('http://localhost:7000/totalClient')
      .then(res=>{
        setEmployeeCount(res.data[0].user_client)
      }).catch(err=>console.log(err))

      //total salary(name) su dung trong project chinh lam2 tong hop san pham
      axios.get('http://localhost:7000/totalProducts')
      .then(res=>{
        setProductsCount(res.data[0].products)
      }).catch(err=>console.log(err))


      //total salary(name) su dung trong project chinh lam2 tong hop san pham
      // axios.get('http://localhost:7000/name')
      // .then(res=>{
      //   setName(res.data[0].sumOfName)
      // }).catch(err=>console.log(err))

    },[])



// lấy list admin
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:7000/getAdmin')
    .then(res => {
        if(res.data.Status === "Success"){
            setData(res.data.Result);
        }else{

        }
    })
    .catch(err=> console.log(err));
    },[])



    const [loading,setLoading] = useState(false)
  
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },2200)//2200
    },[])



    const [loadingv, setLoadingv] = useState(true)// true vì chưa có data, còn false thì dã có data


  return (
    <div className=' w-full'>
      {
        loading ? 
        
            <BarLoader  color="#001e2b"
            width={"100%"}
            size={14}
            loading={loading}/>
          
        : 
      <div className='text-sm  p-3 '>
        <h4 className='mb-3 md:mb-6 text-base md:text-xl md:font-medium'>Dashboard</h4>

        <div className='md:flex  w-full items-center justify-between'>

            <div className=' border-[1px] shadow-md p-1 flex items-center justify-start w-full'>
            <li className="ri-admin-fill bg-[#2943d457] w-8 h-8 flex mr-3 items-center justify-center rounded-full text-blue-800 text-xl"></li>

              <div>
                <div className='font-medium'>Total Admin</div>
                <div>{adminCount}</div>
              </div>
            </div>

            <div className=' border-[1px] shadow-md p-1 flex items-center justify-start w-full md:m-1 my-2 md:my-0'>
            <li className="ri-user-follow-fill bg-[#c949498f] w-8 h-8 flex mr-3 items-center justify-center rounded-full text-red-800 text-xl"></li>
              <div>
                <div className='font-medium'>Total Users</div>
                <div>{employeeCount}</div>
              </div>
            </div>

            <div  className=' border-[1px] shadow-md p-1 flex items-center justify-start w-full md:m-1 my-2 md:my-0'>
            <li className="ri-shopping-basket-fill bg-[#4de68079] w-8 h-8 flex mr-3 items-center justify-center rounded-full text-green-800 text-xl"></li>
              <div>
                <div className=' font-medium'>Total Product</div>
                <div>{productsCount}</div>
              </div>
            </div>

            <div className=' border-[1px] shadow-md  p-1 flex items-center justify-start w-full'>
            <li className="ri-shopping-bag-fill bg-[#cac84db6] w-8 h-8 flex mr-3 items-center justify-center rounded-full text-yellow-600 text-xl"></li>
              <div>
                  <div  className=' font-medium'>Total Order</div>
                  <div>0</div>
              </div>
            </div>

        </div>
  
  
  
  {/* list of admin */}
      <div className='md:mt-8 mt-4' >
          <h4 className='mb-3 text-base md:text-xl'>Admin</h4>
  
  
          <table className='shadow-md rounded border-[1px]'>
              <thead className=' text-xs md:text-sm'>
                  <tr className=' border-b-[1px] bg-[#e6e6e6] text-xs md:text-sm'>
                      <th className='w-10 text-center  font-medium   p-2'>No</th>
                      <th className='w-48 text-center font-medium border-l border-white p-2'>Name</th>
                      <th className='w-48 text-center font-medium border-l border-white p-2'>Email</th>
                      <th className='w-48 text-center font-medium border-l border-white p-2'>Pasword</th>
                  </tr>
              </thead>
              <tbody className=' font-light '>
              {  loadingv === false && data && data.length>0 &&
                  data.map((admin, index)=>{
                    return(
                      <tr key={admin.id}>
                        <td className='p-2 border-t-[1px] border text-center text-xs md:text-sm'>{index + 1}</td>
                        <td className='p-2 border-t-[1px] border text-center text-xs md:text-sm'>{admin.name}</td>
                        <td className='p-2 border-t-[1px] border text-center text-xs md:text-sm'>{admin.email}</td>
                        <td className='p-2 border-t-[1px] border text-center text-xs md:text-sm'>{admin.password}</td>
                      </tr>
                    )
                  })}
  
              </tbody>
          {loadingv == true && <td  className='p-3'>Loading....</td>}

          </table>

      </div>
      </div>
      }
    </div>
  )
}


