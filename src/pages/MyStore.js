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

export default class MyStore extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font">My store</h1>
        <p className="brand-font">This is my store.</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {!this.props.posts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.posts && (
            <CardColumns style={styles.column}>
              {this.props.posts.length >= 1 &&
                this.props.posts.map((post, i) => {
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
                    />
                  );
                })}
              {this.props.posts.length === 0 && (
                <p style={{ textAlign: "left" }}>Nothing here yet!</p>
              )}
            </CardColumns>
          )}
        </div>
      </div>
    );
  }
}
