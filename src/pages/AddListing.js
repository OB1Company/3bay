import React, { Component } from "react";
import ListingForm from "../components/ListingForm";
import { BounceLoader } from "react-spinners";

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
  state = {
    thread: null,
    submarketThread: null,
  };

  saveListing = async (formData) => {
    formData.account = this.props.accounts[0];
    await this.props.thread.post(formData);
    await this.props.submarketThread.post(formData);
    this.props.getListingsThread();
    this.props.getSubmarketThread();
  };
  
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={styles.navHeading}>
          Add a listing
        </h1>
        {!this.props.thread && (
          <div style={{ width: "100px", margin: "auto" }}>
            <BounceLoader color={"blue"} />
          </div>
        )}
        {this.props.thread && this.props.submarketThread && (
          <ListingForm
            saveListing={this.saveListing}
            inboxThreadAddress={this.props.inboxThreadAddress}
          />
        )}
      </div>
    );
  }
}
