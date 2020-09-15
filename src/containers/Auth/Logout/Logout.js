import React ,{ Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../Store/actions/index'
class Logout extends Component {
    componentDidMount = () => {
        this.props.authLogout()
    }
    render() {
        return(<Redirect to="/"/>)
    }
}

const mapDispatchtoProps = (dispatch) => {
    return({
        authLogout : () => dispatch(actions.authLogout())
    })
}

export default connect(null, mapDispatchtoProps)(Logout)