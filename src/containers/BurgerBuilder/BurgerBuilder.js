import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Auxilary from '../../hoc/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControlsArea from '../../components/Burger/BuildControls/BuildControlsArea';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import error from '../../hoc/Error/Error';
import * as actionTypes from '../../store/Action/index';
// setting upthe base price for each ingredients

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
	}

	checkPurchasable(ingredients) {
		const sum = Object.keys(ingredients)
			.map((igkey) => {
				return ingredients[igkey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		return sum > 0;
	}

	purchaseHadler = () => {
		this.setState({ purchasing: true });
	};
	backdropClosed = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.onPurchaseInit();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummery = null;

		let burgerControls = this.props.error ? <p>Can't loded !! </p> : <Spinner />;

		if (this.props.ings) {
			burgerControls = (
				<Auxilary>
					<Burger ingredients={this.props.ings} />
					<BuildControlsArea
						ingredientsAdded={this.props.onIngredientAdded}
						ingredientsRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						price={this.props.price}
						purchasable={this.checkPurchasable(this.props.ings)}
						ordered={this.purchaseHadler}
					/>
				</Auxilary>
			);
			orderSummery = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseContinue={this.purchaseContinueHandler}
					purchaseCancle={this.backdropClosed}
					price={this.props.price}
				/>
			);
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

const mapStateToProps = (state) => {
	return {
		ings: state.burgarReducer.ingredients,
		price: state.burgarReducer.totalPrice,
		error: state.burgarReducer.error
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actionTypes.initIngredients()),
		onPurchaseInit: () => dispatch(actionTypes.purchaseInit())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(error(BurgerBuilder, axios));
