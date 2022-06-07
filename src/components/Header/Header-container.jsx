import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { themeSwitcher, getCurrentUserThunkCreator, signOut  } from "../../redux/auth-reducer"

class HeaderClass extends React.Component {  

  render() {
    return <Header {...this.props} />
  }
}

let stateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const HeaderContainer = connect(stateToProps, { themeSwitcher, getCurrentUserThunkCreator, signOut })(HeaderClass)

export default HeaderContainer