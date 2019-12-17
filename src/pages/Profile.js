import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";

export default class Profile extends Component {
  state = {
    hideEdit : false
  }
  render() {
    return (
      <div className="container">
        <div style={{margin : 'auto'}}>
          <h1 style={{textAlign : "center"}}>Edit your 3Box Profile here 👇</h1>
          {!this.state.hideEdit && <EditProfile
            box={this.props.box}
            space={this.props.space}
            currentUserAddr={this.props.accounts[0]}
            currentUser3BoxProfile={this.props.threeBoxProfile}
            redirectFn={()=>(this.setState({hideEdit : true}))}
          />}
          {this.state.hideEdit && (
            <div>
              <h2>{this.props.threeBoxProfile.name}</h2>
              <img src={this.props.threeBoxProfile.image.contentUrl['/']} />
              <p>{this.props.threeBoxProfile.description}</p>
              <p>{this.props.threeBoxProfile.emoji}</p>
              <button onClick={()=>(this.setState({hideEdit : false}))}>edit</button>

            </div>
          )}
        </div>
      </div>
    );
  }
}
