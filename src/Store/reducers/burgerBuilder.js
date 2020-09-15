import * as actionTypes from '../actions/actionTypes'
import { purchaseInit } from '../actions';


const initialState = {
    ingredients : null,
    totalPrice : 0,
    error : false,
    building : false
}

const INGREDIENT_PRICE = {
    'salad':0.5,
    'meat':1.0,
    'bacon':0.8,
    'cheese':0.6,
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return(
                {
                    ...state,
                    ingredients : {
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                    },
                    totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
                    building : true
                }
            )
        case actionTypes.REMOVE_INGREDIENT:
            return(
                {
                    ...state,
                    ingredients : {
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
                    building : true
                }
            )
        case actionTypes.SET_INGREDIENTS:        
            return(
                {
                    ...state,
                    ingredients : action.ingredients,
                    totalPrice : 0,
                    building : false
                }
            )
        case actionTypes.INIT_INGREDIENTS_FAIL:
            return(
                {
                    ...state,
                    error : true
                }
            )
    
        default:
            return state
    }
}

export default reducer