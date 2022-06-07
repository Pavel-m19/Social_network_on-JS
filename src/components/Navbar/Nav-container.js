import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import { getCurrentUserThunkCreator } from "../../redux/auth-reducer"

class NavClass extends React.Component {
    
    componentDidMount() {        
        this.props.getCurrentUserThunkCreator()
    }

    render() {
        return <Nav {...this.props}/>
    }
}

let stateToProps = (state) => {        
    return{
    id: state.auth.id    
}}



const NavContainer = connect(stateToProps, {getCurrentUserThunkCreator})(NavClass)

export default NavContainer
