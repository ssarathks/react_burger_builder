import React, { Component } from 'react'
import {connect} from 'react-redux'

import axios from '../../../axios-order'
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner'

import * as actions from '../../../Store/actions/index'

class ContactData extends Component{
    state={
        orderForm : {
            name : {
                elementtype : 'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Name"
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false

            },
            email : {
                elementtype : 'input',
                elementConfig : {
                    type : "email",
                    placeholder : "Email"
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false

            },
            street : {
                elementtype : 'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Street"
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false

            },
            postalCode : {
                elementtype : 'input',
                elementConfig : {
                    type : "text",
                    placeholder : "Postal Code"
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 5,
                    maxLength : 5
                },
                valid : false,
                touched : false

            },
            deliveryMethod : {
                elementtype : 'select',
                elementConfig : {
                    options : [
                        {value : 'fastest', displayValue : 'Fastest'},
                        {value : 'cheapest', displayValue : 'Cheapest'},
                    ]
                },
                value : 'fastest',
                validation : {
                    required : true
                },
                valid : true,
                touched : false
            },
        },
        orderFormValidity : false,
    }
    orderHandler = (event) => {
        event.preventDefault()
        this.setState({
            error :null
        })
        let orderData = {}
        for(let elementId in this.state.orderForm){
            orderData[elementId] = this.state.orderForm[elementId].value
        }
        const order = {
            ingredients : this.props.ings,
            totalPrice : this.props.totalPrice.toFixed(2),
            orderData : orderData
        }
        this.props.orderBurger(order,this.props.idToken)
    }

    checkValidity = (rules,value) => {
        let isValid = true
        if(rules.required){
            isValid = value.trim() !== '' && isValid ===true
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid ===true
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid ===true
        }
        return isValid
    }
    
    inputChangeHandler = (event,elementId) => {

        let updatedOrderForm = {...this.state.orderForm}
        let updatedElement = {...updatedOrderForm[elementId]}
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.validation , updatedElement.value )
        updatedElement.touched = true
        updatedOrderForm[elementId] = updatedElement
        let formIsValid = true
        for(let key in updatedOrderForm){
            formIsValid = updatedOrderForm[key].valid && formIsValid
        }
        this.setState({orderForm : updatedOrderForm , orderFormValidity : formIsValid})
    }

    
    render(){
        let elementArray = []
        for(let key in this.state.orderForm){
            elementArray.push({
                id : key,
                ...this.state.orderForm[key]
            })
        }
        let elements = elementArray.map(element => {
            return(
                <Input 
                    key = {element.id} 
                    elementtype = {element.elementtype} 
                    elementconfig={element.elementConfig}
                    value = {element.value}
                    validity = {element.valid}
                    shouldValidate = {element.validation}
                    changed={(event) => {this.inputChangeHandler(event,element.id)}}
                    touched = {element.touched}/>
            )
        })        
        let contactData = <div className={classes.ContactData}>
                                <h4>Enter your details here</h4>
                                <form onSubmit={this.orderHandler}>
                                    {elements}                    
                                    <Button btnType="Success" disabled = {!this.state.orderFormValidity}>ORDER</Button>
                                </form>
                            </div>
        if (this.props.orderedLoading) {
            contactData = <Spinner />
        }
        return(
            contactData
        )
    }
}

const mapStatetoProps = state => {
    return({
        ings : state.burger.ingredients,
        totalPrice : state.burger.totalPrice,
        orderedLoading : state.order.orderedLoading,
        idToken : state.auth.idToken
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        orderBurger : (order,idToken) => dispatch(actions.orderBurger(order,idToken))
    })
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(ContactData,axios))