import React, { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

let data = [
  {
    username: '',
    password: '',
    tel: ''
  }
];

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");


  const userSubmitHandler = (event) => {
    event.preventDefault();
  };

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    data = [
      {
        username: username,
        password: password,
        tel: tel,
      }
    ];

    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data[0].username,
            password: data[0].password
          }),
        });

        const responseData = await response.json();

        if(!response.ok){
          throw new Error(responseData.message);
        }

        const authdata = {
          uid: responseData.userId,
          uname: responseData.username,
          token: responseData.token,
        }

        auth.login(authdata);

      } catch (error) {
        console.log(error);
        setError(error.message || 'Something went wrong, please try again.');
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data[0].username,
            password: data[0].password,
            tel: data[0].tel
          }),
        });

        const responseData = await response.json();

        if(!response.ok){
          throw new Error(responseData.message);
        }

        const authdata = {
          uid: responseData.userId,
          uname: responseData.username,
          token: responseData.token,
        }

        auth.login(authdata);

      } catch (error) {
        console.log(error);
        setError(error.message || 'Something went wrong, please try again.');
      }
    }
  };

  return (
    <div className="mcard">
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
        {error && (<h4>{error}</h4>)}
        <Button inverse onClick={authSubmitHandler}>
          {isLogin ? "LOG IN" : "SIGN UP"}
        </Button>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLogin ? "SIGN UP" : "LOG IN"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
