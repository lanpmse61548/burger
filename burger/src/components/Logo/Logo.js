import React from 'react'
import './Logo.css'
import logo from '../../assets/burger-logo.png'

const burgerLogo = (props) => {
    return (<div className='Logo'>
        <img src={logo} alt="myBurger"></img>
    </div>);

}
export default burgerLogo;