import React, { Component } from 'react'
import Aux from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux'
import './Layout.css'
// const layout = (props) =>(
//     <Aux>
//       <Toolbar/>
//       <SideDrawer/>
//       <main className="Content">
//           {props.children}
//       </main>
//     </Aux>
// )


class Layout extends Component {

state ={
    show: false
}

handleClose = () =>{
    this.setState({show : false})
}

handleShow = () =>{
    this.setState((prevState)=>{
        return {show :!prevState.show};
    });
}
    render() {
        return (<Aux>
            <Toolbar toggle={this.handleShow} authenticated={this.props.authenticated} />
            <SideDrawer  authenticated={this.props.authenticated}
            toggle={this.handleShow} 
            open={this.state.show} show={this.state.show} 
            handleClose={this.handleClose}/>
            <main className="Content">
                {this.props.children}
            </main>
        </Aux>);
    }
}


const mapStateToProps = state => {
    return {
        authenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps,null)(Layout);