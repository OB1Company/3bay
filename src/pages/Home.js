import React, { Component } from "react";
import { CardColumns, Row } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

import ListingCard from "../components/ListingCard.js";

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
  slash: {
    fontSize: "13px",
    textAlign: "left",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  link: {
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    color: "#0000EE",
  },
  path: {
    fontSize: "13px",
    textAlign: "left",
    color: "#000000",
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
        <Row>
          <Link className="brand-font float-sm-left" style={styles.path}>
            all
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/bbb"
            style={styles.link}>
            bbb
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/shoes"
            style={styles.link}>
            shoes
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/shirts"
            style={styles.link}>
            shirts
          </Link>
        </Row>
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
                    testnetReceipts={this.props.testnetReceipts}
                    testnetReceiptItems={this.props.testnetReceiptItems}
                    getTestnetReceipts={this.props.getTestnetReceipts}
                    inboxThread={this.props.inboxThread}
                    inboxMessages={this.props.inboxMessages}
                    getInboxThread={this.props.getInboxThread}
                  />
                );
              })}
          </CardColumns>
        </div>
      </div>
    );
  }
}
