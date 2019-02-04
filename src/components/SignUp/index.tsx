import React, { Component } from "react";
import { Link, withRouter, RouteComponentProps} from "react-router-dom";
import * as ldsh from "lodash";
import * as ROUTES from "../../constants/routes";
import Firebase, {FirebaseContext} from "../Firebase";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
  
    <FirebaseContext.Consumer>
      {firebase => firebase !== null? <SignUpForm firebase={firebase} /> : <h1>no Firebase instance</h1>}
    </FirebaseContext.Consumer>  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

interface ISignUpFormProps extends RouteComponentProps {
  firebase: Firebase;
}

interface ISignUpFormState {
  username: string;
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: null | any;
}

class SignUpFormBase extends Component<ISignUpFormProps, ISignUpFormState> {
  constructor(props: ISignUpFormProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event: any) => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: any) => {
    if (Object.keys(this.state).includes(event.target.name))
      this.setState(
        ldsh.set(this.state, event.target.name, event.target.value)
      );
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
         Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpForm = withRouter(SignUpFormBase);


const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
