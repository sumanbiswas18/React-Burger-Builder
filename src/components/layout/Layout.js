import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  SideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideToogleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxilary>
        <Toolbar showSideDrawer={this.sideToogleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.SideDrawerHandler}
        />
        <main className={classes.Contant}>{this.props.children}</main>
      </Auxilary>
    );
  }
}
export default Layout;
