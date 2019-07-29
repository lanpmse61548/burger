import React, { Component } from 'react'
import Aux from '../hoc/Auxilary';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuidControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import Spinner from '../components/UI/Spinner/Spinner';

import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import axios from '../axios-orders'
import {connect} from 'react-redux'

import * as burgerBuilderActions from '../store/actions/index'

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
class BurgerBuilder extends Component {


    state = {
        purchasing: false,
        loading: false
        // error : false
    }

    componentDidMount() {
        // first solution : just use dispatch to redux instead of setState
        // axios.get('/ingredients.json')
        //     .then(result => {
        //         this.setState({ ingredients: result.data });
        //     })
        //     .catch(err => { this.setState({error : true}); })
        this.props.onInitIngs();
       
    }

    updatePurchanseState = (updatedIngredient) => {

        const sum = Object.keys(updatedIngredient).map(
            igKey => { return updatedIngredient[igKey] }
        ).reduce((sum, el) => { return sum + el }, 0);
 
        return  sum > 0;
    }

    purchasingHandler = () => {
        if(this.props.isAuthenticated){
        this.setState({ purchasing: true });
        } else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchasingCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchasingContinueHandler = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Lan',
        //         address: {
        //             street: 'Phan Huy Ich'
        //         },
        //         email: 'test@abc.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }



        // axios.post('/orders.json', order)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({ loading: false, purchasing: false });
        //     })
       
    //     const queryParam = [];
    //     for (let i in this.props.ings){
    //         queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
    //     }
    //     queryParam.push('price=' + this.props.totalPrice);
    //     const queryString = queryParam.join('&');
    //     this.props.history.push({pathname: '/checkout',
    //       search: '?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push({pathname: '/checkout'});
    }

    render() {
        const isDisabled = { ...this.props.ings}
        console.log(isDisabled);  
        for (let key in isDisabled) {
            isDisabled[key] = isDisabled[key] <= 0;
        }

        let orderModalContent = null;

    

        let burgerSection = this.props.error ? <p>ingredients can't be found</p> : <Spinner />

        if (this.props.ings) {

            burgerSection = (<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls isPurchasable={this.updatePurchanseState(this.props.ings)} ordered={this.purchasingHandler}
                    price={this.props.totalPrice}
                    add={this.props.onAddIngs}
                    remove={this.props.onRemoveIng}
                    isDisabled={isDisabled} />
            </Aux>
            );

            orderModalContent = <OrderSummary ingredients={this.props.ings}
            cancel={this.purchasingCancelHandler}
            continue={this.purchasingContinueHandler}
            totalPrice={this.props.totalPrice} />

        }

        if (this.state.loading) {
            orderModalContent = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} cancelModal={this.purchasingCancelHandler}>
                    {orderModalContent}
                </Modal>
                {burgerSection}
            </Aux>
        );
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice : state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burger.building
    };
};


const mapDispatchToProps = dispatch => {
    return {
        // onAddIngs: (type) => dispatch({ type: actionTypes.ADD_INGREDIENT,ingredientName:type }),
        // onRemoveIng: (type) => dispatch({ type: actionTypes.REMOVE_INGREDIENT,ingredientName:type }),
        onAddIngs: (type) => dispatch(burgerBuilderActions.addIngredient(type)),
        onRemoveIng: (type) => dispatch(burgerBuilderActions.removeIngredient(type)),
        onInitIngs:() => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() => dispatch(burgerBuilderActions.purchaseInit()),
        onSetRedirectPath:(path) =>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    } 
}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(BurgerBuilder, axios));