import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControlsArea from "../../components/Burger/BuildControls/BuildControlsArea";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import error from "../../hoc/Error/Error";
// setting upthe base price for each ingredients
const PRICEING = {
  salad: 0.4,
  bacon: 0.6,
  cheese: 0.8,
  meat: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://the-burger-bilder.firebaseio.com/ingredients.json")
      .then(res => {
        this.setState({ ingredients: res.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  checkPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  }

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
    this.setState({ ingredients: updateIngredients, totalPrice: updatedPrice });
    this.checkPurchasable(updateIngredients);
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
    this.checkPurchasable(updateIngredients);
  };

  purchaseHadler = () => {
    this.setState({ purchasing: true });
  };
  backdropClosed = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("Susccessfully Purchased ! ");
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Suman Biswas",
        address: {
          street: "BK Sarani",
          PinCode: "457721",
          country: "India"
        },
        email: "suman@gmail.com"
      },
      deleveryMethod: "Speed"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        // console.log(res);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummery = null;

    let burgerControls = this.state.error ? (
      <p>Can't loded !! </p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burgerControls = (
        <Auxilary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControlsArea
            ingredientsAdded={this.addIngredientHandler}
            ingredientsRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHadler}
          />
        </Auxilary>
      );
      orderSummery = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancle={this.backdropClosed}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummery = <Spinner />;
    }

    return (
      <Auxilary>
        <Modal show={this.state.purchasing} modalClosed={this.backdropClosed}>
          {orderSummery}
        </Modal>
        {burgerControls}
      </Auxilary>
    );
  }
}

export default error(BurgerBuilder, axios);
