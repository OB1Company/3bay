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
};

export default class Submarket extends Component {
  state = {
    submarketPosts: [],
  };

  async componentDidMount() {
    const threadId = this.props.match.params.threadId;
    this.setState({ threadId });
    if (this.props.space) {
      const space = this.props.space;
      const submarketThread = await space.joinThread("bbb", {
        firstModerator: "0xf54D276a029a49458E71167EBc25D1cCa235ee6f",
        members: false,
      });
      this.setState({ submarketThread }, () => this.getSubmarketThread());
    }
  }

  async getSubmarketThread() {
    if (!this.state.submarketThread) {
      console.error("global listings thread not in react state");
      return;
    }

    // Fetch the listings and add them to state
    const submarketPosts = await this.state.submarketThread.getPosts();
    this.setState({ submarketPosts });

    // Update the state when new listings are added
    await this.state.submarketThread.onUpdate(async () => {
      const submarketPosts = await this.state.submarketThread.getPosts();
      this.setState({ submarketPosts });
    });
  }

  render() {
    return (
      <div className="container" style={styles.background}>
        {this.state.threadId && (
          <div>
            <h1 className="brand-font" style={{ fontSize: "4rem" }}>
              s/{this.state.threadId}
            </h1>
            <p className="brand-font">Submarket</p>
          </div>
        )}
        <Row>
          <Link
            className="brand-font float-sm-left"
            to="/"
            style={{
              fontSize: "13px",
              textAlign: "left",
              cursor: "pointer",
              color: "#0000EE",
            }}>
            All
          </Link>
          <p
            style={{
              fontSize: "13px",
              textAlign: "left",
              paddingLeft: "2px",
              paddingRight: "2px",
            }}>
            /
          </p>
          <Link
            className="brand-font float-sm-left"
            to="/s/bbb"
            style={{
              fontSize: "13px",
              textAlign: "left",
              cursor: "pointer",
              color: "#0000EE",
            }}>
            Stuff
          </Link>
        </Row>
        <div className="row" style={{ marginTop: "50px" }}>
          {!this.state.submarketPosts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.state.submarketPosts && (
            <CardColumns style={styles.column}>
              {this.state.submarketPosts.length >= 1 &&
                this.state.submarketPosts.map((post, i) => {
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
                      getGlobalListingsThread={
                        this.props.getGlobalListingsThread
                      }
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
              {this.state.submarketPosts.length === 0 && (
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
