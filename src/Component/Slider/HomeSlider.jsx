import axios from 'axios'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

function Responsive() {
    async function getCategory(){
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            }
         
        const {data}=useQuery('getCategory' , getCategory)
        console.log(data?.data?.data);
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="container my-5">
      <Slider {...settings}>
        {data?.data?.data.map((Category) => (
     <div>
         <img src={Category.image} className='w-100' height={'200px'} alt="" />
       <h5>{Category.name}</h5>
     </div>
))}
      </Slider>
    </div>
  );
}

export default Responsive;
