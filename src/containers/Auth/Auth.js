import React , { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../Store/actions/index'
import classes from './Auth.css'


import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component {
    state = {
        controls : {
            email : {
                elementtype : 'input',
                elementConfig : {
                    type : "email",
                    placeholder : "Email"
                },
                value : '',
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementtype : 'input',
                elementConfig : {
                    type : "password",
                    placeholder : "Password"
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 6
                },
                valid : false,
                touched : false
            },
        },
        controlsValidity : false,
        isSignup : true
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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid
    }

    inputChangeHandler = (event,elementId) => {

        let updatedControl = {...this.state.controls}
        let updatedElement = {...updatedControl[elementId]}
        updatedElement.value = event.target.value
        updatedElement.valid = this.checkValidity(updatedElement.validation , updatedElement.value )
        updatedElement.touched = true
        updatedControl[elementId] = updatedElement
        let formIsValid = true
        for(let key in updatedControl){
            formIsValid = updatedControl[key].valid && formIsValid
        }
        this.setState({controls : updatedControl , controlsValidity : formIsValid})
    }

    
    submitHandler = (event) => {
        event.preventDefault()
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup)
    }
    authMethodSwitchHandler = () => {
        this.setState((prevState) => {
            return({isSignup : !prevState.isSignup})
        })
    }
    componentDidMount = () => {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath()
        }
    }
    render(){
        let elementArray = []
        for(let key in this.state.controls){
            elementArray.push({
                id : key,
                ...this.state.controls[key]
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
        let form = !this.props.loading 
                    ?<div>
                        <form onSubmit={this.submitHandler}>
                            {elements}
                            <Button btnType="Success">SUBMIT</Button>
                        </form>
                        <Button btnType="Danger" click={this.authMethodSwitchHandler}>{this.state.isSignup? 'SIGNUP' : 'SIGNIN'}</Button>
                    </div>
                    :<Spinner />
        
        let errorMessage = this.props.error ? <p>{this.props.error.data.error.message}</p> : null
        //authRedirect login
        let authRedirect = null
        if (this.props.isAuthenticated && this.props.buildingBurger) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        if (this.props.isAuthenticated && !this.props.buildingBurger){
            authRedirect = <Redirect to="/"/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        )
    }
}


const mapStatetoProps = (state) => {
    return(
        {
            loading : state.auth.loading,
            error : state.auth.error,
            isAuthenticated : state.auth.idToken !== null,
            buildingBurger : state.burger.building,
            authRedirectPath : state.auth.authRedirectPath
        }
    )
}
const mapDispatchtoProps = (dispatch) => {
    return(
        {
            auth : (email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
            setAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
        }
    )
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Auth)