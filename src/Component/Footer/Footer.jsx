import React from 'react'

function Footer() {
    return <>
    <section className='bg-body-tertiary p-4'>
    <div className="container">
    <div className="row">
        <h4>Get the FreshCart app</h4>
        <p className='text-mutes'> we will send you a link , open it on your phone to download the app</p>
        <div className="col-md-10">
            <input type="text" placeholder='Email..' className='form-control' />
        </div>
        <div className="col-md-2">
            <div className="btn bg-main text-white">Share App Link</div>
        </div>
    </div>
    <hr />
    <div className="d-flex justify-content-between">
        <div className="cards">
<span>Payment Partners</span>
        </div>
        <div className="play">
            <span>Get delivers with freshcart</span>
        </div>
    </div>
    <hr />
    </div>
    </section>
    
    </>
}

export default Footer
