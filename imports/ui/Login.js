import React from "react";
import { Link } from "react-router";
import { Meteor } from "meteor/meteor";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.emailRef.value.trim();
    let password = this.refs.passwordRef.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({
          error: "Unable to Login. Please recheck your email and password"
        });
      } else {
        this.setState({ error: "" });
      }
    });
  }

  render() {
    return (

      <div className="boxed-view">
        <h1 className="title hvr-shrink">Wee Link</h1>
        <div className="boxed-view--box" >
          <h1>Login</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view--form">
            <input type="email" ref="emailRef" name="email" placeholder="Email" />
            <input
              type="password"
              ref="passwordRef"
              name="password"
              placeholder="Password"
            />
            <button className="button hvr-grow">Let Me In!</button>
          </form>
          <Link to="/signup">Don't have an account? Signup</Link>
        </div>
      </div>
    );
  }
}
