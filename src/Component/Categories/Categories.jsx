import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useQuery } from 'react-query';

function Categories() {
    const { data, isError, isLoading } = useQuery(`GetAllBrands`, GetAllBrands);
    const [isloading, setIsloading] = useState(true);
    const [error, setError] = useState(null);
    const [Category , setCategory]=useState([])

   async function GetAllBrands() {
try {
  return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
 
} catch (error) {
  console.log(error);
}   
    }


    async function GetAllProducts(){
        try {
            const data= await axios.get('https://ecommerce.routemisr.com/api/v1/products')
            console.log(data?.data?.data);
            setCategory(data?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }







    return (
        <>
        <div className="container">
            <div className="row">
                    {data?.data?.data.map(category => (
                        <div key={category.id} className="col-md-4">
                            <div className="products rounded-2 boxShadow my-3 border-0 p-3" onClick={()=>{    GetAllProducts()}}>
                                <img src={category.image} className='w-100' alt="" height={'400px'} />
                                <h4 className='text-center text-main fw-bold my-3'>{category.name}</h4>
                                <p>{category._id}</p>
                            </div>
                              
                        </div>           
                    )
                    )}

<div className="container">
      <div className="row">
        {/* Map over products */}
        {Category.map((product) => (
          <div key={product._id}>
            <p>{product.title}</p>
            {/* Filter subcategories based on product._id */}
            {product.subcategory.filter((subcategory) => subcategory.name === product.title).map((subcategory) => (
              <div key={subcategory._id}>
                <p>{subcategory.name}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
                    
               
            </div>
        </div>

       </>
    )}

       

export default Categories
