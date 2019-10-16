import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './Details.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actionTypes from '../../../store/Action/index';

class Details extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			PinCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Pin'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mali'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			deleveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'Not Selected', displayValue: '(------Select Your Delevery Option----)' },
						{ value: 'fast', displayValue: 'Fastest' },
						{ value: 'slow', displayValue: 'Standard' }
					]
				},
				value: ''
			}
		}
	};

	orderHandler = (event) => {
		// console.log(this.props.ingredients);
		event.preventDefault();
		// console.log(this.props.ingredients);
		this.setState({ loading: true });

		const formData = {};

		for (let fromelementvalue in this.state.orderForm) {
			formData[fromelementvalue] = this.state.orderForm[fromelementvalue].value;
		}

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};
		this.props.onOrderingBurger(order);
	};

	checkValidity = (value, rules) => {
		let isValid = false;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
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
		updatedFromElement.valid = this.checkValidity(updatedFromElement.value, updatedFromElement.validation);

		updatedOrderFrom[inputIdentifire] = updatedFromElement;
		// console.log(updatedFromElement);
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
				{fromElementArray.map((fe) => (
					<Input
						elementType={fe.config.elementType}
						elementConfig={fe.config.elementConfig}
						key={fe.id}
						value={fe.config.value}
						changed={(event) => this.inputChangedHandler(event, fe.id)}
					/>
				))}
				<Button btnType="Info">Order It</Button>
			</form>
		);
		if (this.props.load) {
			from = <Spinner />;
		}
		return <div className={classes.Details}>{from}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgarReducer.ingredients,
		price: state.burgarReducer.totalPrice,
		load: state.order.loading
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderingBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Details, axios);
