import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
		let summary = <Redirect to="/" />;

		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						continued={this.continuedHandler}
						canceled={this.canceledhandler}
					/>
					<Route path={this.props.match.path + '/contact-data'} component={Details} />
				</div>
			);
		}

		return summary;
	}
}
const mapStateToProps = (state) => {
	return {
		ings: state.burgarReducer.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
