import React from 'react'
import Burger from '../../Burger';
import './CheckoutSummary.css'
import Button  from '../../../UI/Button/Button';
const checkoutSummary = (props) =>{

    return (
        <div className='CheckoutSummary'>
             <h1>Hope you won't get cancer</h1>
             <div style={{width:'100%',margin:'auto'}}>
                 <Burger ingredients={props.ingredients}/>
             </div>
            <Button  btnType='Success' clicked={props.checkout}>Continue</Button>
            <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
        </div>
    )
}

export default checkoutSummary;