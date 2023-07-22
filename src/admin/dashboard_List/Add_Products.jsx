import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BarLoader from "react-spinners/BarLoader";

export default function Add_Products() {
  const [data, setData] = useState({
    name: "",
    price: "",
    color: "",
    category: "",
    quantity: "",
    image: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

// 
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("price", data.price);
    formdata.append("color", data.color);
    formdata.append("category", data.category);
    formdata.append("quantity", data.quantity);
    formdata.append("image", data.image);
    if (
      data.name == 0 ||
      data.price == 0 ||
      data.color == 0 ||
      data.category == 0 ||
      data.quantity == 0 ||
      data.image == 0
    ) {
      return alert("Please, enter all information!!");
    }
    axios
      .post("http://localhost:7000/createProducts", formdata)
      .then((res) => {
        navigate("/ad/listProducts");
      })
      .catch((err) => console.log(err));
  };

// 
  const successAdd = () => {
    if (
      data.name != 0 &&
      data.price != 0 &&
      data.color != 0 &&
      data.category != 0 &&
      data.quantity != 0 &&
      data.image != 0
    )
      return toast.success("Product add successfully!");
  };

// 
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2200);
  }, []);


  
  return (
    <div className="w-full ">
      {loading ? (
        <BarLoader color="#001e2b" width={"100%"} size={14} loading={loading} />
      ) : (
        <div className="flex items-center justify-center ">
          <div className="text-sm p-3 ">
            <h4 className=" mb-3 md:mb-6 text-base md:text-xl md:font-medium">
              Add product
            </h4>
            <div className="">
              <form onSubmit={handleSubmit} className="border p-3 shadow-md">
                <div className=" flex flex-col">
                  <label className=" font-medium">Name:</label>
                  <input
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    type="text"
                    className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                    placeholder="Ex: vespa GTS"
                  />
                </div>

                <div className=" flex flex-col mt-2">
                  <label className=" font-medium">Price:</label>
                  <input
                    onChange={(e) =>
                      setData({ ...data, price: e.target.value })
                    }
                    type="text"
                    className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                    placeholder="Ex: 100,2000,3000"
                  />
                </div>

                {/* <div className=" flex flex-col mt-2">
                          <label className=' font-medium' >Price sale:</label>
                          <input onChange={e=>setData({...data, pricesale: e.target.value})} type="text" className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"   placeholder="Ex: 100,2000,3000"/>
                        </div> */}

                {/* <div className=" flex flex-col mt-2">
                          <label className=' font-medium'>Category</label>
                          <input onChange={e=>setData({...data, category: e.target.value})} type="text" className=" bg-transparent border p-2 outline-[#00684a] mt-2"  placeholder="Category"/>
                        </div> */}

                <div className=" flex items-center justify-between mt-2">
                  <div className=" flex flex-col w-full">
                    <label className=" font-medium">Category:</label>
                    <select
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                      className="bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                    >
                      <option disabled="disabled">Choose:</option>
                      <option value="GTSsuper">GTSsuper</option>
                      <option value="Primavera">Primavera</option>
                      <option value="Sprint">Sprint</option>
                    </select>
                  </div>
                  <div className=" flex flex-col w-full ml-2">
                    <label className=" font-medium">Color:</label>
                    <select
                      onChange={(e) =>
                        setData({ ...data, color: e.target.value })
                      }
                      className="bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                    >
                      <option disabled="disabled">Color:</option>
                      <option>Red</option>
                      <option value="Blue">Blue</option>
                      <option value="Green">Green</option>
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Yellow">Yellow</option>
                    </select>
                  </div>
                </div>

                <div className=" flex flex-col mt-2">
                  <label className=" font-medium">Quantity:</label>
                  <input
                    onChange={(e) =>
                      setData({ ...data, quantity: e.target.value })
                    }
                    type="text"
                    className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                    placeholder="Quantity"
                  />
                </div>

                <div className=" flex flex-col mt-2">
                  <label className=" font-medium">Image</label>
                  <input
                    onChange={(e) =>
                      setData({ ...data, image: e.target.files[0] })
                    }
                    type="file"
                    className=" bg-transparent border-[#afafaf] border-[1px] p-2 outline-[#001e2b] mt-2"
                  />
                </div>
                <hr className="" />

                <div className=" flex items-center justify-end">
                  <button
                    onClick={successAdd}
                    type="submit"
                    className=" bg-[#00684a] mr-2 font-medium   w-28 py-2 duration-500  hover:bg-[#00684bd0] text-[#fff]"
                  >
                    Add
                  </button>
                  <Link to="/ad/listProducts">
                    <button className=" bg-[#001e2b] text-white duration-500   w-28 py-2  hover:bg-[#4f4f5a] ">
                      Cannel
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
