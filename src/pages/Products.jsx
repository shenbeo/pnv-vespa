import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import Sekeleton from "../components/Sekeleton";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Api_Products } from "../Api/FakeApi_Slider";

export default function Products() {
  const [data, setData] = useState(Api_Products);
  const [filter, setFilter] = useState(Api_Products);
  const [search, setSearch] = useState(Api_Products);
  const [loadingv, setLoadingv] = useState(true);
  const [loading, setLoading] = useState();
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
  const { addItem } = useCart();
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const initialPosts = data.slice(0, index);

  // TOAST
  const loadMore = () => {
    setIndex(index + 6);
    console.log(index);
    if (index >= data.length) {
      setIsCompleted(true);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    } else {
      setIsCompleted(false);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  // TOAST
  const successAdd = () => {
    return toast.success("Add to cart successfully!");
  };

  // GET PRODUCTS
  // useEffect(() => {
  //   setTimeout(() => {
  //     axios
  //       .get("http://localhost:7000/getProducts")
  //       .then((res) => {
  //         if (res.data.Status === "Success") {
  //           setData(res.data.Result);
  //           setFilter(res.data.Result);
  //           setSearch(res.data.Result);
  //           setLoadingv(false);
  //         } else {
  //           alert("err");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }, [1200]);
  // }, []);


  // SORT CATEGORY
  const filterResult = (catItem) => {
    const result = filter.filter((curDate) => {
      return curDate.category === catItem;
    });
    setData(result);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // SORT COLOR
  const filterResultColor = (catItem) => {
    const result = filter.filter((curDate) => {
      return curDate.color === catItem;
    });
    setData(result);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // SORT PRICE
  // SORT PRICE 1
  const sortById1 = () => {
    setSorted({ sorted: "price", reversed: !sorted.reversed });
    const usersCopy = [...Api_Products];
    usersCopy.sort((userA, userB) => {
      // if (sorted.reversed){
      return userA.price - userB.price;
      // }
      // return userB.price - userA.price
    });
    setData(usersCopy);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  const sortById2 = () => {
    setSorted({ sorted: "price", reversed: !sorted.reversed });
    const usersCopy = [...Api_Products];
    usersCopy.sort((userA, userB) => {
      // if (sorted.reversed){
      //     return userA.price - userB.price
      // }
      return userB.price - userA.price;
    });
    setData(usersCopy);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  //END SORT PRICE

  // SORT TEXT
  const sortByName1 = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const usersCopy = [...Api_Products];
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.name}`;
      const fullNameB = `${userB.name}`;
      // if (sorted.reversed){
      //     return fullNameB.localeCompare(fullNameA);
      // }
      return fullNameA.localeCompare(fullNameB);
    });
    setData(usersCopy);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  const sortByName2 = () => {
    setSorted({ sorted: "name", reversed: !sorted.reversed });
    const usersCopy = [...Api_Products];
    usersCopy.sort((userA, userB) => {
      const fullNameA = `${userA.name}`;
      const fullNameB = `${userB.name}`;
      // if (sorted.reversed){
      return fullNameB.localeCompare(fullNameA);
      // }
      // return fullNameA.localeCompare(fullNameB);
    });
    setData(usersCopy);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // SEARCH
  const handleSerach = (value) => {
    const res = Api_Products.filter((f) =>
      f.name.toLowerCase().includes(value)
    );
    setData(res);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // PRICE SELEC
  const [pricee, setPricee] = useState(10000);

  const handleInput = (event, newValue) => {
    setPricee(newValue);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  // OPEN SORT ITEM
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });

  return (
    <div>
      <div className="flex text-sm py-10 ">
        <div className=" md:flex container items-start justify-between mx-auto">
          {/* LEFT */}
          <div className=" bg-white shadow-md border rounded-lg  p-4 md:mr-4 mb-6 md:mb-0 mx-3 md:mx-0">
            <label className="font-medium text-[#ff6600]">Product type</label>
            {/* SEARCH */}
            <div className=" border my-3 flex">
              <input
                onChange={(e) => handleSerach(e.target.value)}
                type="text"
                name=""
                id=""
                placeholder="Search..."
                className="p-2 outline-none border-r flex-1 flex"
              />
              <i className="ri-search-line p-2  cursor-pointe  "></i>
            </div>
            {/* ITEMS */}
            <div className=" my-3">
              <div
                onClick={() => filterResult("GTSsuper")}
                className=" flex items-center font-medium justify-start cursor-pointer py-2 px-1 duration-500  hover:bg-[#001e2b] hover:text-white"
              >
                <span>GTS Super</span>
              </div>
              <div
                onClick={() => filterResult("Primavera")}
                className="flex items-center font-medium justify-start cursor-pointer py-2 px-1 duration-500  hover:bg-[#001e2b] hover:text-white"
              >
                <span>Primavera</span>
              </div>
              <div
                onClick={() => filterResult("Sprint")}
                className="flex items-center font-medium justify-start cursor-pointer py-2 px-1 duration-500  hover:bg-[#001e2b] hover:text-white"
              >
                <span>Sprint</span>
              </div>
            </div>

            <hr />
            {/* COLOR */}
            <div className="my-3">
              <label className="font-medium text-[#ff6600]">Color</label>
              <div className="md:mt-3 mt-2 ">
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("Red")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">Red</label>
                </div>
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("Blue")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">Blue</label>
                </div>
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("Black")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">Black</label>
                </div>
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("White")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">White</label>
                </div>
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("Green")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">Green</label>
                </div>
                <div className=" flex items-center">
                  <input
                    onClick={() => filterResultColor("Yellow")}
                    type="radio"
                    className=" cursor-pointer"
                    name="color"
                    id=""
                  />
                  <label className=" font-medium ml-2 p-1">Yellow</label>
                </div>
              </div>
            </div>

            <hr />
            {/* range price */}
            <div className="my-3">
              <label
                // for="default-range"
                className="md:mb-2 mb-1 font-medium text-[#ff6600]"
              >
                Default range
              </label>
              {/* <input id="default-range" type="range" value="50" className="w-full h-2 mt-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"/> */}
              <div>
                {/* <div className=" h-8 text-[#000]">
                  <Slider
                    type="range"
                    value={pricee}
                    onChange={handleInput}
                    min={2}
                    step={10}
                    max={10000}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    style={{ color: "#ff6600", width: "" }}
                  />
                </div> */}
                <Box>
                  <Slider
                    style={{ color: "#001e2b", height: "2px" }}
                    type="range"
                    value={pricee}
                    min={0}
                    step={20}
                    max={10000}
                    onChange={handleInput}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Box>
                <div className="flex font-medium items-center justify-between">
                  <span>min</span>
                  <span>max</span>
                </div>
                <div className=" flex items-center justify-between mt-2 md:mb-10 mb-2">
                  <span className=" bg-[#ccc] font-medium text-[#535353] text-xs p-1 w-14">
                    $ 0
                  </span>
                  <span className=" bg-[#ccc] font-medium text-[#535353] text-xs p-1 w-14">
                    $ {pricee}
                  </span>
                </div>
              </div>
            </div>
          </div>

    
          {/* RIGHT */}

          <div className="flex flex-col flex-1 bg-white shadow-md border rounded-lg  p-4 mx-3 md:mx-0">
            <div className="flex justify-between items-center w-full mb-3">
              <div>
                <div className="flex items-center justify-center relative overflow-hidden border p-2 shadow-md">
                  <button
                    className=" font-medium"
                    ref={imgRef}
                    onClick={() => setOpen(!open)}
                  >
                    Latest items
                  </button>
                  <span className="ri-arrow-down-s-fill text-sm "></span>
                </div>
                {open && (
                  <div
                    className=" absolute z-10 bg-white border shadow-md mt-1"
                    ref={menuRef}
                  >
                    <li
                      onClick={sortById1}
                      className=" cursor-pointer hover:bg-[#001e2b] w-full duration-500 px-2 py-1 hover:text-white"
                    >
                      Price: low - high
                    </li>
                    <li
                      onClick={sortById2}
                      className=" cursor-pointer hover:bg-[#001e2b] border-t w-full duration-500 px-2 py-1 hover:text-white"
                    >
                      Price: high - low
                    </li>
                    <li
                      onClick={sortByName1}
                      className=" cursor-pointer hover:bg-[#001e2b] border-t w-full duration-500 px-2 py-1 hover:text-white"
                    >
                      Name: A - Z
                    </li>
                    <li
                      onClick={sortByName2}
                      className=" cursor-pointer hover:bg-[#001e2b] border-t w-full duration-500 px-2 py-1 hover:text-white"
                    >
                      Name: Z - A
                    </li>
                  </div>
                )}
              </div>

              <div className="">
                {/* <label className=' font-medium'>{productsCount} items found</label> */}
                <i className="ri-menu-line font-semibold w-full h-full p-1  border-[#4e4e4e] border-[1px] text-black cursor-pointer"></i>
                <i className="ri-grid-fill bg-[#4e4e4e] text-white w-full h-full p-1 border-[#4e4e4e] border-[1px] cursor-pointer"></i>
              </div>
            </div>

            <hr />

            <div className=" md:grid md:grid-cols-4 gap-3 flex flex-col items-center justify-center mb-3 mt-6 ">
              {/* {loadingv === false && initialPosts.length === 0 ? ( */}
              {initialPosts.length === 0 ? (
                <td className="absolute text-center font-medium text-xl p-3">
                  No products !
                </td>
              ) : (
                initialPosts &&
                initialPosts.length > 0 &&
                initialPosts
                  .filter((v) => {
                    return v.price <= parseInt(pricee);
                  })
                  .map((v, index) => {
                    return (
                      <div key={index}>
                        {loading ? (
                          <Sekeleton />
                        ) : (
                          <div className=" hover:border-[#ff6600] border-[1px] shadow-md relative overflow-hidden  transition p-2 ">
                            <img
                              className="p-1 hover:scale-110 transition duration-500 cursor-pointer"
                              src={v.image}
                              alt="image-products"
                            />
                            <div className="p-2 mt-2">
                              <div className="flex items-center justify-between mb-2">
                                <span className=" font-semibold">{v.name}</span>
                              </div>
                              {/* <span className=' font-semibold mr-2'>{v.pricesale}</span> */}
                              <div className=" flex items-center justify-between">
                                <span className="font-semibold">
                                  $ {v.price}
                                </span>
                                <span className="text-[#6e6e6e] md:text-xs text-sm font-medium ">
                                  {v.color}
                                </span>
                              </div>
                              <div onClick={successAdd}>
                                <div
                                  onClick={() => addItem(v)}
                                  className=" w-full bg-[#001e2b] shadow-md p-2 text-[#fff] text-center  cursor-pointer md:mt-4 mt-3 md:mb-2 duration-500 hover:bg-[#ff6600]"
                                >
                                  <button>Add to Cart</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
              )}

              {/* {loadingv == true && <p className="p-3 text-xl">Loading....</p>} */}
            </div>

            {/* nav */}
            <div className=" text-center mt-4 mb-3">
              {isCompleted ? (
                <button className="bg-[#001e2b] shadow-md text-white  py-2 px-4  duration-700 w-40 hover:bg-[#ff6600]">
                  End
                </button>
              ) : (
                <button
                  className="shadow-md bg-[#001e2b] w-40  text-white py-2 px-4 duration-700 hover:bg-[#ff6600]"
                  onClick={loadMore}
                >
                  + Load more
                </button>
              )}
            </div>
          </div>

          {/* END RIGHT */}
        </div>
      </div>
    </div>
  );
}
