import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
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
            background: "#ffffff",
            alignItems: "center",
          }}>
          <Col sm={3}>
            <Link className="nav-link brand-font" to="/" style={styles.logo}>
              Spendly
            </Link>
          </Col>
          <Col sm={6}>
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
            </Row>
          </Col>
          <Col sm={3}></Col>
        </ul>
      </div>
    );
  }
}
