import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Aux from "../../../hoc/Auxilary";
import BackDrop from "../../UI/Backdrop/Backdrop";

const sideDrawer = props => {
  let defaultClass = [classes.SideDrawer, classes.Close];

  if (props.open) {
    defaultClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.close} />
      <div className={defaultClass.join(" ")}>
        <div>
          <Logo className={classes.Logo} />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
