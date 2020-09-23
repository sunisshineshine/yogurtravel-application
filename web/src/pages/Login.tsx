import React, { useState } from "react";
import {
  doLoginWithEmailAndPassword,
  EmailPasswordRequest,
} from "../firebase/auth";
import { goHome, goSignUpPage } from "../navigator";

export const Login = () => {
  const [message, setMessage] = useState("Please Login");

  const doLogin = (request: EmailPasswordRequest) => {
    doLoginWithEmailAndPassword(request)
      .then((result) => {
        if (result.ok) {
          goHome();
        } else {
          if (result.error) {
            setMessage(result.error?.toString());
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Log-in Page</h1>
      <button id="main-button" onClick={goHome}>
        Back to Main
      </button>
      <p id="login-message">{message}</p>
      <div id="login-form">
        <LoginInputForm submit={doLogin} />
        <p>
          Do you have no account?{" "}
          <button id="signup-button" onClick={goSignUpPage}>
            SignUp!
          </button>
        </p>
      </div>
    </div>
  );
};

const LoginInputForm = (props: {
  submit: (props: EmailPasswordRequest) => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login-input-form">
      <div id="login-email-form">
        <label>email : </label>
        <input
          id="login-email-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div id="login-password-form">
        <label>password : </label>
        <input
          id="login-password-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button
        id="login-button"
        onClick={(e) => {
          props.submit({
            email,
            password,
          });
        }}
      >
        Log-in
      </button>
    </div>
  );
};