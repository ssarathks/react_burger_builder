import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

const initBurgerOrder = () => {
    return(
        {
            type : actionTypes.INIT_BURGER_ORDER
        }
    )
}

const orderBurgerSuccess = (id, orderData) => {
    return(
        {
            type : actionTypes.ORDER_BURGER_SUCCESS,
            orderId : id,
            orderData : orderData
        }
    )
}

const orderBurgerFail = (error) => {
    return(
        {
            type : actionTypes.ORDER_BURGER_FAIL,
            error : error
        }
    )
}

export const orderBurger = (order,idToken) => {
    return((dispatch) => {
        dispatch(initBurgerOrder())
        axios.post('/orders.json?auth='+idToken,order)
        .then(response => {
            console.log(response.data);
            dispatch(orderBurgerSuccess(response.data.name, order))
        })
        .catch(error => {
            console.log(error);
            dispatch(orderBurgerFail(error))
        })
    })
}

export const purchaseInit = () => {
    return({
        type : actionTypes.PURCHASE_INIT
    })
}


const fetchOrderStart = () => {
    return(
        {
            type : actionTypes.FETCH_ORDER_START
        }
    )
}
const fetchOrdersSuccess = (orders) => {
    return(
        {
            type : actionTypes.FETCH_ORDER_SUCCESS,
            orders : orders
        }
    )
}

export const fetchOrdersFail = (error) => {
    return(
        {
            type : actionTypes.FETCH_ORDER_FAIL,
            error : error
            
        }
    )
}

export const fetchOrders = (idToken) => {
    return((dispatch) => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json?auth='+idToken)
        .then(response => {
            let orders = []
            for(let key in response.data){
                orders.push({
                    ...response.data[key],
                    orderId : key
                })
            }
            dispatch(fetchOrdersSuccess(orders))            
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    })
}