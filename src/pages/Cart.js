import React, { Component } from "react";
import {
  CardColumns,
  Card,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";

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

class ListingCard extends Component {

  render() {
    return (
      <>
        <Card style={styles.wrapper}>
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
          Shopping cart
        </h1>
        <div className="row" style={{ marginTop: "50px" }}>
          {(!this.props.cartItems || this.props.cartItems.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <CardColumns style={styles.column}>
            {this.props.cartItems &&
              this.props.cartItems.map((post, i) => {
                return (
                  <ListingCard
                    post={post.message}
                    key={i}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress}
                    cartItems={this.props.cartItems}
                    shoppingCart={this.props.shoppingCart}
                    getShoppingCartThread={this.props.getShoppingCartThread}
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
