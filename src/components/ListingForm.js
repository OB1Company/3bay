import React, { Component } from "react";
const blankState = {
  name: "",
  price: "",
  listingImage: "",
  description: "",
  needsAddress: false,
};
export default class ListingForm extends Component {
  state = blankState;

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
    this.setState({ needsAddress: event.target.checked });
    console.log(this.state.needsAddress);
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
    });

    this.setState(Object.assign({}, blankState, { submitted: true }));
  };

  render() {
    return (
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        {!this.state.submitted && (
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                aria-describedby="listingName"
                placeholder="Enter Listing Name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="listingImage">Image URL:</label>
              <input
                type="text"
                name="listingImage"
                className="form-control"
                aria-describedby="listing image"
                placeholder="Add an image"
                value={this.state.listingImage}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                name="description"
                className="form-control"
                aria-describedby="description"
                placeholder="Add a description"
                value={this.state.description}
                onChange={this.handleChange}
                required
              />
            </div>
            <label htmlFor="price">Price:</label>
            <div className="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                type="number"
                min="0.01"
                step="0.01"
                name="price"
                className="form-control"
                aria-describedby="price"
                placeholder="Price in USD"
                value={this.state.price}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Requires shipping address:
                <span style={{ marginLeft: 8 }}></span>
                <input
                  name="needsAddress"
                  type="checkbox"
                  checked={this.state.needsAddress}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        )}
        {this.state.submitted && (
          <div className="jumbotron">
            <h1>Thank you for submiting</h1>
            <button
              className="btn btn-secondary"
              onClick={() => this.setState({ submitted: false })}>
              Add another listing{" "}
            </button>
          </div>
        )}
      </div>
    );
  }
}
