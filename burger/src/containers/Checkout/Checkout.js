import React, { Component } from 'react'
import CheckoutSummary from '../../components/Burger/OrderSummary/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }

    //     }

    //     console.log(ingredients);

    //     this.setState({ ingredients: ingredients,price: price });
    // }

    handleCancel = () => {
        this.props.history.goBack();
    }

    handleContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
       
            const purchased = !this.props.purchased && !this.props.buildingBurger ? <Redirect to='/' /> : null;

            summary = (<div>
                {purchased}
                <CheckoutSummary checkout={this.handleContinue}
                    cancel={this.handleCancel}
                    ingredients={this.props.ings} />
                {/* <Route path={this.props.match.path + '/contact-data'} component={(props) => <ContactData 
            ingredients={this.props.ings}
             price={this.props.totalPrice} {...props} />} /> */}

                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
            )
        }
        return summary;


    }

    // render() {


    //     return (

    //         <div>
    //             <CheckoutSummary checkout={this.handleContinue}
    //                 cancel={this.handleCancel}
    //                 ingredients={this.props.ings} />
    //             {/* <Route path={this.props.match.path + '/contact-data'} component={(props) => <ContactData 
    //             ingredients={this.props.ings}
    //              price={this.props.totalPrice} {...props} />} /> */}

    //               <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
    //         </div>
    //     )

    // }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        purchased: state.order.purchased,
        buildingBurger: state.burger.building

    };
};

export default connect(mapStateToProps, null)(Checkout);