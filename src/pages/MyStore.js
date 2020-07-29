import React, { Component } from "react";
import { BounceLoader } from "react-spinners";

const styles = {
  background: {
    textAlign: "center",
  },
  wrapper: {
    padding: "20px",
  },
  cardWrapper: {
    width: "100%",
    borderRadius: "20px",
    alignContent: "center",
    background: "#ededed",
    boxShadow: "-40px 40px 80px #d1d1d1, 40px -40px 80px #ffffff",
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

class ListingCard extends Component {
  render() {
    return (
      <>
        <div className="col-sm-4">
          <div style={styles.wrapper}>
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
                  {this.props.post.message.needsAddress === true
                    ? "📦"
                    : " "}
                </p>

                {/* <Modal
                  app={this.props.post.message}
                  threeBox={this.props.threeBox}
                  space={this.props.space}
                  box={this.props.box}
                  usersAddress={this.props.usersAddress}
                /> */}
              </div>
            </div>
          </div>
        </div>
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
          My store
        </h1>
        <p>This is my store.</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {(!this.props.posts || this.props.posts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <div className="container">
            <div className="row">
              {this.props.posts &&
                this.props.posts.map((post, i) => {
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
