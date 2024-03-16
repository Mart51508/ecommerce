import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";

function Verify() {

    const Nav = useNavigate()
    const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9]{6,9}$/,
        `must:\n-
   Start with a letter (either uppercase or lowercase).
  \n- Be between 6 and 9 characters in total.`
      )
      .required("Password is required"),

  });
  const myData = {
    email: "",
    newPassword: "",
   
  };
  async function onSubmit(values) {
    setIsLoading(true); 
    try {
      const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
      console.log(data.message);
      setIsSuccess(data.message);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000); 
      Nav('/Home'); 
    } catch (error) {
        console.log(error);
      setIsError(error.response.data.message);
      setTimeout(() => {
        setIsError(false);
      }, 5000); 
    }
    setIsLoading(false);
  }
  

  const MyForm = useFormik({
    initialValues: myData,
    onSubmit,
    validationSchema,
  });
    return (
        <>
         <div className="container my-5">
        <div className="w-75 m-auto">
        {IsSuccess?<div className="alert alert-success text-center">{IsSuccess}</div>:''}
        {IsError?<div className="alert alert-danger text-center">{IsError}</div>:''}
          <h2>Reset your account password:</h2>
          <form onSubmit={MyForm.handleSubmit}>
      

            <label htmlFor="email">Email:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.email}
              onChange={MyForm.handleChange}
              type="email"
              className="form-control my-2"
              name="email"
              id="email"
            />
            {MyForm.errors.email && MyForm.touched.email ? (
              <div className="alert alert-danger">{MyForm.errors.email}</div>
            ) : (
              ""
            )}

            <label htmlFor="newPassword">New Password:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.newPassword}
              onChange={MyForm.handleChange}
              type="password"
              className="form-control my-2"
              name="newPassword"
              id="newPassword"
            />
            {MyForm.errors.newPassword && MyForm.touched.newPassword ? (
              <div className="alert alert-danger">{MyForm.errors.newPassword}</div>
            ) : (
              ""
            )}
          
            <button type="submit" className="btn btn-outline-success ">
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
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
        </>
    )
}

export default Verify
