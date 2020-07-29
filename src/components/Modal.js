import { Modal, Button } from "react-bootstrap";
import React, { Component } from "react";
import CommentBox from "3box-comments-react";
import { SPACE_NAME } from "../Constants";

export default class Example extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true })
  };

  componentWillUnmount(){
    this.props.space.unsubscribeThread(this.props.app.name)
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.state.handleShow} style={{width : '100%', marginTop: '10px'}}>
          Comments
        </Button>

        <Modal show={this.state.show} onHide={this.state.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.app.name}</Modal.Title>
          </Modal.Header>
          <img
            style={{
              width: "200px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "40px"
            }}
            src={
              this.props.app.listingImage
                ? this.props.app.listingImage
                : "https://via.placeholder.com/200"
            }
            onError={ev =>
              (ev.target.src =
                "https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
            }
          />
          <Modal.Body>{this.props.app.description}</Modal.Body>
          <CommentBox
            spaceName={SPACE_NAME}
            threadName={this.props.app.name}
            box={this.props.box}
            currentUserAddr={this.props.usersAddress}
            currentUser3BoxProfile={this.props.threeBox}
            // adminEthAddr={"0xf54D276a029a49458E71167EBc25D1cCa235ee6f"}
            
          />
          <Modal.Footer>
            <Button variant="secondary" onClick={this.state.handleClose} >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
