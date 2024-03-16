import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [NumOfCartItems, setNumOfCartItems] = useState(0);
  const [TotalCartPrice, setTotalCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [CardID , setCardID]=useState([])

  useEffect(() => {
    GetLoggedusercart();
  }, []);

  async function AddToCart(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: { token: localStorage.getItem("Tkn") },
        }
      )
      .then((res) => {
        GetLoggedusercart();
        setCardID(res?.data?.data?._id);

        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async function GetLoggedusercart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem("Tkn") },
      })
      .then((res) => {
        setNumOfCartItems(res?.data?.numOfCartItems);
        setTotalCartPrice(res?.data?.data?.totalCartPrice);
        setProducts(res?.data?.data?.products);
        setCardID(res?.data?.data?._id)
        console.log(res?.data?.data?._id , 'CARD');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function Updatecartproductquantity(id, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: newCount,
        },
        {
          headers: { token: localStorage.getItem("Tkn") },
        }
      )
      .then((res) => {
        console.log(res, "reslog");
        setNumOfCartItems(res?.data?.numOfCartItems);
        console.log("num", res?.data?.numOfCartItems);
        setTotalCartPrice(res?.data?.data?.totalCartPrice);
        console.log("price", res?.data?.data?.totalCartPrice);
        setProducts(res?.data?.data?.products);
        console.log("pro", res?.data?.data?.products);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async function ClearUserCart() {
    return await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("Tkn") },
      })
      .then((res) => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProducts([]);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function RemoveSpecificcartItem(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: { token: localStorage.getItem("Tkn") },
      })
      .then((res) => {
        console.log(res.data.data);
        setNumOfCartItems(res?.data?.numOfCartItems);
        console.log("num", res?.data?.numOfCartItems);
        setTotalCartPrice(res?.data?.data?.totalCartPrice);
        console.log("price", res?.data?.data?.totalCartPrice);
        setProducts(res?.data?.data?.products);
        console.log("pro", res?.data?.data?.products);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CartContext.Provider
      value={{
        AddToCart,
        NumOfCartItems,
        TotalCartPrice,
        products,
        GetLoggedusercart,
        Updatecartproductquantity,
        RemoveSpecificcartItem,
        ClearUserCart,
        CardID,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
