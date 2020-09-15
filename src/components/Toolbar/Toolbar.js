import React from 'react'
import classes from './Toolbar.css'

import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <SideDrawerToggle clicked={props.toggleClicked}/>
            <Logo />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated = {props.isAuthenticated}/>
            </nav>
        </header>
    )
}

export default toolbar