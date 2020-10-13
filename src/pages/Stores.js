import React, { Component } from "react";
import { CardColumns, Col } from "react-bootstrap";
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
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      const storeAccount = this.props.match.params.threadId;
      console.log(storeAccount);
      // this.props.getStorePosts(this.props.match.params.threadId);
      this.setState(
        { storeAccount: storeAccount },
        () => this.props.getStorePosts(storeAccount),
        this.props.getStoreProfile(storeAccount)
      );
    }
  }

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
        {!this.props.match && <h1 className="brand-font">Store not found</h1>}
        <p className="brand-font">Storefront</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {this.props.match &&
            this.props.params &&
            this.props.params.threadId &&
            !this.props.storePosts && (
              <div style={{ width: "60px", margin: "auto" }}>
                <BounceLoader color={"black"} />
              </div>
            )}
          {!this.props.match && (
            <Col sm={12}>
              <p className="brand-font">
                Please include a store account in the url path (e.g.
                /store/0xd664d46e6adc48a66244310223bfbb89ed42b12c).
              </p>
            </Col>
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
