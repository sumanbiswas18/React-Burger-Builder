import * as actionType from '../Action/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 5,
	loading: false,
	error: false
};

const INGREDIENTS_PRICE = {
	salad: 0.4,
	bacon: 0.6,
	cheese: 0.8,
	meat: 1.5
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
			};
		case actionType.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
			};

		case actionType.SET_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				error: false,
				totalPrice: 5
			};
		case actionType.FAILED_LOAD_INGREDIENTS:
			return {
				...state,
				error: true
			};

		default:
			return state;
	}
};
export default reducer;
