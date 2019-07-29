import React from 'react'
import './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
    <ul className='NavigationItems'>
       <NavigationItem link='/'>Burger Buider</NavigationItem>
       <NavigationItem link='/orders'>Orders</NavigationItem>
       {props.authenticated ? <NavigationItem link='/logout'>Log out</NavigationItem>:
         <NavigationItem link='/auth'>Authentication</NavigationItem>
        }

    </ul>
    );
};

export default navigationItems;
