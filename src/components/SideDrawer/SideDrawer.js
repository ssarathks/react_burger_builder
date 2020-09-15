import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';

import classes from './SideDrawer.css'
import Aux from '../../hoc/Auxilliary';
import Backdrop from '../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Close]
    if(props.show){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
            <Backdrop show={props.show} clicked={props.backdropClicked}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <NavigationItems isAuthenticated = {props.isAuthenticated}/>
            </div>
        </Aux>
    )
}

export default sideDrawer