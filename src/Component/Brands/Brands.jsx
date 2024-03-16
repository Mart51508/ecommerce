import axios from 'axios';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useQuery } from 'react-query';

function Brands() {
    const { data, isError, isLoading } = useQuery('GetAllBrands', GetAllBrands);
    const brandName =data?.data?.data.name

    function GetAllBrands() {
try {
  return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
} catch (error) {
  console.log(error);
}   
    }

    if (isLoading) {
        return (
            <div className="w-100 vh-100 d-flex justify-content-center align-items-center bg-secondary-subtle">
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
        );
    }

    if (isError) {
        return <div>Error fetching data...</div>;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h2 className='text-center text-main fw-bold my-4'>All Brands</h2>
                    {data?.data?.data.map(brand => (
                        <div key={brand.id} className="col-md-3">
                            <div className="products rounded-2 boxShadow my-3 border-0 p-3" data-bs-toggle="modal" data-bs-target="#brandModal">
                                <img src={brand.image} alt={brand.name} />
                                <p className='text-center'>{brand.name}</p>
                            </div>
                            <div className="modal fade" id="brandModal" tabIndex="-1" aria-labelledby="brandModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-main" id="brandModalLabel">{brand.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <img src={brand.image} alt={brand.name} />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
                        </div>
                        
                    ))}
                    </div>
                </div>

           
            
        </>
    );
}

export default Brands;
