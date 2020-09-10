import React, { Component } from "react";

import { Container, Image, Row, Col } from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ProfileHover from "profile-hover";

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
    height: "32px",
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

class OrderItems extends Component {
  render() {
    return (
      <>
        <Row
          style={{
            paddingBottom: "5px",
            paddingLeft: "0px",
            marginLeft: "0px",
          }}>
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
              <p style={styles.price}>
                $
                {this.props.item.message.price
                  ? this.props.item.message.price
                  : "0"}
                <br />
                USD
              </p>
            </Row>
          </Col>
          <Col sm={2} style={{ paddingTop: "5px" }}>
            {this.props.item.message.account && (
              <div style={{ marginBottom: "10px" }}>
                <ProfileHover
                  address={this.props.item.message.account}
                  style={{ width: "100%" }}
                  showName={true}
                />
              </div>
            )}
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
