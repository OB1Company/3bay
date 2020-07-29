import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <ul className="nav nav-pills nav-justified" style={{marginBottom : '5%'}}>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-store">
            My store
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-listing">
            Add a listing
          </Link>
        </li>
      </ul>
    );
  }
}
