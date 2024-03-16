import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WishContext } from '../Context/WishContext'

function Products() {


   
    const{AddToCart}=useContext(CartContext)
    const {  Addproducttowishlist}=  useContext(WishContext)
    const [IsLoading, setIsLoading] = useState(false);
  


    async function AddProduct(id){
        setIsLoading(true)
      const res=  await Addproducttowishlist(id)
        if(res){
            toast.success('Successfully created!',{ duration: 4000,position: 'top-right'});
            setIsLoading(false)
        }else{
            toast.error('error',{ duration: 4000,
                position: 'top-right'});
                setIsLoading(false)
            }
       }


    async function AddproductToCart(id){
     const res=await AddToCart(id)
     if(res){
        toast.success('Successfully created!',{ duration: 4000,position: 'top-right'});
    
    }else{
        toast.error('error',{ duration: 4000,
            position: 'top-right'});

    }
    }

    async function GetAllProducts(){
        try {
            return await axios.get('https://ecommerce.routemisr.com/api/v1/products')

        } catch (error) {
            console.log(error);
        }
    }

   const {data,isError,isLoading}= useQuery('GetAllProducts' , GetAllProducts)

   if(isLoading){
   return <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-secondary-subtle">
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
   }
    return (
       <div className="container">
        <div className="w-50 m-auto my-5">
            </div>
        <div className="row">
            
            {data?.data?.data.map(products=>
            <div className="col-md-3 my-3">
                <div className="product p-2">
           <Link to={`/productDetails/${products._id}`}>
                <div>
                <img src={products.imageCover} className='w-100' alt="" />
                <p className='text-main'>{products.category.name}</p>
                <p className='fw-bold'>{products.title.split(' ').slice(0,2).join(' ')}</p>
                <div className="d-flex justify-content-between align-items-center ">
                {products.priceAfterDiscount?<p><span className='text-decoration-line-through text-danger'>{products.price} </span> - {products.priceAfterDiscount}</p>:products.price}
                <p className='m-0'>{products.ratingsAverage} <i className="fa-solid fa-star rating-color"> </i></p>
                </div>
                <p>{products._id}</p>
                </div>
                </Link>
                <div className='d-flex justify-content-end'>
                    <button onClick={()=>{AddProduct(products?.id)}} className='border-0 bg-white'> 
                    <i id='Fa-heart' class={`fa-regular fa-heart fa-xl my-4`}></i></button>
                    
                </div>
                <button onClick={()=>{AddproductToCart(products?.id)}} className='btn btn-success w-100'>Add to Cart</button>
                </div>
            </div>
        )}

        </div>
       </div>
    )
}

export default Products
