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
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          My store
        </h1>
        <p>This is my store.</p>
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
                      globalThread={this.props.globalThread}
                      thread={this.props.thread}
                      post={post}
                      key={i}
                      threeBox={this.props.threeBox}
                      space={this.props.space}
                      box={this.props.box}
                      usersAddress={this.props.usersAddress}
                      cartItems={this.props.cartItems}
                      shoppingCart={this.props.shoppingCart}
                      getListingsThread={this.props.getListingsThread}
                      getShoppingCartThread={this.props.getShoppingCartThread}
                      getGlobalListingsThread={
                        this.props.getGlobalListingsThread
                      }
                      i={i}
                      admin={this.props.admin}
                      home={false}
                    />
                  );
                })}
              {this.props.posts.length === 0 && (
                <p style={{ textAlign: "left" }}>
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
