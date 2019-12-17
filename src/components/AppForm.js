import React, { Component } from "react";
const blankState = { name: "", url: "", appImage: "", description: "" };
export default class AppForm extends Component {
  state = blankState;

  handleChange = event => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  async validateFormFields() {
    console.log("to do - validiate form");
  }

  handleSubmit = event => {
    event.preventDefault();
    this.validateFormFields();
    this.props.savePost({
      name: this.state.name,
      url: this.state.url,
      appImage: this.state.appImage,
      description: this.state.description
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
                aria-describedby="appName"
                placeholder="Enter App Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL:</label>
              <input
                type="text"
                name="url"
                className="form-control"
                aria-describedby="url"
                placeholder="Add url"
                value={this.state.url}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="appImage">Image URL:</label>
              <input
                type="text"
                name="appImage"
                className="form-control"
                aria-describedby="application image"
                placeholder="Add an image"
                value={this.state.appImage}
                onChange={this.handleChange}
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
              />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        )}
        {this.state.submitted && <div className="jumbotron">
          <h1>Thank you for submiting</h1>
          <button className="btn btn-secondary"  onClick={()=>(this.setState({submitted : false}))}>Add another application </button>
           </div>}
      </div>
    );
  }
}


