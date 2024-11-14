import React from 'react'
import { useNavigate } from "react-router-dom";
import './Logpage.css'
const Logpage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main">
        <div className="content">
            <h1>Hello please login or register yourself..</h1>
            <button  onClick={() => {navigate("/login");}}>Login</button>
            <button  onClick={() => {navigate("/register");}}>Register</button>
            <button  onClick={() => {navigate("/upload");}}>Upload</button>
        </div>
      </div>
    </>
  )
}

export default Logpage
