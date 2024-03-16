import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import * as yup from "yup";

function Register() {
  const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])[A-Za-z0-9]{6,9}$/,
        `must:\n-
   Start with a letter (either uppercase or lowercase).
  \n- Be between 6 and 9 characters in total.`
      )
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required("Please confirm your password"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
  });
  const myData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  async function onSubmit(values) {
    setIsLoading(true)
   try {
    const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
console.log(data.message);
setIsSuccess(data.message)
setTimeout(()=>{
    setIsSuccess(false)
}, 5000)
setIsLoading(false)


   } catch (error) {
    console.log(error.response.data.message);
    setIsError(error.response.data.message)
    setTimeout(()=>{
        setIsError(false)
    }, 5000)
   }
   setIsLoading(false)

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
          <h2>Register now:</h2>
          <form onSubmit={MyForm.handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.name}
              onChange={MyForm.handleChange}
              type="text"
              className="form-control my-2"
              name="name"
              id="name"
            />
            {MyForm.errors.name && MyForm.touched.name ? (
              <div className="alert alert-danger">{MyForm.errors.name}</div>
            ) : (
              ""
            )}

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

            <label htmlFor="password">Password:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.password}
              onChange={MyForm.handleChange}
              type="password"
              className="form-control my-2"
              name="password"
              id="password"
            />
            {MyForm.errors.password && MyForm.touched.password ? (
              <div className="alert alert-danger">{MyForm.errors.password}</div>
            ) : (
              ""
            )}

            <label htmlFor="rePassword">Repassword:</label>
            <input
              onBlur={MyForm.handleBlur}
              value={MyForm.values.rePassword}
              onChange={MyForm.handleChange}
              type="password"
              className="form-control my-2"
              name="rePassword"
              id="rePassword"
            />
            {MyForm.errors.rePassword && MyForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {MyForm.errors.rePassword}
              </div>
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
