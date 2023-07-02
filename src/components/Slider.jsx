import React, { useState } from 'react'
import { Api_Slider } from '../Api/FakeApi_Slider'

import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";


const Slider = () => {
    const [dataSlider, setDataSlider]=useState(Api_Slider)
  return (
    <div className=' container mx-auto pt-14'>
        <div className=' w-full h-full'>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              // navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              <div>
                {dataSlider.map((slider,index) => {
                  return (
                    <SwiperSlide key={index}>
                        <img className=' object-cover object-center' src={slider.img} alt="" />
                    </SwiperSlide>
                  );
                })}
              </div>
            </Swiper>
        </div>
    </div>
  )
}

export default Slider
