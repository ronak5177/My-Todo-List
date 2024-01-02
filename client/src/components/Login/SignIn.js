import React, { useState } from 'react'
import "./SignIn.css"
import axios from "axios"

const SignIn = () => {
  const [state, setState] = useState({
    name: "", password: "", showError: false
  })

  const handleChange = (e)=>{
    setState({...state, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:8000/user/signin", {
      email: state.email,
      password: state.password
    })
    .then((res)=>{  
      alert("Login Succcess")
      window.location.href="/card"
    })
    .catch(error => {
      setState({email:'',password:'',showError:true});
      alert(error.message)
      console.log({error: error})
    })
  }

  return (
    <div className="signInContainer">
      <div className="signInBox">
        <h3>Login</h3>
        <input type="email" name="email" id="email" placeholder='Email' onChange={handleChange}/>
        <input type="password" name="password" id="password" placeholder='Password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        <span>Forgot Password?</span>
        {state.showError && <p>Invalid Credentials</p>}
      </div>
    </div>
  )
}

export default SignIn;