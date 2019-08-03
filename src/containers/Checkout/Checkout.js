import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import Details from "./ContactDetails/Details";
class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalprice: price });
  }

  canceledhandler = () => {
    this.props.history.goBack();
  };
  continuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continued={this.continuedHandler}
          canceled={this.canceledhandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={props => (
            <Details
              ingredients={this.state.ingredients}
              price={this.state.totalprice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
