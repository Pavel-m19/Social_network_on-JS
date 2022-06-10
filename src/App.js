//import logo from './logo.svg';
import './App.css';
import DialogsContainer from './components/Dialogs/Dialogs-container';
import NavContainer from './components/Navbar/Nav-container';
import News from './components/News/News';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfileContainer from './components/Profile/Profile-container';
import UsersContainer from './components/Users/users-container';
import HeaderContainer from './components/Header/Header-container';
import LoginContainer from './components/Login/login-container';
import React from 'react';
import { initializeAPP } from "../src/redux/auth-reducer"
import { connect } from "react-redux";
import Preloader from './components/Common/preloader';
import { createBrowserHistory } from "history";
import FooterClass from './components/Footer/footer-container';
import Applications from './components/Applications/applications';


class App extends React.Component {

  componentDidMount() {
    this.props.initializeAPP()
  }

  render() {
    if (!this.props.auth.initialized) {
      return <Preloader />
    }

    const history = createBrowserHistory({ window });
    return (
      <BrowserRouter history={history} basename={process.env.PUBLIC_URL}>
        <div className='app_wrapper'>
          
          <HeaderContainer />
          <NavContainer />
          
          <div className='app_wrapper_content'>

            <Routes>
              <Route path='/' element={<ProfileContainer />} />
              <Route path='/Dialog/*' element={<DialogsContainer />} />
              <Route path='/Profile/:userID' element={<ProfileContainer />} />
              <Route path='/Profile/my' element={<ProfileContainer />} />
              <Route path='/News/*' element={<News />} />
              <Route path='/Applications/:appName' element={<Applications />} />
              <Route path='/Applications/' element={<Applications />} />
              <Route path='/Users/*' element={<UsersContainer />} />
              <Route path='/Login/*' element={<LoginContainer />} />
            </Routes>

          </div>

          <FooterClass/>

          

        </div>
      </BrowserRouter>
    );
  }
}

let stateToProps = (state) => {
  return {
    auth: state.auth
  };
};

let AppContainer = connect(stateToProps, { initializeAPP })(App);

export default AppContainer
