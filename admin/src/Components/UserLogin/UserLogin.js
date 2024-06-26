import React, { useState } from "react";
import "./userLogin.css";
import sepnotyLogo from "../../assets/sepnotyLogo.svg";
import resource from "../../assets/resource.svg";

import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice.js";

export default function UserLogin() {
  const [userDetails, setUserDetails] = useState({});
  // const { userInfo, setUserInfo } = useContext(UserContext);
  const {currentUser} = useSelector(state=>state.user)

  const navigate = useNavigate();
  const dispatch =  useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const response = await fetch(`http://localhost:8800/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "http://localhost:8800",
        },
        body: JSON.stringify(userDetails),
      });
      const responseData = await response.json();
  
      console.log(responseData);

      dispatch(signInSuccess(responseData));
      navigate(`/${currentUser.id}/dashboard/${currentUser.id}`)
      
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
   

   
  };


  return (
    <div className="admin">
      <div className="admincontainer">
        <div className="login-info">
          <img src={sepnotyLogo} alt="sepnotylogo" />
          <h2>Welcome</h2>
          <p>Sign in to continue Access</p>
          <img className="adminimg" src={resource} alt="adminimg" />
        </div>
        <div className="login">
          <p>Sign In</p>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Email Address"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
