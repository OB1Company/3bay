import React, { Component } from "react";
import { Button, Modal, CardColumns, Card } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import CommentBox from "3box-comments-react";
import ProfileHover from "profile-hover";

import { SPACE_NAME } from "../Constants";

const styles = {
  column: {
    width: "100%",
  },
  background: {
    textAlign: "center",
  },
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
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "0px",
  },
};

class ListingCard extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  render() {
    return (
      <>
        <Card style={styles.wrapper}>
          <div style={styles.cardWrapper} onClick={this.state.handleShow}>
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
                {this.props.post.message.price
                  ? this.props.post.message.price
                  : "$0"}
              </p>
              <p style={styles.description}>
                {this.props.post.message.description}
              </p>
              <p style={styles.shippingAddress}>
                {this.props.post.message.needsAddress === true ? "📦" : " "}
              </p>
            </div>
          </div>
        </Card>

        <Modal onHide={this.state.handleClose} size="lg" show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>
              {this.props.post.message.name
                ? this.props.post.message.name
                : "Unnamed"}
            </Modal.Title>
          </Modal.Header>
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
              paddingTop: "10px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          />
          <Modal.Body>
            <p style={styles.price}>
              {this.props.post.message.price
                ? this.props.post.message.price
                : "$0"}
            </p>
            <p style={styles.description}>
              {this.props.post.message.description}
            </p>
            <p style={styles.modalShippingAddress}>
              {this.props.post.message.needsAddress === true
                ? "📦 Shipping address required"
                : " "}
            </p>
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
          </Modal.Body>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.state.handleClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {(this.props.i + 1) % 3 === 0 && <div className="w-100"></div>}
      </>
    );
  }
}

export default class Home extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Ion
        </h1>
        <p>The Decentralised Marketplace.</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {(!this.props.globalPosts || this.props.globalPosts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <CardColumns style={styles.column}>
            {this.props.globalPosts &&
              this.props.globalPosts.map((post, i) => {
                return (
                  <ListingCard
                    post={post}
                    key={i}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress}
                    i={i}
                  />
                );
              })}
          </CardColumns>
        </div>
      </div>
    );
  }
}
