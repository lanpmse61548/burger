import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type: 'salad'},
    {label:'Meat',type: 'meat'},
    {label:'Cheese',type: 'cheese'},
    {label:'Bacon',type: 'bacon'}
]

const buildControls = (props) => {
    return ( 
    <div className='BuildControls'>
    <p>Total price : <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(value => <BuildControl isDisabled={props.isDisabled[value.type]}
         label={value.label} 
         key={value.label} 
         added={() => props.add(value.type)}
         removed={()=> props.remove(value.type)}
         />
         )}
         <button onClick={props.ordered} disabled={!props.isPurchasable} className='OrderButton'>Order Now</button>
    </div>
    )
}

export default buildControls;