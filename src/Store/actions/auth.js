import * as actionTypes from './actionTypes' 
import axios from 'axios'

const authStart = () => {
    return(
        {
            type: actionTypes.AUTH_START
        }
    )
}

const authSuccess = (idToken,localId) => {
    return(
        {
            type :actionTypes.AUTH_SUCCESS,
            idToken : idToken,
            localId : localId
        }
    )
}

const authFail = (error) => {
    return(
        {
            type :actionTypes.AUTH_FAIL,
            error : error
        }
    )
}

export const authLogout = () => {
    return(
        {
            type : actionTypes.AUTH_LOGOUT
        }
    )
}

const authCheckTimeout = (expiresIn) => {
    return((dispatch) => {
        setTimeout(()=>{
            dispatch(authLogout())
        },expiresIn*1000)
    })
}
export const auth = (email, password,isSignup) => {
    return((dispatch) => {
        dispatch(authStart())
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmgxitCHEj4ejGzvJlBTLweOaz9KCpMSA"
        if (!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmgxitCHEj4ejGzvJlBTLweOaz9KCpMSA"
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken,response.data.localId))
                dispatch(authCheckTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response))                
            })
    })
}

export const setAuthRedirectPath = (path) => {
    return(
        {
            type : actionTypes.SET_AUTH_REDIRECT_PATH,
            path : path
        }
    )
}