import React from "react";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signUpContainer">
      <div className="signUpBox">
        <h3>SignUp</h3>
        <input type="text" name="name" id="" placeholder="Name" />
        <input type="email" name="email" id="" placeholder="Email" />
        <input type="password" name="password" id="" placeholder="Password" />
        <span>
          <button>Login</button>
          <button>SignUp</button>
        </span>
        <span>Forgot Password?</span>
      </div>
    </div>
  );
};

export default SignUp;
