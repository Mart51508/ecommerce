import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";


function ForgetPassword() {

    const Nav = useNavigate()
    const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
  });
  const myData = {
    email: "", 
  };

  async function onSubmit(values) {
    setIsLoading(true); 
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
      console.log(data.message);
      setIsSuccess(data.message);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000); 
      Nav('/Reset'); 
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

{IsLoading ? (
                <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-danger">
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
              ) : (
                <div className="container my-5">
        <div className="w-75 m-auto">
<form onSubmit={MyForm.handleSubmit}>
    <h2 className='text-center'>Please, enter your verification code</h2>
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
<button type="submit" className="btn btn-outline-success my-2">
             Verify
            </button>

      </form>
      </div>
      </div>
              )}

        </>
    )
}

export default ForgetPassword
