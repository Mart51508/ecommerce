import React, { createContext, useEffect, useState } from 'react';
import{jwtDecode} from 'jwt-decode'

export const AuthContext = createContext();



function AuthContextProvider({ children }) {
 
    

    const [Token, setToken] = useState(null);
    // const [UserData, setUserData] = useState(null);


    // function getUserData(){
    //  const UserData=   jwtDecode(Token)
    // //  setUserData(UserData)
    //  console.log('userdata',UserData);
    // }
 
    useEffect(()=>{
        if(localStorage.getItem('Tkn') !== null){

      setToken(localStorage.getItem('Tkn'))
    //   getUserData()
           }
    },[])
 
    return (
        <AuthContext.Provider value={{ Token, setToken,}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;







