import React, { Component } from 'react';
import {connect} from 'react-redux'
import classes from './Layout.css';
import * as actions from '../../Store/actions/index'

import Aux from '../../hoc/Auxilliary';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer : false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return(
                {showSideDrawer : !(prevState.showSideDrawer)}
            )
        })
    }
    render(){
        return(
            <Aux>
                <div className={classes.Layout}>
                    <Toolbar 
                        toggleClicked={this.sideDrawerToggleHandler}
                        isAuthenticated = {this.props.isAuthenticated}/>
                    <SideDrawer 
                        show={this.state.showSideDrawer} 
                        backdropClicked={this.closeSideDrawerHandler}
                        isAuthenticated = {this.props.isAuthenticated}/>
                    <div className={classes.Content}>
                        {this.props.children}
                    </div>
                </div>
            </Aux>
        )
    }
}

const mapStatetoProps = (state) => {
    return(
        {
            isAuthenticated : state.auth.idToken !== null
        }
    )
}

export default connect(mapStatetoProps)(Layout);

