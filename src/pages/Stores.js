import React, { Component } from "react";
import { CardColumns } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ListingCard from "../components/ListingCard.js";

const styles = {
  column: {
    width: "100%",
  },
  background: {
    textAlign: "center",
  },
};

export default class Store extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        {this.props.storeAccount && (
          <h1 className="brand-font">
            {this.props.storeProfile && this.props.storeProfile.name
              ? this.props.storeProfile.name
              : `${this.props.storeAccount.substring(
                  0,
                  5
                )}...${this.props.storeAccount.substring(
                  this.props.storeAccount.length - 5,
                  this.props.storeAccount.length
                )}`}
          </h1>
        )}
        <p className="brand-font">Storefront</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {!this.props.storePosts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.storePosts && (
            <CardColumns style={styles.column}>
              {this.props.storePosts.length >= 1 &&
                this.props.storePosts.map((post, i) => {
                  return (
                    <ListingCard
                      i={i}
                      admin={this.props.admin}
                      home={false}
                      thread={this.props.thread}
                      post={post}
                      key={i}
                      threeBox={this.props.threeBox}
                      space={this.props.space}
                      box={this.props.box}
                      usersAddress={this.props.usersAddress}
                      getListingsThread={this.props.getListingsThread}
                      submarketThread={this.props.submarketThread}
                      getSubmarketThread={this.props.getSubmarketThread}
                      getStorePosts={this.props.getStorePosts}
                      getStoreProfile={this.props.getStoreProfile}
                    />
                  );
                })}
              {this.props.storePosts.length === 0 && (
                <p className="brand-font" style={{ textAlign: "left" }}>
                  Nothing here yet!
                </p>
              )}
            </CardColumns>
          )}
        </div>
      </div>
    );
  }
}
