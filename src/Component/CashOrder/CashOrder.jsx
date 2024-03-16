import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing, RotatingLines } from "react-loader-spinner";
import * as yup from "yup";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function CashOrder() {
  const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
const Nav =useNavigate()


const {CardID , GetLoggedusercart}=  useContext(CartContext)





  
  const myData = 
    {
        "shippingAddress":{
            details: "",
            phone: "",
            city: ""
            }
    }

    const validationSchema = yup.object({
        details: yup.string().required("details is required"),
        city: yup.string().required("city is required"),
        phone: yup
          .string()
          .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
          .required("Phone number is required"),
      });
  

  async function onSubmit(values ) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CardID}`, values,
    {
        headers:{token:localStorage.getItem('Tkn')}
    }).then((res)=>{
        if(res.data.status === 'success'){
            toast.success('payment completed successfully')
            GetLoggedusercart()
            setTimeout(() => {
              Nav('/Home')

            }, 1500);
        }
        else{
            toast.error('payment didnt complete successfully')
        }
    }).catch((err)=>{
        console.log(err);
    })

}

  const MyForm = useFormik({
    initialValues: myData,
    onSubmit,
    validationSchema

  });

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
      <div className="container my-5">
        <div className="w-75 m-auto">
        {IsSuccess?<div className="alert alert-success text-center">{IsSuccess}</div>:''}
        {IsError?<div className="alert alert-danger text-center">{IsError}</div>:''}
          <h2>Register now:</h2>
          <form onSubmit={MyForm.handleSubmit}>
            <label htmlFor="details">Details:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.details}
              onChange={MyForm.handleChange}
              type="text"
              className="form-control my-2"
              name="details"
              id="details"
            />
            {MyForm.errors.details && MyForm.touched.details ? (
              <div className="alert alert-danger">{MyForm.errors.details}</div>
            ) : (
              ""
            )}

            <label htmlFor="city">City:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.city}
              onChange={MyForm.handleChange}
              type="text"
              className="form-control my-2"
              name="city"
              id="city"
            />
            {MyForm.errors.city && MyForm.touched.city ? (
              <div className="alert alert-danger">{MyForm.errors.city}</div>
            ) : (
              ""
            )}
            


<label htmlFor="phone">Phone:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.phone}
              onChange={MyForm.handleChange}
              type="text"
              className="form-control my-2"
              name="phone"
              id="phone"
            />
          
          {MyForm.errors.phone && MyForm.touched.phone ? (
              <div className="alert alert-danger">{MyForm.errors.phone}</div>
            ) : (
              ""
            )}



            <button disabled={!(MyForm.dirty && MyForm.isValid)} type="submit" className="btn btn-outline-success ">
              {IsLoading ? (
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
              ) : (
                "Pay now"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CashOrder;
