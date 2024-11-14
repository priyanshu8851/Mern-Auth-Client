import React, {useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../store/Auth";


const Signup = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false)

  const authContextValue = useContext(AuthContext);
  const { storeTokenInLS, userAuth } = authContextValue;


  const registerBtn = async (e) => {
    e.preventDefault(); 

      setLoading(true)
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", {
        username: register.name,
        email: register.email,
        password: register.password,
      });
      console.log("Registration successful:", response.data);


      // Store the token in local storage
    localStorage.setItem("token", response.data.token);

      setRegister({
        name: "",
        email: "",
        password: "",
      })
      
      alert(response.data.msg)
      storeTokenInLS(response.data.token)

    } catch (err) {
      console.log("Registration failed:", err);
      // alert(err.response.data.msg)

    }


    setLoading(false)


  };

  const handleRegisterBtn = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2 className="text-center ">Register</h2>
          <form onSubmit={registerBtn}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                value={register.name}
                className="form-control rounded-0"
                onChange={handleRegisterBtn}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                autoComplete="off"
                name="email"
                value={register.email}
                className="form-control rounded-0"
                onChange={handleRegisterBtn}
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
                value={register.password}
                className="form-control rounded-0"
                onChange={handleRegisterBtn}
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              {loading ? "Loading" : "Register"}
            </button>
          </form>
          <p className="text-center">Already have an account</p>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
