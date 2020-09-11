import React, { Component } from "react";

import { Container, Row, Col } from "react-bootstrap";
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
    fontSize: "15px",
    textAlign: "left",
    lineHeight: "15px",
    margin: "0px",
    padding: "0px",
    fontFamily: "Courier New",
  },
};

class InboxMessages extends Component {
  render() {
    return (
      <>
        <Row
          style={{
            paddingBottom: "5px",
            paddingLeft: "0px",
            marginLeft: "0px",
          }}>
          <Col sm={12} style={{ paddingTop: "5px" }}>
            <Row>
              <p style={styles.name}>
                {this.props.item.messageId
                  ? this.props.item.messageId
                  : "Unnamed"}
              </p>
            </Row>
            <Row>
              <p style={styles.price}>
                {this.props.item.type ? this.props.item.type : "Unknown"}
              </p>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default class Inbox extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Inbox
        </h1>
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
