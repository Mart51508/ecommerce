import React, { useContext, useEffect, useState } from "react";
import WishContextProvider, { WishContext } from "../Context/WishContext";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { RotatingLines } from "react-loader-spinner";

function WishList() {
  const { Data, Addproducttowishlist , RemoveSpecificcartItem } =useContext(WishContext);
  const{AddToCart}=useContext(CartContext)
  const [IsLoading, setIsLoading] = useState(false);



  async function AddproductToCart(id){
    setIsLoading(true)
    const res=await AddToCart(id)
    if(res){
      setIsLoading(false)
       toast.success('Successfully created!',{ duration: 4000,position: 'top-right'});
       RemoveItem(id)
   }else{
    setIsLoading(false)

       toast.error('error',{ duration: 4000,
           position: 'top-right'});

   }
   }


  async function RemoveItem(id) {
    const res = await RemoveSpecificcartItem(id);
    if (res) {
      toast.error("your product is deleted now", {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error("error", { duration: 4000, position: "top-right" });
    }
  }

  //
  return (
    <>
        {IsLoading?<div className=" bg-main w-100 vh-100 d-flex justify-content-center align-items-center ">
     <RotatingLines
  visible={true}
  height="96"
  width="96"
  color="grey"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
   </div>:''
}

    {Data.length > 0?<div className="container bg-body-tertiary my-5 p-5 ">
        <h2 className="text-center fw-bolder my-4">Wishlist</h2>

        {Data?.map((pro) => (
          <div className="row align-items-center" key={pro.id}>
            <div className="col-md-2">
              <img src={pro?.imageCover}
                className="w-100"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <h4 className="fw-bold">{pro?.title}</h4>
              <p className="text-main fw-bold">
                <span>{pro?.price} </span> LE
              </p>
              <span>{pro?.id}</span>
              <button  onClick={()=>{RemoveItem(pro?.id)}} className="text-danger border-0 bg-body-tertiary">
                <i  class="fa-solid fa-trash "></i> Remove
              </button>
            </div>
            <div className="col-md-2">
                <button onClick={()=>{AddproductToCart(pro?._id)}} className="btn btn-outline-success">Add to Cart</button>
            </div>
            <hr className="m-4 text-muted" />
          </div>
        ))}
      </div>:<div className="container bg-body-tertiary text-center p-3 my-5">
      <h2>Your wishList is empty</h2></div>}
      
    </>
  );
}

export default WishList;


