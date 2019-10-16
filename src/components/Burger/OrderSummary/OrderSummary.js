import React from 'react';
import Aux from '../../../hoc/Auxilary';

import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

const OrderSummary = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients).map((igkey) => {
		return (
			<li key={igkey}>
				<span style={{ textTransform: 'capitalize' }}> {igkey} : </span>
				<strong>{props.ingredients[igkey]}</strong>
			</li>
		);
	});
	return (
		<Aux>
			<div className={classes.OrderSummary}>
				<h3>Your Order</h3>
				<p>A Delicious Burger with the Following Ingredients:</p>
				<ul>{ingredientsSummary}</ul>
				<p>
					<strong>Total Price : {props.price.toFixed(2)}</strong>
				</p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={props.purchaseCancle}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={props.purchaseContinue}>
					Continue
				</Button>
			</div>
		</Aux>
	);
};

export default OrderSummary;
