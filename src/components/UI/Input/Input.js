import React from 'react'
import classes from './Input.css'
const input = (props) => {
    
    let inputElement = null
    
    let attachedClasses = [classes.InputElement]
    if(!props.validity && props.shouldValidate && props.touched){
        attachedClasses.push(classes.Invalid)
    }
    
    switch (props.elementtype) {
        case 'input':
            inputElement = <input 
                className={attachedClasses.join(' ')} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
        
        case 'text-area':
            inputElement = <textarea
                className={attachedClasses.join(' ')} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}></textarea>
            break;
        case 'select':
            inputElement = <select 
                className={attachedClasses.join(' ')} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}>
                {props.elementconfig.options.map(option => {
                    return(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    )
                })}
            </select>
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementconfig} 
                value={props.value}
                onChange={props.changed}/>
            break;
    }
    return(
        <div className={classes.Input}>
            {inputElement}
        </div>
    )
}

export default input