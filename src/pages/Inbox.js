import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
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
  },
  name: {
    fontSize: "23px",
    fontWeight: "bold",
    textAlign: "left",
    // height: "32px",
    lineHeight: "23px",
    margin: "0px",
    padding: "0px",
    fontFamily,
  },
  price: {
    fontSize: "13px",
    textAlign: "left",
    lineHeight: "13px",
    margin: "0px",
    padding: "0px",
    fontFamily,
    overflow: "hidden",
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

class InboxMessages extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  loadTheOrder = async (_stuff) => {
    this.setState({ show: true });
    const space = this.props.space;
    const orderNumber = this.props.item.messageId;
    this.setState({ orderNumber });
    const orderThread = await space.joinThreadByAddress(orderNumber);
    this.setState({ orderThread }, () => this.getOrderThread());
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
    const post = this.props.post;
    const postId = post.postId;
    await this.props.inboxThread.deletePost(postId);
    this.props.getInboxThread();
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
          <Col sm={8} onClick={this.loadTheOrder}>
            <Row
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#000000",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Col sm={11}>
                <pre style={styles.price}>
                  <b>from:</b> {this.props.post.author}
                </pre>
                <pre style={styles.price}>
                  <b>subject:</b>{" "}
                  {this.props.item.messageId
                    ? this.props.item.messageId
                    : "Unnamed"}
                </pre>
              </Col>
              <Button style={styles.button} onClick={this.deletePost}>
                <span role="img" aria-label="dasTrashButton">
                  🗑️
                </span>
              </Button>
            </Row>
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

export default class Inbox extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font">Inbox</h1>
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
            {!this.props.inboxMessages && (
              <div style={{ width: "60px", margin: "auto" }}>
                <BounceLoader color={"black"} />
              </div>
            )}
            {this.props.inboxMessages && (
              <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                  <p
                    className="brand-font"
                    style={{
                      fontSize: "13px",
                      textAlign: "left",
                    }}>
                    <span>Sales</span>/
                    <span
                      style={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        color: "#0000EE",
                        textDecoration: "underline",
                      }}>
                      Chat
                    </span>
                  </p>
                </Col>
                <Col sm={2}></Col>
              </Row>
            )}
            {this.props.inboxMessages && (
              <Row>
                <Col sm={12}>
                  {this.props.inboxMessages.length >= 1 &&
                    this.props.inboxMessages.map((post, i) => {
                      return (
                        <InboxMessages
                          post={post}
                          item={post.message}
                          key={i}
                          threeBox={this.props.threeBox}
                          space={this.props.space}
                          box={this.props.box}
                          usersAddress={this.props.usersAddress}
                          inboxMessages={this.props.inboxMessages}
                          inboxThread={this.props.inboxThread}
                          getInboxThread={this.props.getInboxThread}
                          i={i}
                        />
                      );
                    })}
                  {this.props.inboxMessages.length === 0 && (
                    <Row>
                      <Col sm={2}></Col>
                      <Col sm={8}>
                        <p
                          className="brand-font"
                          style={{ textAlign: "left", marginBottom: "0" }}>
                          You have no messages!
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
