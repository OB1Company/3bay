import React, { Component } from "react";
import {
  CardColumns,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ListingCard from "../components/ListingCard.js"

const styles = {
  column: {
    width: "100%",
    columnCount: "4",
  },
  background: {
    textAlign: "center",
  },
  wrapper: {
    padding: "20px",
    background: "rgb(0,0,0,0)",
    borderWidth: "0",
  },
};

export default class Home extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Spendit
        </h1>
        <p className="brand-font">Reddit-style decentralized marketplace.</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {(!this.props.globalPosts || this.props.globalPosts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <CardColumns style={styles.column}>
            {this.props.globalPosts &&
              this.props.globalPosts.map((post, i) => {
                return (
                  <ListingCard
                    globalThread={this.props.globalThread}
                    post={post}
                    key={i}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress}
                    cartItems={this.props.cartItems}
                    shoppingCart={this.props.shoppingCart}
                    getShoppingCartThread={this.props.getShoppingCartThread}
                    getGlobalListingsThread={this.props.getGlobalListingsThread}
                    i={i}
                    admin={this.props.admin}
                    home={true}
                  />
                );
              })}
          </CardColumns>
        </div>
      </div>
    );
  }
}
