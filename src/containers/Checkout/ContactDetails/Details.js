import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./Details.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Details extends Component {
  state = {
    name: "",
    PhoneNo: "",
    address: {
      contry: "",
      pin: ""
    },
    loading: false
  };

  orderHandler = event => {
    console.log(this.props.ingredients);
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let from = (
      <form>
        <input type="text" name="name" placeholder="Your Name" />
        <input type="text" name="phNo" placeholder="Your PhoneNo" />
        <input type="text" name="contry" placeholder="Your Contry" />
        <input type="text" name="pin" placeholder="Your Pin" />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      from = <Spinner />;
    }
    return <div className={classes.Details}>{from}</div>;
  }
}

export default Details;
