import React from 'react'
import './BuildControl.css'

const buildControl = (props) => {
    return (<div className='BuildControl'>
        <label className='Label'>{props.label}</label>
        <button className='More' onClick={props.added}>More</button>
        <button className='Less'  onClick={props.removed} disabled={props.isDisabled}>Less</button>
    </div>)
}

export default buildControl;