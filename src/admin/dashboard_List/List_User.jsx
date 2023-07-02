import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BarLoader from "react-spinners/BarLoader"

export default function List_User  ()  {

    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const [loadingv, setLoadingv] = useState(true)
    const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

    const [loading,setLoading] = useState(false)
  
    useEffect(()=>{
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
      },1200)
    },[])

// ==============GET==================
    useEffect(()=>{
        setTimeout(()=>{
            axios.get('http://localhost:7000/getUserClient')
            .then(res => {
                if(res.data.Status === "Success"){
                    setData(res.data.Result);
                    setFilterData(res.data.Result);
                    setLoadingv(false)
                }else{
                    console.log("err")
                }
            })
            .catch(err=> console.log(err));
        },[3000])
    },[])


//==============DEL==================
    const handleDelete = (id) => {
        axios.delete('http://localhost:7000/delete/'+id)
        .then(res => {
            if(res.data.Status === "Success"){
                window.location.reload(true)
            }else{
               console.log("err")
            }
        })
        .catch(err=> console.log(err));
    }



// SORT = NAME===========================
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

// SORT = EMAIL==========================
const sortByEmail = () => {
    setSorted({sorted:"email", reversed: !sorted.reversed });
        const usersCopy = [...data];
            usersCopy.sort((userA, userB)=>{
                const fullNameA =  `${userA.email}`;
                const fullNameB =  `${userB.email}`;
                    if (sorted.reversed){
                        return fullNameB.localeCompare(fullNameA);
                    }
                        return fullNameA.localeCompare(fullNameB);
            });
        setData(usersCopy);

}


// SORT = ADDRESS==========================
const sortByAddress = () => {
    setSorted({sorted:"address", reversed: !sorted.reversed });
        const usersCopy = [...data];
            usersCopy.sort((userA, userB)=>{
                const fullNameA =  `${userA.address}`;
                const fullNameB =  `${userB.address}`;
                    if (sorted.reversed){
                        return fullNameB.localeCompare(fullNameA);
                    }
                        return fullNameA.localeCompare(fullNameB);
            });
        setData(usersCopy);
  
}


// =============SEARCH===========================
const handleSerach =(value)=>{
    const res = filterData.filter(f=>f.name.toLowerCase().includes(value))
    setData(res)
}




// =============PANIPAGE===========================
const [currentPage, setCurrentPage] = useState(1)
const recordsPerPage = 4;
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
                <div className='text-sm  p-3'>
                    <h4 className='mb-3 md:mb-6 text-base md:text-xl md:font-medium'>List Users</h4>
                <div>
                <div className='flex items-center justify-between mb-4'>
                    <input  onChange={e => handleSerach(e.target.value)} placeholder='Serach....' className=" outline-none border-b-[1px] p-1" type="text"/>
                </div>
                    </div>
                        <table className='shadow-md rounded border-[1px] w-full'>
                            <thead  className=' md:text-sm text-xs '>
                                <tr className='border-b-[1px] bg-[#e6e6e6]'>
                                    <th className='text-center font-medium border-l border-white p-2 '>ID </th>
                                    <th className=' text-center font-medium border-l border-white p-2'>UserName <i onClick={sortByName} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                                    <th className=' text-center font-medium border-l border-white p-2'>Email <i onClick={sortByEmail} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                                    <th className='text-center font-medium border-l border-white p-2'>Image</th>
                                    <th className=' text-center font-medium border-l border-white p-2 '>Address <i onClick={sortByAddress} className='ri-arrow-down-s-fill text-sm cursor-pointer duration-500 hover:text-[#8fbef3] '></i></th>
                                    <th className='text-center font-medium border-l border-white p-2'></th>
                                </tr>
                            </thead>


{/* ============= */}       
                            <tbody className='font-light w-full'>

                                {loadingv === false && records.length === 0? <td className='absolute text-center font-medium text-sm p-3'>No user !!</td> : records && records.length>0 &&
                                records.map((user, index)=>{
                                    return(
                                        <tr className='md:text-sm text-xs ' key={index}>
                                        <td className=' w-8 border-t-[1px] border text-center'>{index + 1}</td>
                                        <td className=' w-36 p-1 border-t-[1px] border text-center'>{user.name}</td>
                                        <td className=' w-36 p-1 border-t-[1px] border text-center '>{user.email}</td>
                                        <td className=' w-20 p-1  border-t-[1px] border text-center'>{
                                            <div className='flex items-center justify-center'><img className='object-center w-10 h-10 object-cover' src={`http://localhost:7000/images/`+user.image} alt="" /></div>
                                            }</td>
                                        <td className=' w-24 border-t-[1px] border text-center'>{user.address}</td>
                                        <td className=' w-20 border-t-[1px] border text-center '>
                                            {/* <Link to={`/Edit_User/`+user.id} ><button className=' ri-edit-2-fill md:w-8 md:h-8 h-5 w-5 bg-[#00684a] duration-500 mr-1  hover:bg-[#00684bd0] text-white'></button></Link> */}
                                            <button onClick={ e => handleDelete(user.id)} className='ri-delete-bin-5-fill  md:w-8 md:h-8 h-5 w-5 bg-[#e23133] duration-500   hover:bg-[#e23134d0] text-white'></button>
                                        </td>

                                    </tr>
                                    )
                                })}
                                </tbody>
                            {loadingv == true && <td  className='p-3'>Loading....</td>}
                        </table>
{/* ============= */}
                    <nav className='mt-4'>
                        <ul className=' flex w-full items-center justify-end'>
                            <div >
                                <div className='  bg-[#001e2b] p-1 text-xs flex items-center justify-center mr-3 cursor-pointer hover:bg-[#001e2ba8] text-white duration-500' onClick={prePage} >Prev</div>
                            </div>
                    
                                {
                                    numbers.map((n,i)=>{
                                        return(
                                        
                                            <div className={` underline mx-1  ${currentPage === n ? 'active' : ' no-underline mx-1 '}`}  key={i}>
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


