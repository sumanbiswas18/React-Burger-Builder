import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredients.css";

class BurgerIngredients extends Component {
  render() {
    let ingredients = null;

    switch (this.props.type) {
      case "BreadBottom":
        ingredients = <div className={classes.BreadBottom} />;
        break;
      case "BreadTop":
        ingredients = (
          <div className={classes.BreadBottom}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "Meat":
        ingredients = <div className={classes.Meat} />;
        break;
      case "Cheese":
        ingredients = <div className={classes.Cheese} />;
        break;
      case "Salad":
        ingredients = <div className={classes.Salad} />;
        break;
      case "Bacon":
        ingredients = <div className={classes.Bacon} />;
        break;
      default:
        ingredients = null;
        break;
    }

    return ingredients;
  }
}

BurgerIngredients.PropTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredients;
