import React, { Component } from "react";

import { Button, Container, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

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
    fontFamily: "Courier New",
  },
  price: {
    fontSize: "13px",
    textAlign: "left",
    lineHeight: "13px",
    margin: "0px",
    padding: "0px",
    fontFamily: "Courier New",
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
  deletePost = async (e) => {
    e.stopPropagation();
    const post = this.props.post;
    const postId = post.postId;
    console.log(post);
    console.log(postId);
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
          <Col sm={8}>
            <Row
              style={{
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "#000000",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Col>
                <pre style={styles.price}>
                  <b>from:</b>    {this.props.post.author}
                </pre>
                <pre style={styles.price}>
                  <b>subject:</b> {this.props.item.messageId
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
      </>
    );
  }
}

export default class Inbox extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font">Inbox</h1>
        <Container style={{ marginTop: "50px" }}>
          {!this.props.inboxMessages && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
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
                  <p className="brand-font" style={{ textAlign: "left" }}>
                    You have no messages!
                  </p>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
