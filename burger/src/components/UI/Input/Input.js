import React from 'react'
import './Input.css'

const input = (props) =>{
    let inputElement = null;
    const inputClasses = ['InputElement'];
    if(!props.valid && props.shouldValidate && props.isTouched){
        inputClasses.push('Invalid')
    }

    switch(props.elementType){
        case('input'):
          inputElement = <input className={inputClasses.join(' ')}
           {...props.elementConfig}
           value={props.value} onChange={props.change}/>
          break;
        case('textarea'):
         inputElement = <textarea className={inputClasses.join(' ')}
         {...props.elementConfig}
         value={props.value} onChange={props.change}/>
         break;
        
         case('select'):
         inputElement = <select onChange={props.change}
         className={inputClasses.join(' ')}
         value={props.value}>
             {props.elementConfig.options.map(element =>{
                 return <option key={element.value} value={element.value}>{element.displayValue}</option>
             })}
         </select>
         break;

        default:
        inputElement = <input className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.change}/>

    }

    return (<div className='Input'>
        <label className='Label'>{props.label}</label>
        {inputElement}
       </div>)

}

export default input;