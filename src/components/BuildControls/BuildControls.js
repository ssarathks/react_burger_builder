import React from 'react'
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'
const controls = [
    {label : 'Salad', type : 'salad'},
    {label : 'Meat', type : 'meat'},
    {label : 'Cheese', type : 'cheese'},
    {label : 'Bacon', type : 'bacon'}
]

const buildControls = (props) => {
    return(
        <div className={classes.BuildControls}>
            {controls.map(ctrl => {
                return(
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        moreClicked={() => props.moreClicked(ctrl.type)}
                        lessClicked={() => props.lessClicked(ctrl.type)}
                        disabledInfo = {props.disabledInfo[ctrl.type]}/>
                )
            })}
            <p>Total Price : {props.totalPrice.toFixed(2)}</p>
            <button 
                className={classes.OrderButton} 
                disabled = {!props.purchasable} 
                onClick={props.orderClicked}>{props.isAuthenticated?'ORDER NOW':'AUTHENTICATE TO ORDER'}</button>
        </div>
    )
}

export default buildControls