import * as actionType from '../Action/Action';

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 5
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
			// const sum = Object.keys(state.ingredients)
			// 	.map((igkey) => {
			// 		return state.ingredients[igkey];
			// 	})
			// 	.reduce((sum, el) => {
			// 		return sum + el;
			// 	}, 0);
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
				// purchasable: sum > 0
			};
		case actionType.REMOVE_INGREDIENT:
			// const sumb = Object.keys(state.ingredients)
			// 	.map((igkey) => {
			// 		return state.ingredients[igkey];
			// 	})
			// 	.reduce((sumb, el) => {
			// 		return sumb + el;
			// 	}, 0);
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
				// purchasable: sumb > 0
			};

		default:
			return state;
	}
};
export default reducer;
