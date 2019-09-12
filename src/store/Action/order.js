import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

// purchase Related methods are gose here =====

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};
export const purchaseBurgerFailed = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILED,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = (orderData) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post('/orders.json', orderData)
			.then((res) => {
				console.log(res.data);
				dispatch(purchaseBurgerSuccess(res.data, orderData));
			})
			.catch((error) => {
				console.log(error);
				dispatch(purchaseBurgerFailed(error));
			});
	};
};

// Purchase init Method for redirecting to the main page after order has been placed successfully

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	};
};

// Fetching related methods are gose here ====

export const fetchOrerSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};
export const fetchOrerFailed = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error: orders
	};
};
export const fetchOrerStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};
export const fetchOrders = () => {
	return (dispatch) => {
		dispatch(fetchOrerStart());
		axios
			.get('/orders.json')
			.then((res) => {
				const fetchedOrders = [];
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrerSuccess(fetchedOrders));
			})
			.catch((err) => {
				dispatch(fetchOrerFailed(err));
			});
	};
};
