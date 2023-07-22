import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/BarLoader";

export default function Login_admin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2200);
  }, []);

  // POST-LOGIN-ADMIN
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:7000/loginAdmin", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/ad");
        } else {
          setError(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="start text-white text-sm font-light  p-1 md:p-0">
      {loading ? (
        <ClipLoader color="#76f6f6" height={8} width={400} loading={loading} />
      ) : (
        <div className="bg-[#1f1f1f7c] min-w-[320px] min-h-[160px] rounded-xl border-[#5c5c5c]  md:w-auto w-full h-full md:h-auto border-[1px] md:p-3 p-2">
          <div className=" text-red-500 font-light">{error && error}</div>

          <h3 className=" font-semibold text-center mt-2 mb-4">Login Admin</h3>
{/* FROM */}
          <form onSubmit={handleSubmit}>
{/* EMAIL */}
            <div className="flex flex-col">
              <label>Email</label>
              <input
                className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-2"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
{/* PASSWORD */}
            <div className="flex flex-col mt-3">
              <label>Password</label>
              <input
                className=" bg-[#373743] border-b-[1px] border-[#bdbdbd] outline-none rounded-sm px-2 py-2 mt-2"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>

            <div className="mt-4 text-sm">
              <div>
                Email:
                <span className="ml-1  text-[#6eacf3] cursor-pointer ">
                  admin@gmail.com
                </span>
              </div>
              <div className="mt-1">
                Password:
                <span className="ml-1 text-[#6eacf3] cursor-pointer ">123</span>
              </div>
            </div>

            <hr className="mt-4" />
{/* LOGIN */}
            <div className=" flex mt-4 mb-3 items-center justify-end">
              <button
                className=" bg-[#6eacf3] mr-2   w-28 py-2 rounded duration-500 font-medium hover:bg-[#8fbef3] text-[#1f1f1f]"
                type="submit"
              >
                Login
              </button>
              <Link to="/">
                <button className=" bg-[#373743] text-white duration-500   w-28 py-2 rounded hover:bg-[#4f4f5a] ">
                  Cannel
                </button>
              </Link>
            </div>
          </form>
{/* END FROM */}
        </div>
      )}
    </div>
  );
}
