import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Home</NavigationItem>
            {props.isAuthenticated ?<NavigationItem link="/orders">Orders</NavigationItem>:null}
            {props.isAuthenticated
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Authentication</NavigationItem>
            }
            
        </ul>
    )
}

export default navigationItems