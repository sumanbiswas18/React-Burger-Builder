import React from "react";
import classes from "./HamBugerManu.css";
const Hamburgermanu = props => (
  <div onClick={props.manuClicked} className={classes.DrawerToggle}>
    <div />
    <div />
    <div />
  </div>
);

export default Hamburgermanu;
