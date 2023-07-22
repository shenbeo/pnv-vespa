import React, { Suspense, useEffect, useState } from "react";
import ClipLoader from "react-spinners/BarLoader";

// import Header from "../components/Header";
// import Products from "./Products";
// import Footer from "../components/Footer";
// import Slider from "../components/Slider";
// import Sidebar from "../components/Sidebar";

const Header = React.lazy(() => import("../components/Header"));
const Products = React.lazy(() => import("./Products"));
const Footer = React.lazy(() => import("../components/Footer"));
const Slider = React.lazy(() => import("../components/Slider"));
const Sidebar = React.lazy(() => import("../components/Sidebar"));

export default function Home_Page() {
  const [loadingPage, setLoadingPage] = useState(false);

  
  useEffect(() => {
    setLoadingPage(true);
    setTimeout(() => {
      setLoadingPage(false);
    }, 1800);
  }, []);

  return (
    <div>
      <Suspense fallback={<div className="m-2">Loading...</div>}>
        <div>
          {loadingPage ? (
            <ClipLoader
              className="w-100 flex items-center justify-center"
              color="#001e2b"
              height={4}
              width={"100%"}
              loading={loadingPage}
            />
          ) : (
            <div className=" bg-[#f3f3f3]">
              <Header />
              <Sidebar />
              <Slider />
              <Products />
              <Footer />
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
