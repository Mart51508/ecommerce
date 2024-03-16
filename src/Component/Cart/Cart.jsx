import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Cart() {
  const {
    RemoveSpecificcartItem,
        NumOfCartItems,
    TotalCartPrice,
    products,
    Updatecartproductquantity,
    ClearUserCart,
    CardID
  } = useContext(CartContext);

  async function UpdateQuantity(id, count) {
    const res = await Updatecartproductquantity(id, count);
    if (res) {
      toast.success("Successfully created!", {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error("error", { duration: 4000, position: "top-right" });
    }
  }

  async function ClearCart() {
    const res = await ClearUserCart();
    console.log(res);
    if (res) {
      toast.error("clear all", {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error("error", { duration: 4000, position: "top-right" });
    }
  }

  async function RemoveItem(id) {
    const res = await RemoveSpecificcartItem(id);
    console.log(res);
    if (res) {
      toast.error("your product is deleted now", {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error("error", { duration: 4000, position: "top-right" });
    }
  }

  return (
    <>

    {products.length > 0 ?<div className="container bg-body-tertiary my-5 p-5 position-relative">
        <h2 className="text-center fw-bolder my-4">Cart Shop</h2>
        <p></p>
        <h4 className="fw-bold  my-3">
          Total Price: <span className="text-main"> {TotalCartPrice}</span>
        </h4>
        <h4 className="fw-bold  my-3">
          Total Number of Items:{" "}
          <span className="text-main"> {NumOfCartItems}</span>
        </h4>
        <div className="position-absolute top-0 end-0 p-5 mt-5">
        <button onClick={()=>{ClearCart()}} className="btn btn-danger p-2 ">Clear All <i class="fa-solid fa-trash"></i> </button>
        </div>
        {products?.map((product) => (
          <div key={product.id} className="row align-items-center my-3">
            <div className="col-md-2">
              <img
                src={product?.product?.imageCover}
                className="w-100"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <h4 className="fw-bold">{product?.product?.title}</h4>
              <p className="text-main fw-bold">
                <span>{product?.price} </span> LE
              </p>
              <button onClick={()=>{RemoveItem(product?.product?.id)}} className="text-danger border-0">
                <i class="fa-solid fa-trash"></i> Remove
              </button>
            </div>
            <div className="col-md-2">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={() => {
                    UpdateQuantity(product?.product?.id, product?.count + 1);
                  }}
                  className="btn btn-outline-success"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
                <p className="fw-bold mt-2">{product?.count}</p>
                <button
                  disabled={product?.count <= 1}
                  onClick={() => {
                    UpdateQuantity(product?.product?.id, product?.count - 1);
                  }}
                  className="btn btn-outline-danger"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
            </div>
            <hr className="m-4 text-muted" />
          </div>
        ))}
        <div>
                  <Link to={`/CashOrder`}><button className="btn btn-success">Cash Order</button></Link>
        </div>
      </div>: <div className="container bg-body-tertiary p-5 my-5">
      <h2 className="text-center fw-bold">your card is empty</h2>
      </div>}

     
      
    </>
  );
}
export default Cart;
