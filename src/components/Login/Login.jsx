import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (ev) => {
    ev.preventDefault();

    const email = ev.target.elements.email.value;
    const password = ev.target.elements.password.value;
    const error = validateInput(email, password);

    setError(error);
    if (!error) fetchData(email, password);
  };

  const validateInput = (email, password) => {
    const emailInfo = email.split("@");
    if (emailInfo.length > 2) return "Email is not valid!";
    if (password.length === 0) return "Password is required!";
    return "";
  };

  const fetchData = async (email, password) => {
    setLoading(true);
    const res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await res.json();
    if (json.error) setError(json.error);
    else {
      navigate("/welcome");
    }
    setLoading(false);
  };

  return (
    <form className="login-container" onSubmit={handleLogin}>
      <h3 className="login-header">
        <img
          src="../assets/images/logo.jpg"
          width="30px"
          height="30px"
          alt="logo"
        />
        Sign In
      </h3>
      <div className="login__form__control">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          className="login__email__input"
          placeholder="Enter email"
        />
      </div>
      <div className="login__form__control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="login__password__input"
          placeholder="Enter password"
        />
      </div>
      <div className="login__form__check">
        <input
          type="checkbox"
          className="custom-control-input"
          id="rememberMe"
        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div className="login__form__control">
        <button type="submit" className="login__submit__button">
          Submit
          {isLoading && (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </button>
      </div>
      {!!error && <p className="error-message">{error}</p>}
      <p className="login__forgot__password">
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
};
