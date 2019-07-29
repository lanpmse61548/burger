import React from 'react'
import './Toolbar.css'
import BurgerLogo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {

    return (
        <header className='Toolbar'>
            <DrawerToggle toggle={props.toggle}/>
            <div className='ToolbarLogo'>
                <BurgerLogo />
            </div>

            <nav className='DesktopOnly'>
                <NavigationItems authenticated={props.authenticated}/>
            </nav>
        </header>
    )
}

export default toolbar;