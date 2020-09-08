import React, { Component } from "react";

import { Container, Image, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ProfileHover from "profile-hover";

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
    width: "150px",
    height: "150px",
    objectFit: "cover",
    objectPosition: "center",
  },
  copyWrapper: {
    padding: "20px",
  },
  name: {
    fontSize: "23px",
    fontWeight: "bold",
    textAlign: "left",
    height: "32px",
    lineHeight: "23px",
    margin: "0px",
    padding: "0px",
  },
  price: {
    fontSize: "15px",
    textAlign: "left",
    lineHeight: "15px",
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
  remove: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    color: "#0094ff",
    paddingLeft: "0px",
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
  cartBoxLeftCol: {
    textAlign: "left",
    fontSize: "15px",
  },
  cartBoxRightCol: {
    textAlign: "right",
    fontSize: "15px",
    paddingLeft: "0px",
  },
  cartBoxButton: {
    width: "100%",
    fontSize: "15px",
  },
};

class OrderItems extends Component {
  render() {
    return (
      <>
        <Row style={{ paddingBottom: "5px" }}>
          <Col sm={2}>
            <Image
              alt="Listing"
              src={
                this.props.item.message.listingImage
                  ? this.props.item.message.listingImage
                  : "https://via.placeholder.com/150"
              }
              onError={(ev) =>
                (ev.target.src = "https://via.placeholder.com/150")
              }
              style={styles.image}
              thumbnail
              fluid
            />
          </Col>
          <Col sm={8} style={{ paddingTop: "5px" }}>
            <Row>
              <p style={styles.name}>
                {this.props.item.message.name
                  ? this.props.item.message.name
                  : "Unnamed"}
              </p>
            </Row>
            <Row style={{ paddingTop: "10px" }}>
              {this.props.item.message.account && (
                <div style={{ marginBottom: "10px" }}>
                  <ProfileHover
                    address={this.props.item.message.account}
                    style={{ width: "100%" }}
                    showName={true}
                  />
                </div>
              )}
            </Row>
          </Col>
          <Col sm={2} style={{ paddingTop: "5px" }}>
            <p style={styles.price}>
              $
              {this.props.item.message.price
                ? this.props.item.message.price
                : "0"}
              <br />
              USD
            </p>
          </Col>
        </Row>
      </>
    );
  }
}

export default class Cart extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Orders
        </h1>
        <Container style={{ marginTop: "50px" }}>
          {!this.props.orderItems && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.orderItems && (
            <Row>
              <Col sm={12}>
                {this.props.orderItems.length >= 1 &&
                  this.props.orderItems.map((post, i) => {
                    return (
                      <OrderItems
                        post={post}
                        item={post.message.message}
                        key={i}
                        threeBox={this.props.threeBox}
                        space={this.props.space}
                        box={this.props.box}
                        usersAddress={this.props.usersAddress}
                        orderItems={this.props.orderItems}
                        i={i}
                      />
                    );
                  })}
                {this.props.orderItems.length === 0 && (
                  <p style={{ textAlign: "left" }}>You have no orders!</p>
                )}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
