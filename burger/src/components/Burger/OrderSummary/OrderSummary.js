import React, { Component } from 'react'
import Aux from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

// const orderSummary = (props) => {
//     const choices = Object.keys(props.ingredients).map(
//         igKey => {
//             return (
//                 <li key={igKey}>
//                    <span style={{textTransform: 'capitalize'}}>{igKey}:</span>  {props.ingredients[igKey]}
//                 </li>
//             )
//         })

//     return (
//         <Aux>
//             <h3>Your order</h3>
//             <p>Your choice :</p>
//             <ul>
//                   {choices}
//             </ul>
//             <p><strong>Total price : {props.totalPrice}</strong></p>
//             <Button btnType='Success' clicked={props.continue}>Continue</Button>
//             <Button  btnType='Danger'  clicked={props.cancel}>Cancel</Button>
//         </Aux>
//     )
// }


class OrderSummary extends Component {


    componentWillUpdate() {
        console.log('OrderSummary WillUpdate')
    }

    render() {



        const choices = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}:</span>  {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>Your choice :</p>
                <ul>
                    {choices}
                </ul>
                <p><strong>Total price : {this.props.totalPrice}</strong></p>
                <Button btnType='Success' clicked={this.props.continue}>Continue</Button>
                <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
            </Aux>
        )
    };
}

export default OrderSummary;