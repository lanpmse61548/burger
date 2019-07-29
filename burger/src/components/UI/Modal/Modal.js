import React,{Component} from 'react'
import './Modal.css'
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

// const modal = (props) => {
//     return (
//         <Aux>
//             <Backdrop show={props.show} clicked={props.cancelModal} />
//             <div style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }} className='Modal'>
//                 {props.children}
//             </div>
//         </Aux>
//     );
// }



class Modal extends Component {
    shouldComponentUpdate(nextProp,nextState) {
        return nextProp.show !== this.props.show || nextProp.children !== this.props.children;
    }
   
    componentWillUpdate(){
        console.log('Modal WillUpdate')
    }
  render(){
    return (
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.cancelModal} />
            <div style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }} className='Modal'>
                {this.props.children}
            </div>
        </Aux>
    );
 }
}


export default Modal