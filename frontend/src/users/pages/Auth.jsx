import React, { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");

  const userSubmitHandler = (event) => {
    event.preventDefault();
    const data = [
      {
        username: username,
        password: password,
        tel: tel,
      },
    ];
    console.log(data);
  };

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
  };

  return (
    <>
      <form className="place-form" onSubmit={userSubmitHandler}>
        <div className="nproduct-name">
          <label>Username:</label>
          <input
            name="username"
            type="text"
            required
            onChange={(username) => setUserName(username.target.value)}
          />
        </div>
        <div className="nproduct-image">
          <label>Password:</label>
          <input
            name="password"
            type="password"
            required
            onChange={(password) => setPassword(password.target.value)}
          />
        </div>
        {!isLogin && (
          <div className="nproduct-category">
            <label>Phone number:</label>
            <input
              name="tel"
              type="tel"
              onChange={(tel) => setTel(tel.target.value)}
              disabled={isLogin}
            />
          </div>
        )}
        <Button inverse onClick={authSubmitHandler}>
          {isLogin ? "LOG IN" : "SIGN UP"}
        </Button>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLogin ? "SIGN UP" : "LOG IN"}
        </Button>
      </form>
    </>
  );
};

export default Auth;
