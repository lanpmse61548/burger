import React from 'react'
import'./Button.css'

const buttonComponent = (props) =>{
    let classes = ['Button',props.btnType];
    
    return(

        <button onClick={props.clicked} className={classes.join(' ')}> 
            {props.children}
        </button>
    )
}

export default buttonComponent;