import React from 'react'
import classes from './Order.css'

const order = (props) => {
    let ingredients = []
    for(let igkey in props.ingredients){
        ingredients.push({
            ingredientName : igkey,
            amount : props.ingredients[igkey]
        })
    }
    let outputIngredients = ingredients.map(ig => {
        return(
            <span key={ig.ingredientName} className={classes.OrderIngredients}>{ig.ingredientName}({ig.amount})
            </span>
        )
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients : {outputIngredients}</p>
            <p>Total Price : {props.totalPrice}</p>
        </div>
    )
}

export default order