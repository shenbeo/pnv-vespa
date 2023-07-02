import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader"

export default function List_Products  ()  {
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [loadingv, setLoadingv] = useState(true)
    const [loading,setLoading] = useState(false)
    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });



    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
          setLoading(false)
        },1200)
      },[])




// =================GET============================
    useEffect(()=>{
        setTimeout(()=>{
            axios.get('http://localhost:7000/getProducts')
            .then(res => {
                if(res.data.Status === "Success"){
                    setData(res.data.Result);
                    setFilterData(res.data.Result);
                    setLoadingv(false)
                }else{
                    alert("error")
                }
            })
            .catch(err=> console.log(err));
        },[3000])
    },[])



// =================DEL============================
    const handleDelete = (id) => {
      axios.delete('http://localhost:7000/deleteProducts/'+id)
      .then(res => {
          if(res){
            window.location.reload(true)         
          }else{
              alert("error")
          }
      })
      .catch(err=> console.log(err));
  }

// =================SUCCESS============================
  const successDel = () => {
    toast.success("Product Deleted successfully!");
  };

  

  // SORT = NAME=================================
  const sortByName = () => {
      setSorted({sorted:"name", reversed: !sorted.reversed });
          const usersCopy = [...data];
              usersCopy.sort((userA, userB)=>{
                  const fullNameA =  `${userA.name}`;
                  const fullNameB =  `${userB.name}`;
                      if (sorted.reversed){
                          return fullNameB.localeCompare(fullNameA);
                      }
                          return fullNameA.localeCompare(fullNameB);
              });
          setData(usersCopy);
  }
  
  // SORT = CATEGORY =================================
  const sortByCategory = () => {
      setSorted({sorted:"category", reversed: !sorted.reversed });
          const usersCopy = [...data];
              usersCopy.sort((userA, userB)=>{
                  const fullNameA =  `${userA.category}`;
                  const fullNameB =  `${userB.category}`;
                      if (sorted.reversed){
                          return fullNameB.localeCompare(fullNameA);
                      }
                          return fullNameA.localeCompare(fullNameB);
              });
          setData(usersCopy);
  
  }
  
  
//SERACH =================================
  const handleSerach =(value)=>{
      const res = filterData.filter(f=>f.name.toLowerCase().includes(value))
      setData(res)
  }
  
  

// SORT = PRICE =================================
const sortByPrice = () => {
    setSorted({sorted:"price", reversed: !sorted.reversed });
    const usersCopy = [...data];
    usersCopy.sort((userA, userB)=>{
        if (sorted.reversed){
            return userA.price - userB.price
        }
        return userB.price - userA.price
    });
    setData(usersCopy);
}


// SORT = QUANTITY =================================
const sortByQuantity = () => {
    setSorted({sorted:"quantity", reversed: !sorted.reversed });
    const usersCopy = [...data];
    usersCopy.sort((userA, userB)=>{
        if (sorted.reversed){
            return userA.quantity - userB.quantity
        }
        return userB.quantity - userA.quantity
    });
    setData(usersCopy);
}


//=======PANIGATE================================
const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 5;
const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;
const records = data.slice(firstIndex, lastIndex)
const npage = Math.ceil(data.length / recordsPerPage)
const numbers = [...Array(npage +1).keys()].slice(1)


function prePage(){
    if(currentPage !== 1){
        setCurrentPage(currentPage -1)
    }
}

function changeCPage(id){
    setCurrentPage(id)
}


