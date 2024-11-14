import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import "./Homepage.css"

const Homepage = () => {
  const authContextValue = useContext(AuthContext);
  const { user, Logoutuser, userAuth } = authContextValue;
  const navigate = useNavigate();

  const [myUser, SetMyUser] = useState(user);

  useEffect(() => {
    userAuth();
  }, []);

  console.log(user);

  return (
    <>
      <div className="main">
        <div className="maintxt">
         <h1> hello, {user.username}</h1>
          <button
            onClick={() => {
              Logoutuser(), navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
