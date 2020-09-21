import React, { Component } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
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
          paddingLeft: "0",
          paddingRight: "0",
          justifyContent: "space-evenly",
        }}>
        <ul
          className="nav sticky-top nav-pills nav-justified"
          style={{
            marginBottom: "5%",
            background: "#ffffff",
          }}>
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
          <li className="nav-item">
            <Link
              className="nav-link brand-font"
              to="/add-listing"
              style={styles.navHeading}>
              Add a listing
            </Link>
          </li>
          <li className="nav-item brand-font">
            <Link className="nav-link" to="/orders" style={styles.navHeading}>
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link brand-font"
              to="/inbox"
              style={styles.navHeading}>
              Inbox
              {this.props.inboxMessages && this.props.inboxMessages.length > 0 && (
                <Badge
                  pill
                  variant="success"
                  style={{ marginLeft: "3px", marginBottom: "2px" }}>
                  {this.props.inboxMessages.length}
                </Badge>
              )}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
