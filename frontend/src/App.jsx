import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewProduct from "./products/pages/NewProduct";
import Products from "./products/pages/Products";

const App = () => {
  return (
    <Router>
     <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Products />
          </Route>
          <Route path="/products/new" exact>
            <NewProduct />
          </Route>
          <Route path="/products/new" exact>
            <NewProduct />
          </Route>
          <Route path="/products/new" exact>
            <NewProduct />
          </Route>
          <Route path="/auth" exact>
            <NewProduct />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
