import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/Footer';
import "../index.css";

function Login() {

  const { user, email, isLogged, token, login } = useAuth() || {};
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    const decoded = jwtDecode(response.credential); // Decode the JWT token
    const user = decoded.name;
    const email = decoded.email;
    const token = response.credential;

    login(user, email, token);
    navigate('/');
  };

  const handleError = (error) => {
    console.log('Login Failed:', error);
  };

  if (isLogged){
    return (
      <div>
        <h1>You are not logged in!</h1>
      </div>
    );
  }
  else {
    return (
      <>
        <div className="login-card">
        <div className="login-card-header">
          <div className="logo">
              <img src="../../public/wallet.png" alt="Logo" />
              <h2>eWallet</h2>
            </div>
            <h3 className='slogan'>Empowering Your Wallet, Anytime, Anywhere.</h3>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          /> 
        </div>
        <div className="login-card-body">
        </div>  
        </div>
        <Footer/>
      </>
    );
  }
}

export default Login;
