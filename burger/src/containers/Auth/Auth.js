import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'mail'
                },
                value: '',
                validation: {
                    require: true,
                    isEmail: true
                },
                valid: false,
                isTouched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    require: true,
                    minLength: 7,
                },
                valid: false,
                isTouched: false,
            },
        },
        isSignUp: true
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedcontrols = {
            ...this.state.controls
        };
        const updatedElement = {
            ...updatedcontrols[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.isTouched = true;
        updatedcontrols[inputIdentifier] = updatedElement;
        this.setState({ controls: updatedcontrols });

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

    handleSubmit=(event)=>{
          event.preventDefault();
          if(this.state.controls.email.valid && this.state.controls.password.valid){
          this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
          }
    }


    handleSwitch=(event)=>{
        event.preventDefault();

        this.setState(prevState =>{
           return { isSignUp: !prevState.isSignUp}
        })
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElemensArray = [];
        for (let key in this.state.controls) {
            formElemensArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const inputArr = formElemensArray.map(value => {
            return <Input change={(event) => { this.inputChangedHandler(event, value.id) }}
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
            <Button btnType='Success' clicked={this.handleSubmit}>Submit</Button>
            {/* <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button> */}
            <Button btnType='Danger' clicked={this.handleSwitch}>Switch to {this.state.isSignUp ?'Sign In' :'Sign Up'}</Button>

        </form>

        if (this.props.loading) {
            from = <Spinner />
        }

        let authRedirectPath = null;
        if(this.props.isAuthenticated){

            authRedirectPath = <Redirect to={this.props.authRedirectPath}/>
        }

        return <div className='ContactData'>
        {authRedirectPath}
        {this.props.error}
            {from}
        </div>
    }
}

const mapStateToProps = state =>{
    return{
    loading : state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);