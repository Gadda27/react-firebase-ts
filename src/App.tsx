import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {withFirebaseSC, IWithFirebaseProps } from './components/Firebase/context'

import * as ROUTES from "./constants/routes";

import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import PasswordForgetPage from "./components/PasswordForget";
import HomePage from "./components/Home";
import AccountPage from "./components/Account";
import AdminPage from "./components/Admin";
import AuthUserContext from "./components/Session/context";

interface IAppState {
  authUser: firebase.User | null;
}


class App extends Component<IWithFirebaseProps, IAppState> {
  constructor(props:IWithFirebaseProps) {
    super(props);
    console.log(this.props.firebase)
    this.state = {
      authUser: null
    };
  }
  componentDidMount() {
    this.props.firebase?
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      this.setState({ authUser })
    }): console.log("No Firebase");
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
      <Router>
        <div>
        <Navigation/>

        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
      </AuthUserContext.Provider>
    );
  }
}

export default  withFirebaseSC(App);
