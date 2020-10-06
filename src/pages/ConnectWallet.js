import React, { Component } from "react";

const styles = {
  background: {
    textAlign: "center",
  },
  navHeading: {
    textAlign: "center",
    fontColor: "#0c2845",
    paddingBottom: "10px",
  },
};

export default class AddListing extends Component {  
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={styles.navHeading}>
          Please connect wallet
        </h1>
      </div>
    );
  }
}
