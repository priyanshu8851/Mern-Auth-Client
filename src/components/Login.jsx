import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../store/Auth";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  
  const navigate = useNavigate()

  
  const authContextValue = useContext(AuthContext);
  const { storeTokenInLS, userAuth, user } = authContextValue;



  useEffect(() => {
    if(user){
        // navigate("/")
        console.log("hiiiiiiiiiiiiii")
    }
}, [])

  const loginData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
       
        email: login.email,
        password: login.password,
      });

      localStorage.setItem("token", response.data.token);

      setLogin({
        email: "",
        password: "",
      })
      console.log("Login successful", response);




      
      alert(response.data.msg)
      storeTokenInLS(response.data.token)
      userAuth()
      navigate("/homepage")  
    } catch (err) {
      console.log("Login failed", err);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={loginData}>
            
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                autoComplete="off"
                name="email"
                value={login.email}
                className="form-control rounded-0"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                value={login.password}
                className="form-control rounded-0"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>
          </form>
          <p className="text-center ">Create a new account ?</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
