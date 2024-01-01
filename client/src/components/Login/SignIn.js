import React from 'react'
import "./SignIn.css"

const SignIn = () => {
  return (
    <div className="signInContainer">
      <div className="signInBox">
        <h3>Login</h3>
        <input type="email" name="email" id="" placeholder='Email' />
        <input type="password" name="password" id="" placeholder='Password'/>
        <button>Login</button>
        <span>Forgot Password?</span>
      </div>
    </div>
  )
}

export default SignIn;