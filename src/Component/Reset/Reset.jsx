import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";

function Reset() {
    const Nav = useNavigate()
    const [IsSuccess, setIsSuccess] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    resetCode:  yup.string()
    .matches(/^\d+$/, 'Code must contain only numbers')
    .required('Code is required'),
  });
  const myData = {
    "resetCode": "", 
  };

  async function onSubmit(values) {
    setIsLoading(true); 
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      console.log(data.message);
      setIsSuccess(data.message);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000); 
      Nav('/verify'); 
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
                <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
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
      <label htmlFor="resetCode">resetCode:</label>
      <input
        onBlur={MyForm.handleBlur}
        value={MyForm.values.resetCode}
        onChange={MyForm.handleChange}
        type="text"
        className="form-control my-2"
        name="resetCode"
        id="resetCode"
      />
      {MyForm.errors.resetCode && MyForm.touched.resetCode ? (
        <div className="alert alert-danger">{MyForm.errors.resetCode}</div>
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

export default Reset
