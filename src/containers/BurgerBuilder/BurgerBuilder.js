import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControlsArea from "../../components/Burger/BuildControls/BuildControlsArea";

// setting upthe base price for each ingredients
const PRICEING = {
  salad: 0.4,
  bacon: 0.6,
  cheese: 0.8,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5
  };

  addIngredientHandler = type => {
    // for ingredients adding
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updatedCount;

    // for ingredients price Adding
    const priceAddition = PRICEING[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = priceAddition + oldPrice;
    console.log(updatedPrice);
    this.setState({ ingredients: updateIngredients, totalPrice: updatedPrice });
  };
  removeIngredientHandler = type => {
    // for ingredients adding
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {
      ...this.state.ingredients
    };
    updateIngredients[type] = updatedCount;

    // for ingredients price Adding
    const priceDiduection = PRICEING[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDiduection;
    this.setState({
      ingredients: updateIngredients,
      totalPrice: updatedPrice
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Auxilary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControlsArea
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Auxilary>
    );
  }
}

export default BurgerBuilder;
