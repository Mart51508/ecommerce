import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {

    const{Token , setToken}=useContext(AuthContext)


        if(localStorage.getItem('Tkn') == null){
        return <Navigate to={'/login'}></Navigate>
           }
    return (
        <>
        {children}
        </>
    )
}

export default ProtectedRoute
