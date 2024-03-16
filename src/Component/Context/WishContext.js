import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const WishContext = createContext();

function WishContextProvider({ children }) {
  const [Count, setCount] = useState(0);
  const [Data, setData] = useState([]);

  useEffect(() => {
    Getloggeduserwishlist();
  }, []);

  async function Addproducttowishlist(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("Tkn") },
        }
      )
      .then((res) => {

        Getloggeduserwishlist();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async function Getloggeduserwishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token: localStorage.getItem("Tkn") },
      })
      .then((res) => {
        console.log(res?.data?.data);
        setData(res?.data?.data);
        setCount(res?.data?.count);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  async function RemoveSpecificcartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("Tkn") },
      })
      .then((res) => {
        Getloggeduserwishlist();
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  return (
    <WishContext.Provider
      value={{
        Addproducttowishlist,
        Count,
        Data,
        Getloggeduserwishlist,
        RemoveSpecificcartItem,
      }}
    >
      {children}
    </WishContext.Provider>
  );
}

export default WishContextProvider;
