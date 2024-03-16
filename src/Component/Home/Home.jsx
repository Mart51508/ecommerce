import React from 'react'
import Fade from '../Slider/HomeSlider1'
import HomeSlider from '../Slider/HomeSlider'
import Products from '../Products/Products'

function Home() {
    return (
        <>
     <div className="container my-3">
        <div className="row">
            <div className="col-md-6">
            <Fade/>
            </div>
            <div className="col-md-5">
            <img className=' w-100 my-1' height={'250px'} src={require('../../assets/images/1681511452254.png')} alt="" />
            <img className=' w-100 my-1' height={'250px'} src={require('../../assets/images/1681511392672.png')} alt="" />
            </div>
        </div>
     </div>
     <HomeSlider/>

<Products/>


        </>
    )
}

export default Home
