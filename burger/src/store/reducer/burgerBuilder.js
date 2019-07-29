
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    // const newTotalPriceAdd = state.totalPrice + INGREDIENT_PRICE[action.ingredientName];

    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true
    }
    // return {
    //     ...state,
    //     ingredients:{
    //         ...state.ingredients,
    //        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //     },
    //     totalPrice: newTotalPriceAdd
    // }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updatedRemoveIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient);

    const updatedRemoveState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
        building: true
    }

    return updateObject(state, updatedRemoveState);
}

//Reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)


        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            });



        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {

                error: true
            });




    }

    return state;
};

export default reducer;