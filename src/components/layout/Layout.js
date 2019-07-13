import React from "react";
import Auxilary from "../../hoc/Auxilary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => (
  <Auxilary>
    <Toolbar />
    <main className={classes.Contant}>{props.children}</main>
  </Auxilary>
);

export default Layout;
