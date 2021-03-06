import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./BurgerIngredients.css";

class BurgerIngredients extends Component {
  render() {
    let ingredients = null;

    switch (this.props.type) {
      case "breadBottom":
        ingredients = <div className={classes.BreadBottom} />;
        break;
      case "breadTop":
        ingredients = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;
      case "meat":
        ingredients = <div className={classes.Meat} />;
        break;
      case "cheese":
        ingredients = <div className={classes.Cheese} />;
        break;
      case "salad":
        ingredients = <div className={classes.Salad} />;
        break;
      case "bacon":
        ingredients = <div className={classes.Bacon} />;
        break;
      default:
        ingredients = null;
        break;
    }

    return ingredients;
  }
}

BurgerIngredients.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredients;
