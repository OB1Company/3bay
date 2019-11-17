import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import CommentBox from '3box-comments-react';


export default function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Overview
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.app.name}</Modal.Title>
        </Modal.Header>
        <img
          style={{
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "40px"
          }}
          src={
            props.app.appImage
              ? props.app.appImage
              : "https://via.placeholder.com/200"
          }
          onError={ev =>
            (ev.target.src =
              "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
          }
        />
        <Modal.Body>{props.app.description}</Modal.Body>
        <CommentBox
         spaceName="test-app-store"
         threadName={props.app.name}
         currentUser3BoxProfile={props.threeBox}
         adminEthAddr={'0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386'} 
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
