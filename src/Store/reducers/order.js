import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders : [],
    orderedLoading : false,
    purchased : false,
    fetchOrderLoading : false 
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        // case actionTypes.PURCHASE_INIT:
        //     return({
        //         ...state,
        //         purchased : false
        //     })
        case actionTypes.INIT_BURGER_ORDER:
            return({
                ...state,
                orderedLoading : true,
                purchased :false
            })
        case actionTypes.ORDER_BURGER_SUCCESS:
            return({
                ...state,
                orderedLoading : false,
                purchased : true,
            })
        case actionTypes.ORDER_BURGER_FAIL:
            return({
                ...state,
                orderedLoading : false
            })

        case actionTypes.FETCH_ORDER_START:
            return({
                ...state,
                fetchOrderLoading : true
            })
        case actionTypes.FETCH_ORDER_SUCCESS:
            return({
                ...state,
                orders:action.orders,
                fetchOrderLoading : false
            })
        case actionTypes.FETCH_ORDER_FAIL:
            return({
                ...state,
                fetchOrderLoading : false
            })
        default:
            return state
    }
}

export default reducer