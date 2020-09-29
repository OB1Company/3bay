import React, { Component } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { fontFamily } from "../Constants.js"

const blankState = {
  name: "",
  price: "",
  listingImage: "",
  description: "",
  needsAddress: false,
};

const styles = {
  image: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
    alignContent: "center",
    background: "#ffffff",
    borderStyle: "dotted",
    borderWidth: "thin",
    borderColor: "#000000",
  },
  label: {
    fontWeight: "bold",
    fontFamily,
    textAlign: "left",
  },
  button: {
    fontFamily,
  },
};

export default class ListingForm extends Component {
  state = blankState;

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
    this.setState({ needsAddress: event.target.checked });
  };

  // Todo: Add some actual validation
  // name - character length
  // description - character length
  // price - USD currency format
  async validateFormFields() {
    console.log("to do - validiate form");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.validateFormFields();
    this.props.saveListing({
      name: this.state.name,
      price: this.state.price,
      listingImage: this.state.listingImage,
      description: this.state.description,
      needsAddress: this.state.needsAddress,
      inboxThreadAddress: this.props.inboxThreadAddress,
    });

    this.setState(Object.assign({}, blankState, { submitted: true }));
  };

  render() {
    return (
      <div style={{ margin: "auto" }}>
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit} autoComplete="off">
            <Row>
              <Col sm={3}>
                <Image
                  alt="Listing"
                  src={
                    this.state.listingImage
                      ? this.state.listingImage
                      : "https://via.placeholder.com/200?text=Your+image+here"
                  }
                  onError={(ev) =>
                    (ev.target.src = "https://via.placeholder.com/150")
                  }
                  style={styles.image}
                  fluid
                />
              </Col>
              <Col sm={9}>
                <div className="form-group row">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="name"
                    style={styles.label}>
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="brand-font col-sm-10"
                    aria-describedby="listingName"
                    placeholder="Enter listing name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group row">
                  <label
                    className="col-sm-2 col-form-label"
                    htmlFor="listingImage"
                    style={styles.label}>
                    Image URL:
                  </label>
                  <input
                    type="text"
                    name="listingImage"
                    className="brand-font col-sm-10"
                    aria-describedby="listing image"
                    placeholder="Add an image"
                    value={this.state.listingImage}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="description"
                    className="col-sm-2 col-form-label"
                    style={styles.label}>
                    Description:
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="brand-font col-sm-10"
                    aria-describedby="description"
                    placeholder="Add a description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="price"
                    className="col-sm-2 col-form-label"
                    style={styles.label}>
                    Price:
                  </label>
                  <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      name="price"
                      className="brand-font col-sm-10"
                      aria-describedby="price"
                      placeholder="Price in USD"
                      value={this.state.price}
                      onChange={this.handleChange}
                      required
                    />
                </div>
                <div className="form-group row">
                  <div
                    className="custom-control custom-checkbox custom-control-inline"
                    style={{ margin: "15px" }}>
                    <input
                      name="needsAddress"
                      type="checkbox"
                      id="needsAddress"
                      className="custom-control-input"
                      checked={this.state.needsAddress}
                      onChange={this.handleChange}
                    />
                    <label
                      className="custom-control-label brand-font"
                      htmlFor="needsAddress">
                      Requires shipping address
                    </label>
                  </div>
                </div>
              </Col>
            </Row>
            <input
              type="submit"
              value="Submit"
              className="btn btn-dark float-sm-right"
              style={styles.button}
            />
          </form>
        )}
        {this.state.submitted && (
          <div className="jumbotron">
            <h1>Thank you for submiting</h1>
            <button
              className="btn btn-dark"
              onClick={() => this.setState({ submitted: false })}
              style={styles.button}>
              Add another listing{" "}
            </button>
          </div>
        )}
      </div>
    );
  }
}
