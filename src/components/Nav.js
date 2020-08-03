import React, { Component } from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  navHeading: {
    color: "#0c2845",
    fontWeight: "bold",
  },
};

export default class Nav extends Component {
  render() {
    return (
      <ul
        className="nav nav-pills nav-justified"
        style={{ marginBottom: "5%" }}>
        <li className="nav-item">
          <Link className="nav-link" to="/" style={styles.navHeading}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile" style={styles.navHeading}>
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-store" style={styles.navHeading}>
            My store
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/add-listing"
            style={styles.navHeading}>
            Add a listing
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart" style={styles.navHeading}>
            <span role="img" aria-label="das" >
              🛒
              {this.props.cartItems && this.props.cartItems.length > 0 && (
                <Badge
                  pill
                  variant="success"
                  style={{ marginLeft: "3px", marginBottom: "2px" }}>
                  {this.props.cartItems.length}
                </Badge>
              )}
            </span>
          </Link>
        </li>
      </ul>
    );
  }
}
