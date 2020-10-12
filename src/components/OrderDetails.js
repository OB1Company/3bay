import React, { Component } from "react";
import { Button, Image, Modal, Row, Col } from "react-bootstrap";
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

class OrderItems extends Component {
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

export default class OrderDetails extends Component {
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
    const sendChatMessage = await this.props.orderThread.post(message);
    console.log(sendChatMessage);
    this.props.getOrderThread();
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
          show={this.props.show}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>
              {this.props.orderPreview && this.props.orderPreview.message.name
                ? this.props.orderPreview.message.name
                : "Loading..."}
            </Modal.Title>
          </Modal.Header>
          {this.props.orderPreview && (
            <Modal.Body
              className="show-grid"
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}>
              <Row
                style={{
                  marginTop: "10px",
                  paddingBottom: "5px",
                  paddingLeft: "0px",
                  marginLeft: "0px",
                  marginBottom: "10px",
                }}>
                <Col sm={3}>
                  <Image
                    alt="Listing"
                    src={
                      this.props.orderPreview.message.listingImage
                        ? this.props.orderPreview.message.listingImage
                        : "https://via.placeholder.com/150"
                    }
                    onError={(ev) =>
                      (ev.target.src = "https://via.placeholder.com/150")
                    }
                    style={styles.image}
                    fluid
                  />
                </Col>
                <Col sm={9} style={{ marginTop: "5px" }}>
                  <Row>
                    <p style={styles.name}>
                      {this.props.orderPreview.message.name
                        ? this.props.orderPreview.message.name
                        : "Unnamed"}
                    </p>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={styles.price}>
                      $
                      {this.props.orderPreview.message.price
                        ? this.props.orderPreview.message.price
                        : "0"}
                    </p>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <p style={styles.description}>
                      {this.props.orderPreview.message.description
                        ? this.props.orderPreview.message.description
                        : "No description."}
                    </p>
                  </Row>
                  {this.props.orderPreview.message.txHash && (
                    <Row style={{ marginTop: "5px" }}>
                      <a
                        href={
                          `https://etherscan.io/tx/` +
                          this.props.orderPreview.message.txHash
                        }
                        style={styles.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        View on Etherscan
                      </a>
                    </Row>
                  )}
                </Col>
              </Row>
              {this.props.orderPreview.message.shippingAddress &&
                this.props.orderPreview.message.shippingAddress.name.length >
                  0 && (
                  <Row
                    style={{
                      paddingLeft: "17px",
                      paddingRight: "17px",
                      textAlign: "left",
                      marginBottom: "15px",
                    }}>
                    <Col sm={12}>
                      <pre style={styles.shippingAddress}>
                        <b>Shipping address</b>
                      </pre>
                      <pre style={styles.shippingAddress}>
                        Name:{"             "}
                        {this.props.orderPreview.message.shippingAddress.name ||
                          ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        Address line 1:{"   "}
                        {this.props.orderPreview.message.shippingAddress
                          .address1 || ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        Address line 2:{"   "}
                        {this.props.orderPreview.message.shippingAddress
                          .address2 || ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        State:{"            "}
                        {this.props.orderPreview.message.shippingAddress
                          .state || ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        City:{"             "}
                        {this.props.orderPreview.message.shippingAddress.city ||
                          ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        Zip/Postcode:{"     "}
                        {this.props.orderPreview.message.shippingAddress.zip ||
                          ""}
                      </pre>
                      <pre style={styles.shippingAddress}>
                        Country:{"          "}
                        {this.props.orderPreview.message.shippingAddress
                          .country || ""}
                      </pre>
                    </Col>
                  </Row>
                )}
              <Row
                style={{
                  paddingLeft: "17px",
                  paddingRight: "17px",
                }}>
                <Col sm={12}>
                  {!this.props.orderItems && (
                    <div style={{ width: "60px", margin: "auto" }}>
                      <BounceLoader color={"blue"} />
                    </div>
                  )}
                  {this.props.orderItems && (
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
                      {this.props.orderItems.length >= 1 &&
                        this.props.orderItems.map((post, i) => {
                          return (
                            <OrderItems
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
                      {this.props.orderItems.length === 0 && (
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
          {!this.props.orderPreview && (
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
                  Order details loading...
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