function nextPage(){
    if(currentPage !== npage){
        setCurrentPage(currentPage +1)
    }
}



  return (
    <div className=' w-full'>
        {
            loading ? 
            <BarLoader   color="#001e2b"
            width={"100%"}
            size={14}
            loading={loading}/>
        : 
        <div className='text-sm mt-3 p-3'>
            <h4 className='mb-3 md:mb-6 text-base md:text-xl md:font-medium'>List Products</h4>
            {/* ============ */}
            <div className='flex items-center justify-between mb-4'>
                <div>
                    <input  onChange={e => handleSerach(e.target.value)} placeholder='Serach....' className=" outline-none border-b-[1px] p-1" type="text"/>
                </div>
                <div>
                        <Link to={"/ad/addProducts"} ><button className='bg-[#00684a] font-medium  text-white duration-500 text-sm p-2  hover:bg-[#00684bd0]'>Add Products</button></Link>
                </div>
            </div>
            {/* ============ */}
    
                <table className='shadow-md rounded border-[1px] w-full'>
                    <thead className='text-xs'>
                        <tr className='border-b-[1px] bg-[#e6e6e6]'>
                            <th className='text-center  font-medium   p-2'>No</th>
                            <th className=' text-center font-medium border-l border-white p-2'>Name <i onClick={sortByName} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                            <th className=' text-center font-medium border-l border-white p-2'>Price <i onClick={sortByPrice} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                            <th className=' text-center font-medium border-l border-white p-2'>Color</th>
                            <th className=' text-center font-medium border-l border-white p-2'>Image</th>
                            <th className=' text-center font-medium border-l border-white p-2'>Category <i onClick={sortByCategory} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                            <th className=' text-center font-medium border-l border-white p-2'>Quantity <i onClick={sortByQuantity} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                            <th className='text-center font-medium border-l border-white p-2 '></th>
                        </tr>
                    </thead>
                    <tbody className=' font-light w-full'>
                    {  loadingv === false && records.length === 0? <td className='absolute text-center font-medium text-sm p-3'>No  products !!!</td> : records && records.length>0 &&
                        records.map((products, index)=>{
                            return(
                                <tr className=' text-xs' key={products.id}>
                                <td className='p-1 w-6 border-t-[1px] border text-center'>{index + 1}</td>
                                <td className='p-1 w-24 border-t-[1px] border text-center'>{products.name}</td>
                                {/* <td className='p-2 w-48 border-t-[1px] border text-start'>{products.name.substring(0,24)}...</td> */}
                                <td className='p-1 w-24 border-t-[1px] border text-center'>{products.price}</td>
                                <td className='p-1 w-24 border-t-[1px] border text-center'>{products.color}</td>

                                <td className='p-1 w-24 h-16 border-t-[1px] border text-center'>{
                                    <img className='object-center   object-cover' src={`http://localhost:7000/imagesProducts/`+products.image} alt="" />
                                    }</td>
                                <td className='p-1 w-24 border-t-[1px] border text-center'>{products.category}</td>
                                <td className='p-1 w-24 border-t-[1px] border text-center'>{products.quantity}</td>
                                <td className='p-1 w-24 border-t-[1px] border text-center'>
                                    <Link to={`/ad/Edit_Products/`+products.id}><button className=' ri-edit-2-fill md:w-8 md:h-8 h-5 w-5 bg-[#00684a] duration-500 mr-1  hover:bg-[#00684bd0] text-white'></button></Link>
                                    <Link  to="/ad/listProducts"  onClick={successDel}  >
                                      <button className='ri-delete-bin-5-fill  md:w-8 md:h-8 h-5 w-5 bg-[#e23133] duration-500 mr-1  hover:bg-[#e23134d0] text-white'  onClick={ e => handleDelete(products.id)} ></button>
                                    </Link>
                                </td>

                            </tr>
                            )
                        }) }
                    </tbody>
                    {loadingv == true && <p  className='p-3'>Loading....</p>}
                </table>
            {/* ============ */}

                <nav className='mt-4'>
                    <ul className=' flex w-full items-center justify-end'>
                        <div >
                            <div className=' bg-[#001e2b] p-1 text-xs flex items-center justify-center mr-3 cursor-pointer hover:bg-[#001e2ba8] text-white duration-500' onClick={prePage} >Prev</div>
                        </div>
                
                            {
                                numbers.map((n,i)=>{
                                    return(
                                    
                                        <div className={` underline mx-1   ${currentPage === n ? 'active' : ' no-underline mx-1 '}`}  key={i}>
                                            <div className=' cursor-pointer hover:underline' onClick={()=>changeCPage(n)} >{n}</div>
                                        </div>
                                
                                    )
                                })
                            }
                    
                        <div>
                            <div className=' bg-[#001e2b] p-1 text-xs flex items-center justify-center ml-3 cursor-pointer hover:bg-[#001e2ba8] text-white duration-500' onClick={nextPage} >Next</div>
                        </div>
                    </ul>
                </nav>



        </div>
        }
    </div>
   
  )
}


