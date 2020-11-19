import React, { Component } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  logo: {
    color: "#0c2845",
    fontWeight: "bold",
    fontSize: "17px",
    lineHeight: "17px",
    textAlign: "center",
  },
  navStyle: {
    maxWidth: "150px",
    fontFamily: "monospace",
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
      <Container
        fluid
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          paddingLeft: "0",
          paddingRight: "0",
          justifyContent: "center",
        }}>
        <Row style={{ alignItem: "center" }}>
          <Col sm={2}>
            <Link className="nav-link brand-font" to="/" style={styles.logo}>
              3Bay
            </Link>
          </Col>
          <Col sm={8}>
            <ul
              className="nav sticky-top nav-pills nav-justified"
              style={{
                alignItems: "center",
                zIndex: "499",
                justifyContent: "center",
              }}>
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link brand-font"
                  to="/"
                  style={styles.navHeading}>
                  Home
                </Link>
              </li>
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link brand-font"
                  to="/profile"
                  style={styles.navHeading}>
                  Profile
                </Link>
              </li>
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link brand-font"
                  to="/my-store"
                  style={styles.navHeading}>
                  My store
                </Link>
              </li>
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link"
                  to="/orders"
                  style={styles.navHeading}>
                  Purchases
                </Link>
              </li>
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link brand-font"
                  to="/sales"
                  style={styles.navHeading}>
                  Sales
                  {this.props.salesMessages &&
                    this.props.salesMessages.length > 0 && (
                      <span
                        className="brand-font"
                        style={{ paddingLeft: "2px", color: "red" }}>
                        [{this.props.salesMessages.length}]
                      </span>
                    )}
                </Link>
              </li>
              <li className="nav-item" style={styles.navStyle}>
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
              <li className="nav-item" style={styles.navStyle}>
                <Link
                  className="nav-link"
                  to="/about"
                  style={styles.navHeading}>
                  About
                </Link>
              </li>
            </ul>
          </Col>
          <Col
            sm={2}
            className="text-center"
            style={{ justifyContent: "center" }}>
            {this.props.walletConnected === false && (
              <Link to="/connect-wallet">
                <Button
                  className="btn btn-dark brand-font "
                  // onClick={this.props.handleWalletConnectModalShow}
                  style={{ fontWeight: "bold" }}>
                  Connect wallet
                </Button>
              </Link>
            )}
            {this.props.walletConnected === true && (
              <Link to="/connect-wallet">
                <Button className="btn brand-font" style={styles.connected}>
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
        </Row>
      </Container>
    );
  }
}
