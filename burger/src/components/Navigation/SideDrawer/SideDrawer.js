import React from 'react'
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css'
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

   let classes = ['SideDrawer'];

   if(props.open){
     classes.push('Open');  
   } else{
    classes.push('Close');  

   }

    return (
       <Aux>
           <Backdrop show={props.show} clicked={props.handleClose} />
        <div className={classes.join(' ')}>
           <div className='SideDrawerLogo'>
            <BurgerLogo />
           </div>
            <nav>
                <NavigationItems authenticated={props.authenticated} />
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer;