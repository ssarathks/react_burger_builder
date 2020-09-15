import React, { Component } from "react";
import {connect} from 'react-redux'


import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../Store/actions/index' 



class BurgerBuilder extends Component{

    state = {
        purchasable : false,
        purchasing : false,
        orderedLoading : false,
    }

    UNSAFE_componentWillMount = () => {        
        this.props.onInitIngredient()
    }
    purchasingHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing:true})
        }
        else{
            this.props.setAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname : '/checkout',
        })        
    }

    purchasableHandler = () => {
        let ingredients = {
            ...this.props.ings
        }
        const ingredientSum = Object.keys(ingredients).map(igKey => {
            return(
                this.props.ings[igKey]
            )
        }).reduce((sum,el) => {
            return(sum+el)
        },0)

        return ingredientSum>0
    }

    render(){
        let disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        //spinner showing logic
        let orderSummary = <p>No ingredients loaded</p>
        let burger = this.props.error ? <p>Ingredients not loaded</p> : <Spinner />
        if(this.props.ings){
            orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    cancelClicked={this.purchaseCancelHandler}
                    continueClicked = {this.purchaseContinueHandler}
                    totalPrice ={this.props.totalPrice.toFixed(2)}/>
            burger = <Aux>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls 
                        moreClicked={(ingredientName) => this.props.onIngredientAdded(ingredientName)}
                        lessClicked={(ingredientName) => this.props.onIngredientRemoved(ingredientName)}                    
                        totalPrice = {this.props.totalPrice}
                        disabledInfo ={disabledInfo}
                        purchasable = {this.purchasableHandler()}
                        orderClicked = {this.purchasingHandler}
                        isAuthenticated = {this.props.isAuthenticated}/>
                    </Aux>
        }
        
        if(this.state.orderedLoading){
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} backdropClicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStatetoProps = state => {
    return({
        ings : state.burger.ingredients,
        totalPrice : state.burger.totalPrice,
        error : state.burger.error,
        isAuthenticated : state.auth.idToken !== null
    })
}

const mapDispatchtoProps = dispatch => {
    return({
        onIngredientAdded :(ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved :(ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredient :() => dispatch(actions.initIngredients()),
        setAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
        // purchaseInit : () => dispatch(actions.purchaseInit())
    })
}


export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder,axios))