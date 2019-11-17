import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";

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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
