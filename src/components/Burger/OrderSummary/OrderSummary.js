import React, { Component } from 'react'
import Button from '../../UI/Button/Button'
import classes from './OrderSummary.css'

class OrderSummary extends Component{
    render(){
        let ingredients = this.props.ingredients
        let order_summary = Object.keys(ingredients).map(igKey => {
            return(
                <li key={igKey}>{igKey} : {ingredients[igKey]}</li>
            )
        })
        return(
            <div className={classes.OrderSummary}>
                <h3>Your Order</h3>
                <ul>
                    {order_summary}
                </ul>
                <h4>Total Cost : {this.props.totalPrice}</h4>
                <p>Continue Purchase ? </p>
                <Button btnType="Danger" click={this.props.cancelClicked}>CANCEL</Button>
                <Button btnType="Success" click={this.props.continueClicked}>CONTINUE</Button>
            </div>
        )
    }
}


export default OrderSummary