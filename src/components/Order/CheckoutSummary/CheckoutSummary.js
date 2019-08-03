import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tests Super !! </h1>
      <div style={{ width: "100%", height: "auto", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.canceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={props.continued}>
          Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
