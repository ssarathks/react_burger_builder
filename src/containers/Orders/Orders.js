import React, { Component } from 'react'
import {connect} from 'react-redux'

import * as actions from '../../Store/actions/index'

import axios from '../../axios-order'
import Order from '../../components/Order/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    UNSAFE_componentWillMount = () => {
        this.props.fetchOrders(this.props.idToken)
    }

    render(){
        let orders = this.props.orders.map(order => {
            return(
                <Order 
                    key={order.orderId}
                    orderId = {order.orderId}
                    ingredients = {order.ingredients}
                    totalPrice = {order.totalPrice}/>
            ) 
        })
        if (this.props.fetchOrderLoading) {
            orders = <Spinner />
        }
        return(
            <div>
                {orders}
            </div>
        )
    }
}
const mapStatetoProps = (state) => {
    return({
        orders : state.order.orders,
        fetchOrderLoading : state.order.fetchOrderLoading,
        idToken : state.auth.idToken
    })
}

const mapDispatchtoProps = (dispatch) => {
    return(
        {
            fetchOrders : (idToken) => dispatch(actions.fetchOrders(idToken))
        }
    )
}

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders, axios))