import React, { Component } from "react";

import { Container, Button, Image, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ProfileHover from "profile-hover";
import OrderDetails from "../components/OrderDetails.js";
import { fontFamily } from "../Constants.js";

const styles = {
  background: {
    textAlign: "center",
  },
  wrapper: {
    padding: "20px",
    background: "rgb(0,0,0,0)",
    borderWidth: "0",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    objectPosition: "center",
    alignContent: "center",
    background: "#ffffff",
    borderStyle: "dotted",
    borderWidth: "thin",
    borderColor: "#000000",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "left",
    lineHeight: "20px",
    margin: "0px",
    padding: "0px",
    fontFamily,
    textOverflow: "ellipsis",
  },
  price: {
    fontSize: "17px",
    textAlign: "left",
    lineHeight: "17px",
    margin: "0px",
    padding: "0px",
    fontFamily,
  },
  link: {
    fontSize: "14px",
    textAlign: "left",
    lineHeight: "14px",
    margin: "0px",
    padding: "0px",
    fontFamily,
    color: "#000000",
    textDecoration: "underline",
  },
  topRight: {
    position: "absolute",
    top: "8px",
    right: "8px",
  },
  button: {
    backgroundColor: "#ffffff",
    borderColor: "#f0f0f0",
    fontSize: "18",
  },
};

class OrderItems extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  loadTheOrder = async (_stuff) => {
    // To do: add logic to open order thread here, add to state, and pass it to OrderDetails
    const space = this.props.space;
    const orderNumber = this.props.item.orderThreadAddress;
    this.setState({ orderNumber });
    const orderThread = await space.joinThreadByAddress(orderNumber);
    this.setState({ orderThread }, () => this.getOrderThread());
    this.setState({ show: true });
  };

  async getOrderThread() {
    if (!this.state.orderThread) {
      console.error("orders thread not in react state");
      return;
    }

    // Fetch the order list and add them to state
    const fetch = await this.state.orderThread.getPosts();
    let orderItems = fetch.reverse();
    let orderPreview = orderItems.pop();
    this.setState({ orderItems });
    this.setState({ orderPreview });

    // Update the order list when new orders are added
    await this.state.orderThread.onUpdate(async () => {
      const fetch = await this.state.orderThread.getPosts();
      let orderItems = fetch.reverse();
      let orderPreview = orderItems.pop();
      this.setState({ orderItems });
      this.setState({ orderPreview });
    });
  }

  deletePost = async (e) => {
    e.stopPropagation();
    const postId = this.props.post.postId;
    await this.props.testnetReceipts.deletePost(postId);
    this.props.getTestnetReceipts();
  };

  render() {
    return (
      <>
        <Row
          style={{
            paddingBottom: "5px",
            paddingLeft: "0px",
            marginLeft: "0px",
          }}>
          <Col sm={2}></Col>
          <Col sm={2} onClick={this.loadTheOrder} style={{ cursor: "pointer" }}>
            <Image
              alt="Listing"
              src={
                this.props.item && this.props.item.listingImage
                  ? this.props.item.listingImage
                  : "https://via.placeholder.com/150"
              }
              onError={(ev) =>
                (ev.target.src = "https://via.placeholder.com/150")
              }
              style={styles.image}
              fluid
            />
          </Col>
          <Col
            sm={4}
            style={{ marginTop: "5px", cursor: "pointer" }}
            onClick={this.loadTheOrder}>
            <Row>
              <p style={styles.name}>
                {this.props.item && this.props.item.name
                  ? this.props.item.name
                  : "Unnamed"}
              </p>
            </Row>
            <Row style={{ marginTop: "5px" }}>
              <p style={styles.price}>
                $
                {this.props.item && this.props.item.price
                  ? this.props.item.price
                  : "0"}
              </p>
            </Row>
            {this.props.item && this.props.item.txHash && (
              <Row style={{ marginTop: "5px" }}>
                <a
                  href={`https://etherscan.io/tx/` + this.props.item.txHash}
                  style={styles.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  View on Etherscan
                </a>
              </Row>
            )}
            {this.props.item && this.props.item.seller && (
              <Row style={{ marginTop: "10px" }}>
                <div>
                  <ProfileHover
                    address={this.props.item.seller}
                    style={{ width: "100%" }}
                    showName={true}
                  />
                </div>
              </Row>
            )}
          </Col>
          <Col sm={2} style={{ cursor: "pointer" }}>
            <div style={styles.topRight}>
              <Button style={styles.button} onClick={this.deletePost}>
                <span role="img" aria-label="dasButton">
                  🗑️
                </span>
              </Button>
            </div>
          </Col>
          <Col sm={2}></Col>
        </Row>

        <OrderDetails
          app={this.props.post.message}
          post={this.props.post}
          threeBox={this.props.threeBox}
          space={this.props.space}
          box={this.props.box}
          item={this.props.item}
          usersAddress={this.props.usersAddress}
          handleClose={this.state.handleClose}
          handleShow={this.state.handleShow}
          show={this.state.show}
          getTestnetReceipts={this.props.getTestnetReceipts}
          testnetReceipts={this.props.testnetReceipts}
          testnetReceiptItems={this.props.testnetReceiptItems}
          orderNumber={this.state.orderNumber}
          orderThread={this.state.orderThread}
          orderItems={this.state.orderItems}
          getOrderThread={this.getOrderThread.bind(this)}
          orderPreview={this.state.orderPreview}
        />
      </>
    );
  }
}

export default class Orders extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font">Purchases</h1>
        {!this.props.space ? (
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <p
                className="brand-font"
                style={{ marginTop: "20px", fontSize: "18px" }}>
                Please connect wallet
              </p>
            </Col>
            <Col sm={2}></Col>
          </Row>
        ) : (
          <Container style={{ marginTop: "50px" }}>
            {!this.props.testnetReceiptItems && (
              <div style={{ width: "60px", margin: "auto" }}>
                <BounceLoader color={"black"} />
              </div>
            )}
            {this.props.testnetReceiptItems && (
              <Row>
                <Col sm={12}>
                  {this.props.testnetReceiptItems.length >= 1 &&
                    this.props.testnetReceiptItems.map((post, i) => {
                      return (
                        <OrderItems
                          post={post}
                          item={post.message}
                          key={i}
                          threeBox={this.props.threeBox}
                          space={this.props.space}
                          box={this.props.box}
                          usersAddress={this.props.usersAddress}
                          getTestnetReceipts={this.props.getTestnetReceipts}
                          testnetReceipts={this.props.testnetReceipts}
                          testnetReceiptItems={this.props.testnetReceiptItems}
                          i={i}
                        />
                      );
                    })}
                  {this.props.testnetReceiptItems.length === 0 && (
                    <Row>
                      <Col sm={2}></Col>
                      <Col sm={8}>
                        <p
                          className="brand-font"
                          style={{ textAlign: "left", marginBottom: "0" }}>
                          You have no purchases yet!
                        </p>
                      </Col>
                      <Col sm={2}></Col>
                    </Row>
                  )}
                </Col>
              </Row>
            )}
          </Container>
        )}
      </div>
    );
  }
}
