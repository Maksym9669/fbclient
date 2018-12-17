import React, { Component } from "react";
import { Link } from "react-router-dom";

//Add things related to firestore so we can insert data there

import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  //Create onChange event as an arrow function, because we don't have binding

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;

    const { firestore, history } = this.props;

    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
    //As we have promise, we can redirect after submitting data into firestore.
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-left" />
                {"  "}
                Back to Dashboard
              </Link>
              <div className="card">
                <div className="card-header">Add client</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        // EventHandler equals method
                        value={this.state.firstName}
                      />
                      {/* We need to put each input as a piece of state */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        minLength="2"
                        required
                        onChange={this.onChange}
                        value={this.state.lastName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={this.onChange}
                        value={this.state.phone}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="balance">Balance</label>
                      <input
                        type="text"
                        className="form-control"
                        name="balance"
                        onChange={this.onChange}
                        value={this.state.balance}
                      />
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
//We have this.props.firestore available to us due to this connection
