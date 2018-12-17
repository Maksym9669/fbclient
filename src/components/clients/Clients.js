import React, { Component } from "react";
import { Link } from "react-router-dom";

//Connecting firestore to the project
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

//

import Spinner from "../layout/Spinner";
class Clients extends Component {
  state = {
    totalOwed: null
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    }
    return null;
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;
    let sum = 0;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-users" />
                {"  "}
                Clients
              </h1>
            </div>
            <div className="col-md-6">
              <h3 className="text-center">
                Total: {"  "}{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h3>
            </div>
          </div>
          <table className="table table-striped ">
            <thead className="thead-inverse ">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Phone</th>
                <th />
                {/* <th>Image</th> */}
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td className="align-middle">
                    {client.firstName}
                    {"  "}
                    {client.lastName}
                  </td>

                  <td className="align-middle">{client.email}</td>
                  <td className="align-middle">
                    ${parseFloat(client.balance).toFixed(2)}
                  </td>

                  <td>{client.phone}</td>
                  <td className="align-middle">
                    <Link
                      to={`/client/${client.id}`}
                      //Dynamic path
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" />
                      {"  "}
                      Details
                    </Link>
                  </td>
                  {/* <td className="align-middle">
                    <img
                      src={client.image}
                      alt="Loading...."
                      style={{
                        width: "100px",
                        margin: "auto",
                        display: "block"
                      }}
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients //Map props to state
  }))
)(Clients);
// Put the data from the clients collection in the state and then in the props. So we can access this data from prop "clients".
