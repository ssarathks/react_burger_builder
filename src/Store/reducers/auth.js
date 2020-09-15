import * as actionTypes from '../actions/actionTypes'

const initialState = {
    idToken : null,
    userId : null,
    loading : false,
    error : null,
    authRedirectPath : "/"
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return({
                ...state,
                loading : true,
                error : null
            })
        case actionTypes.AUTH_SUCCESS:
            return({
                ...state,
                idToken : action.idToken,
                userId : action.localId,
                loading : false,
                error : null
            })
        case actionTypes.AUTH_FAIL:
            return({
                ...state,
                loading : false,
                error : action.error
            })
        case actionTypes.AUTH_LOGOUT:
            return({
                ...state,
                idToken : null,
                userId : null
            })
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return({
                ...state,
                authRedirectPath : action.path
            })
        default:
            return state
    }
}

export default reducer