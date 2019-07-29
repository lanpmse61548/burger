import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId:userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}
export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {type: actionTypes.AUTH_LOGOUT};
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}
export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime)
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
}

export const auth =(email, password,isSignUp) =>{
    return dispatch =>{
        dispatch(authStart());
  
    const authData={
        email: email,
        password: password,
        returnSecureToken: true
    }
    let  url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCx3qHjfa07xQr6GoPecy6eCxl20Qx1_o8';
    if(isSignUp){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCx3qHjfa07xQr6GoPecy6eCxl20Qx1_o8';
    }

    axios.post(url,authData)
         .then(res =>{
            console.log(res);
            const expirationDate = new Date(new Date().getTime()+ res.data.expiresIn * 1000)
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('userId',res.data.localId);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn * 1000));
         })
         .catch(error => {
             console.log(error.response.data.error);
             dispatch(authFail(error.response.data.error.message));
            })

    };
}

export const authCheckSate = () =>{
    return dispatch =>{
       

        const token =localStorage.getItem('token');
        
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if(expirationDate < new Date()){
               dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
               //alert(expirationDate.getTime() - new Date().getTime());

              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()/1000)));
            }
        }
    }
}