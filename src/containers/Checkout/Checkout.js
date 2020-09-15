import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {connect} from 'react-redux'

import * as actions from '../../Store/actions/index'
import ContactData from './ContactData/ContactData';


class Checkout extends Component{
    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(this.props.match.url + '/contact-data')
    }
    render(){
        // let checkoutsummary = <Spinner />
        // if(this.state.ingredients){
        //     checkoutsummary =<CheckoutSummary 
        //     ingredients={this.state.ingredients}
        //     checkoutCancelClick={this.checkoutCancelHandler}
        //     checkoutContinueClick={this.checkoutContinueHandler}/>
        // }
        let checkoutSummary = <Redirect to="/" />
        if (this.props.ings) {
            let purchasedRedirect = this.props.purchased? <Redirect to="/"/> : null
            checkoutSummary = <div>
                                    {purchasedRedirect}
                                    <CheckoutSummary 
                                        ingredients={this.props.ings}
                                        checkoutCancelClick={this.checkoutCancelHandler}
                                        checkoutContinueClick={this.checkoutContinueHandler}/>
                                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                                </div>
        }

        return(
            checkoutSummary
        )
    }
}

const mapStatetoProps = state => {
    return({
        ings : state.burger.ingredients,
        totalPrice : state.burger.totalPrice,
        purchased : state.order.purchased
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        // purchaseInit : () => dispatch(actions.purchaseInit())
    })
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout)