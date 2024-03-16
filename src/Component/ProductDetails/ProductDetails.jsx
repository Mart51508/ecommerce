

import axios from 'axios';
import React, { useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../Context/WishContext';

function ProductDetails() {

    const{AddToCart}=useContext(CartContext)

    const {Data , Addproducttowishlist}=  useContext(WishContext)


    async function AddProduct(id){
      const res=  await Addproducttowishlist(id)
        if(res){
            toast.success('Successfully created!',{ duration: 4000,position: 'top-right'});
        }else{
            toast.error('error',{ duration: 4000,
                position: 'top-right'});
    
        }
       }



    async function AddproductToCart(id){
     const res=await AddToCart(id)
     if(res){
        toast.success('Successfully created!',{ duration: 4000,
            position: 'top-right'});
     }else{
        toast.error('error',{ duration: 4000,
            position: 'top-right'});
    }
}


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    const { id } = useParams();
    const navigate = useNavigate();

    async function getSpecificProduct(id) {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            return response.data.data;
        } catch (error) {
            throw new Error("Failed to fetch product");
        }
    }

    const { data, isLoading, isError } = useQuery(`getSpecificProduct-${id}`,()=> getSpecificProduct(id));

    if (isLoading) {
        return (
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-secondary-subtle">
                <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                        "#fff",
                        "#fff",
                        "#fff",
                        "#fff",
                        "#fff",
                    ]}
                />
            </div>
        );
    }

    if (isError) {
        navigate('/Products');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 my-3">
                    <div className="productsDetails">
                    <Slider {...settings}>
                    {data.images.map(images=>
                    <div>
                      <img src={images} className='w-100' height={'500px'} alt="" />
                      </div>
                    )}
                 </Slider>
                    
                    </div>
                </div>
                <div className="col-md-8 d-flex align-items-center">
                    <div className="productsDetails">
                        <h4 className='fw-bold'>{data.title}</h4>
                        <p>{data.description}</p>
                        <p>{data.price} EG</p>
                        <p>{data.category && data.category.slug}</p>
                        <div className='d-flex justify-content-end'>
                    <button onClick={()=>{AddProduct(data?.id)}} className='border-0 bg-white'> 
                    <i id='Fa-heart' class='fa-regular fa-heart fa-xl my-4'></i></button>
                    
                </div>
                        <button onClick={()=>{AddproductToCart(data.id)}} className='btn bg-main w-100'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
