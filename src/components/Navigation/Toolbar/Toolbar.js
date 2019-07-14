import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import HamburgerManu from "../SideDrawer/HamburgerManu/HamBurgerManu";
const Toolbar = props => (
  <header className={classes.Toolbar}>
    <HamburgerManu manuClicked={props.showSideDrawer} />
    <div>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
