import React, { Component } from "react";
import { CardColumns, Col, Container, Image } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import makeBlockie from "ethereum-blockies-base64";

import { placeholderImage } from "../Constants";
import ListingCard from "../components/ListingCard.js";

const styles = {
  column: {
    width: "100%",
    columnCount: "3",
  },
  background: {
    textAlign: "center",
    position: "relative",
  },
};

export default class Store extends Component {
  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      const storeAccount = this.props.match.params.account;
      console.log(storeAccount);
      // this.props.getStorePosts(this.props.match.params.account);
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
        <Container
          style={{
            position: "relative",
            padding: "0px",
            marginBottom: "60px",
            marginTop: "20px",
          }}>
          {this.props.storeAccount && (
            <Image
              src={
                this.props.storeObject && this.props.storeObject.storeHeader
                  ? this.props.storeObject.storeHeader
                  : placeholderImage
              }
              fluid
              style={{
                height: "200px",
                padding: "0px",
                borderStyle: "dashed",
                borderWidth: "thin",
                borderColor: "#000000",
                width: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(50%)",
              }}
            />
          )}
          {this.props.storeAccount && (
            <Container
              style={{ position: "absolute", bottom: "-25%", margin: "0px" }}>
              <Image
                src={
                  this.props.storeObject && this.props.storeObject.storeAvatar
                    ? this.props.storeObject.storeAvatar
                    : makeBlockie(this.props.storeAccount)
                }
                alt="Avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  borderStyle: "dashed",
                  borderWidth: "thin",
                  borderColor: "#000000",
                  objectFit: "cover",
                }}
                roundedCircle
              />
            </Container>
          )}
        </Container>
        {this.props.storeAccount && (
          <h1 className="brand-font">
            {this.props.storeObject && this.props.storeObject.storeName
              ? this.props.storeObject.storeName
              : this.props.storeAccount}
          </h1>
        )}
        {!this.props.match && <h1 className="brand-font">Store not found</h1>}
        {this.props.storeAccount && (
          <p className="brand-font">
            {this.props.storeObject && this.props.storeObject.storeDescription
              ? this.props.storeObject.storeDescription
              : `Another amazing store on 3Bay!`}
          </p>
        )}
        <div className="row" style={{ marginTop: "50px" }}>
          {this.props.match &&
            this.props.params &&
            this.props.params.account &&
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
                  Nothing for sale here yet!
                </p>
              )}
            </CardColumns>
          )}
          {!this.props.storePosts && (
            <p className="brand-font" style={{ textAlign: "left" }}>
              Nothing for sale here yet!
            </p>
          )}
        </div>
      </div>
    );
  }
}
