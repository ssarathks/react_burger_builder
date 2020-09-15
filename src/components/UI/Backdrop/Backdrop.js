import React from 'react'
import classes from './Backdrop.css'
const backdrop = (props) => {
    return(
        <div className={classes.Backdrop}
                style={{
                    transform:props.show? 'translateY(0)':'translateY(-1000vh)',
                    opacity : props.show ? '1':'0'
                }}
                onClick={props.clicked}>
        
        </div>
    )
}

export default backdrop