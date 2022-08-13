import React, { useCallback, useState } from "react";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if(isLoggedIn){
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
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
