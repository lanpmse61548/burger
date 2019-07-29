import React from 'react'
import './DrawerToggle.css'

const drawerToggle = (props) => {
    return (
        <div onClick={props.toggle} className='DrawerToggle'>
        <div></div>
        <div></div>
        <div></div>
        </div>
    )
}

export default drawerToggle