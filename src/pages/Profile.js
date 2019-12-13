import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div style={{margin : 'auto'}}>
          <h1 style={{textAlign : "center"}}>Edit your 3Box Profile here 👇</h1>
          <EditProfile
            box={this.props.box}
            space={this.props.space}
            currentUserAddr={this.props.accounts[0]}
            currentUser3BoxProfile={this.props.threeBoxProfile}
          />
        </div>
      </div>
    );
  }
}
