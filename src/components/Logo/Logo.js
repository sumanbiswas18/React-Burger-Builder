import React from "react";
import logo from "../../assets/images/logo.jpg";
import classes from "./Logo.css";

const Logo = props => (
  <div className={classes.Logo}>
    <img src={logo} alt="BurgarLogo" />
  </div>
);

export default Logo;
