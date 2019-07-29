import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import withErrorHanlder from '../../../hoc/withErrorHandler/withErrorHandler'

import * as orderActions from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation:{
                    require: true,
                    minLength: 5,
                },
                valid:false,
                isTouched:false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation:{
                    require: true
                },
                valid:false,
                isTouched:false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    require: true
                },
                valid:false,
                isTouched:false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation:{
                    require: true
                },
                valid:false,
                isTouched:false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    require: true
                },
                valid:false,
                isTouched:false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        // loading: false
    }

    handleOrder = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        console.log(this.state.orderForm);

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        // this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        // axios.post('/orders.json', order)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ loading: false });
        //         this.props.history.push('/');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({ loading: false });
        //     })

        this.props.onOrderStart(order,this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const  updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value,updatedElement.validation);
        updatedElement.isTouched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;
        this.setState({orderForm: updatedOrderForm});

    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return isValid;
        }
        if(rules.require){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.trim().length >= rules.minLength  && isValid;
        }

        if(rules.maxLength){
            isValid = value.trim().length <= rules.maxLength  && isValid;
        }

        return isValid;
    }

    render() {
        const formElemensArray = [];
        for (let key in this.state.orderForm) {
            formElemensArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        const inputArr = formElemensArray.map(value => {
            return <Input change={(event) =>{this.inputChangedHandler(event,value.id)}}
               key={value.id}
               valid={value.config.valid}
               elementType={value.config.elementType}
               elementConfig={value.config.elementConfig}
               value={value.config.value}
               shouldValidate={value.config.validation}
               isTouched={value.config.isTouched}
            />

        })

        let from = <form>
            {inputArr}
            <Button btnType='Success' clicked={this.handleOrder}>Order</Button>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
        </form>

        if (this.props.loading) {
            from = <Spinner />
        }


        return <div className='ContactData'>
            {from}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price : state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderStart:(orderData,token) => dispatch(orderActions.purchaseBurger(orderData,token))
    } 
}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHanlder(ContactData,axios));