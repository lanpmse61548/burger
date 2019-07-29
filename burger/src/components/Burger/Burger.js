import React from 'react'
import BurgeIngredient from './BurgerIngredient/BurgerIngredient';
import './Burger.css'
const burger = (props) => {

    let transfromedIngredient = Object.keys(props.ingredients)
    .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map((_,i) =>{
                return  <BurgeIngredient type={igKey} key={igKey+i} />
            });
        }
    ).reduce((arr,el)=>{return arr.concat(el)},[]);

    if(transfromedIngredient.length ===0){
        transfromedIngredient = <p>Please start adding ingredient</p>
    }
    return (
        <div className='Burger'>
            <BurgeIngredient type='bread-top' />
            {/* <BurgeIngredient type='cheese' />
            <BurgeIngredient type='meat' /> */}
            {transfromedIngredient}
            <BurgeIngredient type='bread-bottom' />

        </div>

    );
};

export default burger;