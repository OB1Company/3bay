import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  logo: {
    color: "#0c2845",
    fontWeight: "bold",
    fontSize: "17px",
    lineHeight: "17px",
  },
  navHeading: {
    color: "#0c2845",
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "15px",
  },
  connected: {
    backgroundColor: "#ffffff",
    color: "#343a40",
    borderColor: "#343a40",
    borderWidth: "1px",
  },
  dot: {
    height: "10px",
    width: "10px",
    marginLeft: "5px",
    backgroundColor: "#00d395",
    borderRadius: "50%",
    display: "inline-block",
  },
};

export default class Nav extends Component {
  render() {
    return (
      <div
        className="container"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          paddingLeft: "0",
          paddingRight: "0",
          justifyContent: "space-evenly",
        }}>
        <ul
          className="nav sticky-top nav-pills nav-justified"
          style={{
            alignItems: "center",
            zIndex: "499",
          }}>
          <Col sm={2}>
            <Link className="nav-link brand-font" to="/" style={styles.logo}>
              Spendly
            </Link>
          </Col>
          <Col sm={8}>
            <Row>
              <li className="nav-item">
                <Link
                  className="nav-link brand-font"
                  to="/"
                  style={styles.navHeading}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link brand-font"
                  to="/profile"
                  style={styles.navHeading}>
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link brand-font"
                  to="/my-store"
                  style={styles.navHeading}>
                  My store
                </Link>
              </li>
              <li className="nav-item brand-font">
                <Link
                  className="nav-link"
                  to="/orders"
                  style={styles.navHeading}>
                  Purchases
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link brand-font"
                  to="/inbox"
                  style={styles.navHeading}>
                  Inbox
                  {this.props.inboxMessages &&
                    this.props.inboxMessages.length > 0 && (
                      <span
                        className="brand-font"
                        style={{ paddingLeft: "2px", color: "red" }}>
                        [{this.props.inboxMessages.length}]
                      </span>
                    )}
                </Link>
              </li>
              <li className="nav-item brand-font">
                <Link
                  className="nav-link"
                  to="/about"
                  style={styles.navHeading}>
                  About
                </Link>
              </li>
            </Row>
          </Col>
          <Col sm={2}>
            {this.props.walletConnected === false && (
              <Link to="/connect-wallet">
                <Button
                  className="btn btn-dark brand-font float-sm-right"
                  // onClick={this.props.handleWalletConnectModalShow}
                  style={{ fontWeight: "bold" }}>
                  Connect wallet
                </Button>
              </Link>
            )}
            {this.props.walletConnected === true && (
              <Link to="/connect-wallet">
                <Button
                  className="btn brand-font float-sm-right"
                  style={styles.connected}>
                  {this.props.usersAddress.substring(0, 3)}...
                  {this.props.usersAddress.substring(
                    this.props.usersAddress.length - 3,
                    this.props.usersAddress.length
                  )}
                  <span className="dot" style={styles.dot}></span>
                </Button>
              </Link>
            )}
          </Col>
        </ul>
      </div>
    );
  }
}
