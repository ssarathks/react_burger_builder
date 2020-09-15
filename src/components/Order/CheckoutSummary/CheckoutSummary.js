import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h2>Hope Burger Tastes Well!</h2>
            <Burger ingredients = {props.ingredients}/>
            <Button btnType="Danger" click={props.checkoutCancelClick}>CANCEL</Button>
            <Button btnType="Success" click={props.checkoutContinueClick}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary