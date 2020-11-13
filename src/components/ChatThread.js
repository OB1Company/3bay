import React, { Component } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import { fontFamily } from "../Constants.js";

const styles = {
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
  description: {
    fontSize: "15px",
    fontFamily,
    textAlign: "left",
    margin: "0px",
    padding: "0px",
    whiteSpace: "nowrap",
    overflow: "hidden",
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
  shippingAddress: {
    fontSize: "12px",
    marginBottom: "0px",
  },
};

const blankState = {
  type: "",
  content: "",
};

class ChatItems extends Component {
  render() {
    return (
      <>
        {this.props.post &&
          this.props.post.message &&
          this.props.post.message.content && (
            <div
              style={{
                paddingBottom: "5px",
              }}>
              <p
                style={{
                  wordWrap: "break-word",
                  margin: "0px",
                  padding: "0px",
                  fontWeight: "bold",
                  lineHeight: "14px",
                  fontSize: "14px",
                  textAlign: "left",
                }}>
                {this.props.post.author}
              </p>
              <p
                style={{
                  wordWrap: "break-word",
                  margin: "0px",
                  padding: "0px",
                  lineHeight: "14px",
                  fontSize: "14px",
                  textAlign: "left",
                }}>
                {this.props.post.message.content}
              </p>
            </div>
          )}
      </>
    );
  }
}

export default class ChatThread extends Component {
  state = blankState;

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  submitChat = async (event) => {
    event.preventDefault();
    let message = {
      type: "message",
      content: this.state.chatUserInput,
    };
    const sendChatMessage = await this.props.storeChatThread.post(message);
    console.log(sendChatMessage);
    this.props.getChatThread();
    this.setState({
      chatUserInput: "",
    });
  };

  render() {
    return (
      <>
        <Modal
          onHide={this.props.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={this.props.show}
          animation={false}
          style={{ background: "rgb(0,0,0,0)" }}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>
              Chat conversation
            </Modal.Title>
          </Modal.Header>
          {this.props.chatItems && (
            <Modal.Body
              className="show-grid"
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}>
              <Row
                style={{
                  paddingLeft: "17px",
                  paddingRight: "17px",
                }}>
                <Col sm={12}>
                  {!this.props.chatItems && (
                    <div style={{ width: "60px", margin: "auto" }}>
                      <BounceLoader color={"black"} />
                    </div>
                  )}
                  {this.props.chatItems && (
                    <div
                      className="brand-font"
                      style={{
                        width: "100%",
                        height: "400px",
                        overflowY: "scroll",
                        borderStyle: "dashed",
                        borderWidth: "1px",
                        borderColor: "#000000",
                        display: "flex",
                        justifyContent: "left",
                        flexDirection: "column-reverse",
                      }}>
                      {this.props.chatItems.length >= 1 &&
                        this.props.chatItems.map((post, i) => {
                          return (
                            <ChatItems
                              post={post}
                              item={post.message}
                              key={i}
                              threeBox={this.props.threeBox}
                              space={this.props.space}
                              box={this.props.box}
                              usersAddress={this.props.usersAddress}
                              i={i}
                            />
                          );
                        })}
                      {this.props.chatItems.length === 0 && (
                        <p
                          className="brand-font"
                          style={{ textAlign: "left", marginBottom: "0" }}>
                          You have no messages!
                        </p>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
              <Row style={{ paddingLeft: "17px", paddingRight: "17px" }}>
                <Col sm={12}>
                  <form onSubmit={this.submitChat} autoComplete="off">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="chatUserInput"
                        className="form-control brand-font form-control"
                        placeholder="Type your message..."
                        value={this.state.chatUserInput || ""}
                        onChange={this.handleChange}
                      />
                      <div className="input-group-append">
                        <input
                          type="submit"
                          value="Send"
                          className="input-group-append brand-font btn btn-dark"
                        />
                      </div>
                    </div>
                  </form>
                </Col>
              </Row>
            </Modal.Body>
          )}
          {!this.props.chatItems && (
            <Modal.Body
              className="show-grid"
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
                justifyContent: "center",
              }}>
              <Row
                style={{
                  marginTop: "10px",
                  paddingBottom: "5px",
                  paddingLeft: "0px",
                  marginLeft: "0px",
                  marginBottom: "10px",
                  justifyContent: "center",
                }}>
                <BounceLoader color={"black"} />
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <p className="brand-font" style={{ fontSize: "13px" }}>
                  Chat thread loading...
                </p>
              </Row>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button
              className="brand-font"
              onClick={this.props.handleClose}
              variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
