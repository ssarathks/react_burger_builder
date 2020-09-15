import React from 'react'
import burgerLogo from '../../assets/images/logo.png'
import classes from './Logo.css'

const logo = () => {
    return(
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="burger"/>
        </div>
    )
}

export default logo;