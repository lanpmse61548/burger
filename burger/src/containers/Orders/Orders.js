import React, { Component } from 'react'
import Order from '../Order/Order';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    //  state ={orders:[],
    //           loading: false}

    componentDidMount() {
        //   axios.get('orders.json')
        //   .then(res =>{const fetched =[];
        //     for(let key in res.data){
        //         fetched.push({
        //             ...res.data[key],
        //             id:key
        //         });
        //     }
        //     this.setState({loading:false, orders : fetched})
        //   })
        //   .catch(error =>{
        //     this.setState({loading:false})
        //   })
        this.props.onInitOrder(this.props.token,this.props.userId);
    }

    render() {
        let value = <Spinner />;

        if (this.props.orders) {
            value = (<div>
                {this.props.orders.map(value => {
                    return <Order ingredients={value.ingredients} price={value.price} />
                })}
            </div>);
        }

        return value;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onInitOrder: (token,userId) => dispatch(actions.fetchOrder(token,userId))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));