import React, { useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewProduct from "./products/pages/NewProduct";
import Auth from "./users/pages/Auth";
import Products from "./products/pages/Products";
import ProductDetail from "./products/pages/ProductDetail";
import UpdateProduct from "./products/pages/UpdateProduct";
import { AuthContext } from "./shared/context/auth-context";

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [date, setDate] = useState(null);
  const [tel, setTel] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((props, expirationDate) => {
    setToken(props.token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000*60*60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: props.uid,
        token: props.token,
        uname: props.uname,
        date: props.date,
        tel: props.tel,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    setUserId(props.uid);
    setUsername(props.uname);
    setDate(props.date);
    setTel(props.tel);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setDate(null);
    setTel(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      const data = {
        userId: storedData.userId,
        token: storedData.token,
        uname: storedData.uname,
        date: storedData.date,
        tel: storedData.tel,
      };
      login(data, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (!!token) {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <Products />
          </Route>
          <Route path="/products/new" exact>
            <NewProduct />
          </Route>
          <Route path="/products/:productId" exact>
            <ProductDetail />
          </Route>
          <Route path="/products/update/:productId" exact>
            <UpdateProduct />
          </Route>
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" exact>
            <Products />
          </Route>
          <Route path="/products/:productId" exact>
            <ProductDetail />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
