import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "../../../components/UI/Button/Button";
import classes from "./Details.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class Details extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      PinCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Pin"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mali"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      deleveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fast", displayValue: "Fastest" },
            { value: "slow", displayValue: "Standard" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    // console.log(this.props.ingredients);
    event.preventDefault();
    // console.log(this.props.ingredients);
    this.setState({ loading: true });

    const formData = {};

    for (let fromelementvalue in this.state.orderForm) {
      formData[fromelementvalue] = this.state.orderForm[fromelementvalue].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputIdentifire) => {
    // console.log(event.target.value);
    const updatedOrderFrom = {
      ...this.state.orderForm
    };
    const updatedFromElement = {
      ...updatedOrderFrom[inputIdentifire]
    };
    updatedFromElement.value = event.target.value;
    updatedFromElement.valid = this.checkValidity(
      updatedFromElement.value,
      updatedFromElement.validation
    );

    updatedOrderFrom[inputIdentifire] = updatedFromElement;
    console.log(updatedFromElement);
    this.setState({ orderForm: updatedOrderFrom });
  };

  render() {
    let fromElementArray = [];

    for (let key in this.state.orderForm) {
      fromElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let from = (
      <form onSubmit={this.orderHandler}>
        {fromElementArray.map(fe => (
          <Input
            elementType={fe.config.elementType}
            elementConfig={fe.config.elementConfig}
            key={fe.id}
            value={fe.config.value}
            changed={event => this.inputChangedHandler(event, fe.id)}
          />
        ))}
        <Button btnType="Success">Order</Button>
      </form>
    );
    if (this.state.loading) {
      from = <Spinner />;
    }
    return <div className={classes.Details}>{from}</div>;
  }
}

export default Details;
