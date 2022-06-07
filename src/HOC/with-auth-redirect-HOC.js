import { Navigate } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

 export const withAuthRedirect = (Component) => {
    let stateToProps = (state) => {
        return {
          profilePage: state.profilePage,
          isAuth: state.auth.isAuth,
          id: state.auth.id
        }
      }

    class RedirectComponent extends React.Component {
        render() {         
            if (!this.props.isAuth) { 
                return <Navigate to={'/Login'}/>
              }
            
              return <Component {...this.props}/>
        }
    }

    
    let ConnectedRedirectComponent = connect(stateToProps)(RedirectComponent)

    return ConnectedRedirectComponent

}



