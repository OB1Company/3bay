import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

import ListingDetails from "./ListingDetails.js";

const styles = {
  wrapper: {
    padding: "20px",
    background: "rgb(0,0,0,0)",
    borderWidth: "0",
  },
  cardWrapper: {
    width: "100%",
    borderRadius: "20px",
    alignContent: "center",
    background: "#ffffff",
    boxShadow: "-20px 20px 40px #e0e0e0, 20px -20px 40px #ffffff",
  },
  image: {
    width: "100%",
    borderRadius: "20px 20px 0px 0px",
  },
  copyWrapper: {
    padding: "20px",
  },
  name: {
    fontSize: "25px",
    fontWeight: "bold",
    textAlign: "left",
    height: "32px",
    lineHeight: "25px",
    margin: "0px",
    padding: "0px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "left",
    height: "27px",
    lineHeight: "20px",
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
  shippingAddress: {
    fontSize: "13px",
    textAlign: "left",
    height: "18px",
    lineHeight: "11px",
    margin: "0px",
    padding: "0px",
  },
};

export default class ListingCard extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true, toast: false }),
    handleToastShow: () => this.setState({ toast: true }),
    handleToastClose: () => this.setState({ toast: false }),
    toast: false,
  };

  deleteGlobalPost = async (e) => {
    e.stopPropagation();
    const listing = this.props.post;
    const postId = listing.postId;
    console.log(listing);
    console.log(postId);
    await this.props.globalThread.deletePost(postId);
    this.props.getGlobalListingsThread();
  };

  deletePost = async (e) => {
    e.stopPropagation();
    const listing = this.props.post;
    const postId = listing.postId;
    console.log(listing);
    console.log(postId);
    await this.props.thread.deletePost(postId);
    this.props.getListingsThread();
  };

  render() {
    return (
      <>
        <Card style={styles.wrapper} onClick={this.state.handleShow}>
          <div style={styles.cardWrapper}>
            <img
              alt="Listing"
              style={styles.image}
              src={
                this.props.post.message.listingImage
                  ? this.props.post.message.listingImage
                  : "https://via.placeholder.com/200"
              }
              onError={(ev) =>
                (ev.target.src =
                  "https://stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
              }
            />
            <div style={styles.copyWrapper}>
              <p style={styles.name}>
                {this.props.post.message.name
                  ? this.props.post.message.name
                  : "Unnamed"}
              </p>
              <p style={styles.price}>
                $
                {this.props.post.message.price
                  ? this.props.post.message.price
                  : "0"}
              </p>
              <p style={styles.description}>
                {this.props.post.message.description}
              </p>
              <p style={styles.shippingAddress}>
                {this.props.post.message.needsAddress === true ? "📦" : " "}
              </p>
              {[this.props.post.message.account, this.props.admin].includes(
                this.props.usersAddress
              ) && (
                <Button
                  style={{
                    backgroundColor: "#ffffff",
                    borderColor: "#f0f0f0",
                    fontSize: "18",
                  }}
                  onClick={
                    this.props.home === true
                      ? this.deleteGlobalPost
                      : this.deletePost
                  }>
                  <span role="img" aria-label="dasButton">
                    🗑️
                  </span>
                </Button>
              )}
            </div>
          </div>
        </Card>

        <ListingDetails
          app={this.props.post.message}
          post={this.props.post}
          threeBox={this.props.threeBox}
          space={this.props.space}
          box={this.props.box}
          usersAddress={this.props.usersAddress}
          shoppingCart={this.props.shoppingCart}
          getShoppingCartThread={this.props.getShoppingCartThread}
          cartItems={this.props.cartItems}
          handleClose={this.state.handleClose}
          handleShow={this.state.handleShow}
          handleToastShow={this.state.handleToastShow}
          handleToastClose={this.state.handleToastClose}
          show={this.state.show}
          toast={this.state.toast}
        />

        {(this.props.i + 1) % 3 === 0 && <div className="w-100"></div>}
      </>
    );
  }
}
