import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

function Fade() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return ( 
    <div className="slider-container">
      <Slider {...settings}>
            <div>
          <img alt="" className="w-100" src={require('../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg')} />
        </div>
        <div>
          <img alt="" className="w-100" src={require('../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg')} />
        </div>

      </Slider>
    </div>
  );
}

export default Fade;


