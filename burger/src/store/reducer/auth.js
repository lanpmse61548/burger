
import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../ultility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}



 const setAuthRedirectPath = (state, action) =>{
    return updateObject(state,{authRedirectPath: action.path});
}
//Reducer
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {
                purchased: true,
            });

        case actionTypes.AUTH_START:
            return updateObject(state, {
                error: null,
                loading: true
            });
        case actionTypes.AUTH_SUCCESS:

            return updateObject(state, {
                loading: false,
                error: null,
                userId: action.userId,
                token: action.token
            })

        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            });
        case actionTypes.AUTH_LOGOUT:
        return updateObject(state, {
            userId: null,
            token: null
        });
        case actionTypes.SET_AUTH_REDIRECT_PATH:
        return setAuthRedirectPath(state,action);
    }

    return state;
};

export default reducer;