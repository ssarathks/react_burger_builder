import * as actionTypes from './actionTypes'
import axios from '../../axios-order'


export const addIngredient = (ingredientName) => {
    return({
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : ingredientName,
    })
}

export const removeIngredient = (ingredientName) => {
    return({
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : ingredientName,
    })
}

const setIngredients = (ingredients) => {
    return({
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    })
}

export const initIngredients = () => {
    return((dispatch) => {
        axios.get('/Ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(initIngredientsFail())
            })
    })
}

export const initIngredientsFail = () => {
    return(
        {
            type : actionTypes.INIT_INGREDIENTS_FAIL
        }
    )
}