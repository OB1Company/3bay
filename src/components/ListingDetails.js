import React, { Component } from "react";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Toast,
} from "react-bootstrap";
import CommentBox from "3box-comments-react";
import ProfileHover from "profile-hover";

import { SPACE_NAME } from "../Constants";

const styles = {
  name: {
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "left",
    height: "32px",
    lineHeight: "25px",
    margin: "0px",
    padding: "0px",
  },
  description: {
    fontSize: "15px",
    textAlign: "left",
    height: "22px",
    lineHeight: "15px",
    margin: "0px",
    padding: "0px",
  },
  modalShippingAddress: {
    fontSize: "13px",
    textAlign: "left",
    height: "21px",
    lineHeight: "13px",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "0px",
  },
  soldBy: {
    fontSize: "17px",
    fontWeight: "bold",
    textAlign: "left",
    height: "20px",
    lineHeight: "17px",
    marginTop: "10px",
    marginBottom: "5px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "0px",
  },
  addToCart: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "30px",
  },
  modalPrice: {
    fontSize: "37px",
    fontWeight: "bold",
    textAlign: "left",
    height: "45px",
    lineHeight: "37px",
    margin: "0px",
    padding: "0px",
  },
};

export default class ListingDetails extends Component {
/*   state = {
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true, toast: false }),
    handleToastShow: () => this.setState({ toast: true }),
    handleToastClose: () => this.setState({ toast: false }),
  }; */

  addToCart = async (_ButtonShit) => {
    this.props.handleToastShow();
    const cartItem = this.props.post;
    console.log(cartItem);
    await this.props.shoppingCart.post(cartItem);
    this.props.getShoppingCartThread();
    console.log(this.props.cartItems);
  };

  render() {
    return (
      <>
        <Modal onHide={this.props.handleClose} size="xl" show={this.props.show}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>
              {this.props.post.message.name
                ? this.props.post.message.name
                : "Unnamed"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="show-grid"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}>
            <Container>
              <Row style={{ paddingTop: "10px" }}>
                <Col xs={12} md={8} style={{ paddingRight: "10px" }}>
                  <img
                    alt="Listing"
                    onError={(ev) =>
                      (ev.target.src =
                        "https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
                    }
                    src={
                      this.props.post.message.listingImage
                        ? this.props.post.message.listingImage
                        : "https://via.placeholder.com/200"
                    }
                    style={{
                      width: "100%",
                      borderRadius: "30px",
                      padding: "0px",
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "50px",
                    }}>
                    <CommentBox
                      spaceName={SPACE_NAME}
                      threadName={this.props.post.postId}
                      box={this.props.box}
                      currentUserAddr={this.props.usersAddress}
                      // currentUser3BoxProfile={this.props.threeBox}
                      adminEthAddr={this.props.post.message.account}
                      showCommentCount={10}
                      useHovers={true}
                    />
                  </div>
                </Col>
                <Col
                  xs={6}
                  md={4}
                  style={{ paddingRight: "10px", paddingLeft: "20px" }}>
                  <p style={styles.modalPrice}>
                    ${this.props.post.message.price
                      ? this.props.post.message.price
                      : "0"}
                  </p>
                  <p style={styles.description}>
                    {this.props.post.message.description}
                  </p>
                  {this.props.post.message.needsAddress === true && (
                    <p style={styles.modalShippingAddress}>
                      <span role="img" aria-label="das">
                        📦
                      </span>{" "}
                      Shipping address required
                    </p>
                  )}
                  <Button
                    variant="dark"
                    // onClick={this.state.handleShow}
                    style={styles.addToCart}
                    post={this.props.post}
                    onClick={this.addToCart}>
                    ADD TO CART
                  </Button>
                  <Toast
                    show={this.props.toast}
                    onClose={this.props.handleToastClose}>
                    <Toast.Header>
                      <strong className="mr-auto">
                        <span role="img" aria-label="das">
                          🛒
                        </span>{" "}
                        Shopping cart
                      </strong>
                      <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>Item added to cart!</Toast.Body>
                  </Toast>
                  <p style={styles.soldBy}>Sold by</p>
                  {this.props.post.message.account && (
                    <div style={{ marginBottom: "10px" }}>
                      <ProfileHover
                        address={this.props.post.message.account}
                        style={{ width: "100%" }}
                        showName={true}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
