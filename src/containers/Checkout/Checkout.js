import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Details from './ContactDetails/Details';

class Checkout extends Component {
	canceledhandler = () => {
		this.props.history.goBack();
	};
	continuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};
	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ings}
					continued={this.continuedHandler}
					canceled={this.canceledhandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={Details} />
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	};
};

export default connect(mapStateToProps)(Checkout);
