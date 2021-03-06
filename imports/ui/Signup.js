import React from "react";
import { Link } from "react-router";
import { Accounts } from "meteor/accounts-base";

export default class Signup extends React.Component {
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

    if (password.length < 9) {
      return this.setState({
        error: "Password must be at least 9 characters long."
      });
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({ error: err.reason });
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
          <h1>Join</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view--form">
            <input type="email" ref="emailRef" name="email" placeholder="Email" />
            <input
              type="password"
              ref="passwordRef"
              name="password"
              placeholder="Password"
            />
            <button className="button hvr-grow">Create Account</button>
          </form>
          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}
