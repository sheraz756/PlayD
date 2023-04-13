import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Login from "../components/loginComp/Login";
import baseUrl from "../utils/baseUrl";

const login = () => {
   
   
    return (
        <>
            {/* <div className="loginpage">
                <div className="loginLogo">
                    <img src='/logo.png' height='60px' width='60px' style={{ objectFit: 'contain' }} />
                </div>
            </div> */}
            <Login />


         
        </>
    )
}

export default login;