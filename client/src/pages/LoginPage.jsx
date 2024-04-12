import './css/LoginPage.css';
import React from 'react'
import { useLocation } from "react-router-dom"

export const LoginPage = (props) => {
    const location = useLocation();
    console.log(location.state.page);
    console.log(location.state?.isLogin);
    console.log(location.state?.isSignup);
    
    return (
        <>
            <div>hello</div>
        </>
    );
}

export default LoginPage;   