import EditProfile from "3box-profile-edit-react";
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

const styles = {
  background: {
    textAlign: "center",
  },
};

export default class Profile extends Component {
  state = {
    hideEdit: false,
  };
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font">3Box Profile</h1>
        {!this.props.space ? (
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <p
                className="brand-font"
                style={{ marginTop: "20px", fontSize: "18px" }}>
                Please connect wallet
              </p>
            </Col>
            <Col sm={2}></Col>
          </Row>
        ) : (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "40px" }}>
            {!this.state.hideEdit && (
              <EditProfile
                box={this.props.box}
                space={this.props.space}
                currentUserAddr={this.props.accounts[0]}
                currentUser3BoxProfile={this.props.threeBoxProfile}
                redirectFn={() => this.setState({ hideEdit: true })}
              />
            )}
            {this.state.hideEdit && (
              <div>
                <h2>{this.props.threeBoxProfile.name}</h2>
                <img alt="Avatar" src={this.props.threeBoxProfile.image} />
                <p>{this.props.threeBoxProfile.description}</p>
                <p>{this.props.threeBoxProfile.emoji}</p>
                <button onClick={() => this.setState({ hideEdit: false })}>
                  edit
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
