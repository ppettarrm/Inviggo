import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = (props) => {

  return (
    <React.Fragment>
      <MainHeader>
        <span />
        <span />
        <span />
        <h1 className="main-navigation__menu-btn">
          <Link to="/"></Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
