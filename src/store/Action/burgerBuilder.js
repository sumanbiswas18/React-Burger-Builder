import axios from '../../axios-orders';

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};
export const removeIngredient = (name) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};
export const faildToLoad = () => {
	return {
		type: actionTypes.FAILED_LOAD_INGREDIENTS
	};
};

export const initIngredients = () => {
	return (dispatch) => {
		axios
			.get('https://the-burger-bilder.firebaseio.com/ingredients.json')
			.then((res) => {
				dispatch(setIngredients(res.data));
			})
			.catch((error) => {
				dispatch(faildToLoad());
			});
	};
};
