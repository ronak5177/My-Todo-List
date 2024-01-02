import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios"

const SignUp = () => {
  const [state, setState] = useState({
      username: "", email: "", password: ""
  })

  const handleChange = (e)=>{
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleSubmit =  (e)=>{
    e.preventDefault()
    console.log(e.target.name, e.target.value)
      axios.post(`http://localhost:8000/user/signup`, {
        name: state.username,
        email: state.email,
        password: state.password
      })
      .then((res) =>{
        alert(`User ${state.username} is Successful with userid : ${state.email}`)
        window.location.href="/signin"
      })
      .catch(error => alert(error.response.data.error))
  }

  return (
    <div className="signUpContainer">
      <div className="signUpBox">
        <h3>SignUp</h3>
        <input type="text" name="username" value={state.username} id="username" placeholder="Name" onChange={handleChange}/>
        <input type="email" name="email" value={state.email} id="email" placeholder="Email" onChange={handleChange}/>
        <input type="password" name="password" value={state.password} id="password" placeholder="Password" onChange={handleChange}/>
        <span>
          <button onClick={()=> window.location.href="/signin"}>Login</button>
          <button onClick={handleSubmit}>SignUp</button>
        </span>
        <span>Forgot Password?</span>
      </div>
    </div>
  );
};

export default SignUp;
