import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";

export default class Example extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  render() {
    return (
      <>
        <Button
          onClick={this.state.handleShow}
          style={{ width: "100%", marginTop: "10px" }}
          variant="primary"
        >
          Listing details
        </Button>

        <Modal onHide={this.state.handleClose} show={this.state.show}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.app.name}</Modal.Title>
          </Modal.Header>
          <img
            alt="Listing"
            onError={(ev) =>
              (ev.target.src =
                "https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
            }
            src={
              this.props.app.listingImage
                ? this.props.app.listingImage
                : "https://via.placeholder.com/200"
            }
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px",
            }}
          />
          <Modal.Body>{this.props.app.description}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.state.handleClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
