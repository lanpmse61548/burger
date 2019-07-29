
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}



//Reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state,{
                     purchased: true,
            });

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state,{
                loading: true,
            });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }

            return updateObject(state,{
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: false,
            });

            
        case actionTypes.PURCHASE_BURGER_FAIL:
        return updateObject(state,{
                loading: false
            });

        case actionTypes.FETCH_ORDER_START: {
            return updateObject(state,{
                ...state,
                loading: true
            });
        }
        case actionTypes.FETCH_ORDER_SUCCESS: {
            return updateObject(state,{

                orders: action.orders,
                loading: false
            });
        }

        case actionTypes.FETCH_ORDER_FAIL: {
            return updateObject(state,{
                loading: false
            });
        }
    }

    return state;
};

export default reducer;