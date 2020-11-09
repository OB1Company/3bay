import React, { Component } from "react";
import {
  Button,
  CardColumns,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import makeBlockie from "ethereum-blockies-base64";

import { fontFamily, placeholderImage } from "../Constants";
import ListingCard from "../components/ListingCard.js";

const styles = {
  column: {
    width: "100%",
    columnCount: "4",
    marginTop: "30px",
  },
  background: {
    textAlign: "center",
  },
  myStoreModalTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "left",
    height: "32px",
    lineHeight: "25px",
    margin: "0px",
    padding: "0px",
    fontFamily,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

export default class MyStore extends Component {
  state = {
    myStoreModal: false,
    handleMyStoreModalShow: () => this.setState({ myStoreModal: true }),
    handleMyStoreModalClose: () => this.setState({ myStoreModal: false }),
    storeName: "",
    storeDescription: "",
    storeAvatar: "",
    storeHeader: "",
  };

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  handleSubmit = async (_submit) => {
    const space = this.props.space;
    const storeName = this.state.storeName;
    const storeDescription = this.state.storeDescription;
    const storeAvatar = this.state.storeAvatar;
    const storeHeader = this.state.storeHeader;
    await space.public.set("storeName", storeName);
    await space.public.set("storeDescription", storeDescription);
    await space.public.set("storeAvatar", storeAvatar);
    await space.public.set("storeHeader", storeHeader);
    await this.props.getMyStoreObject();
    this.state.handleMyStoreModalClose();
  };

  render() {
    return (
      <Container fluid style={styles.background}>
        {!this.props.space ? (
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <h1 className="brand-font">My store</h1>
              <p
                className="brand-font"
                style={{ marginTop: "20px", fontSize: "18px" }}>
                Please connect wallet
              </p>
            </Col>
            <Col sm={2}></Col>
          </Row>
        ) : (
          <>
            <Row
              style={{
                justifyContent: "center",
                marginTop: "5px",
              }}>
              <Container
                style={{
                  position: "relative",
                  padding: "0px",
                  marginBottom: "60px",
                  marginTop: "20px",
                }}>
                {this.props.myStoreObject && (
                  <Image
                    src={
                      this.props.myStoreObject &&
                      this.props.myStoreObject.storeHeader
                        ? this.props.myStoreObject.storeHeader
                        : placeholderImage
                    }
                    fluid
                    style={{
                      height: "200px",
                      padding: "0px",
                      borderStyle: "dashed",
                      borderWidth: "thin",
                      borderColor: "#000000",
                      width: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "grayscale(50%)",
                    }}
                  />
                )}
                {this.props.myStoreObject && (
                  <Container
                    style={{
                      position: "absolute",
                      bottom: "-25%",
                      margin: "0px",
                    }}>
                    <Image
                      src={
                        this.props.myStoreObject &&
                        this.props.myStoreObject.storeAvatar
                          ? this.props.myStoreObject.storeAvatar
                          : makeBlockie(this.props.usersAddress)
                      }
                      alt="Avatar"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderStyle: "dashed",
                        borderWidth: "thin",
                        borderColor: "#000000",
                        objectFit: "cover",
                      }}
                      roundedCircle
                    />
                  </Container>
                )}
              </Container>
            </Row>
            {this.props.myStoreObject && (
              <h1 className="brand-font">
                {this.props.myStoreObject && this.props.myStoreObject.storeName
                  ? this.props.myStoreObject.storeName
                  : this.props.usersAddress}
              </h1>
            )}
            {this.props.myStoreObject && (
              <p className="brand-font">
                {this.props.myStoreObject &&
                this.props.myStoreObject.storeDescription
                  ? this.props.myStoreObject.storeDescription
                  : `Another amazing store on 3Bay!`}
              </p>
            )}
            <Button
              className="brand-font"
              style={{
                borderWidth: "1px",
                borderColor: "#000000",
                borderRadius: "20px",
                fontSize: "10px",
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              onClick={this.state.handleMyStoreModalShow}>
              edit my details
            </Button>
            {!this.props.posts && (
              <div style={{ width: "60px", margin: "auto" }}>
                <BounceLoader color={"black"} />
              </div>
            )}
            {this.props.posts && (
              <CardColumns style={styles.column}>
                {this.props.posts.length >= 1 &&
                  this.props.posts.map((post, i) => {
                    return (
                      <ListingCard
                        i={i}
                        admin={this.props.admin}
                        home={false}
                        thread={this.props.thread}
                        post={post}
                        key={i}
                        threeBox={this.props.threeBox}
                        space={this.props.space}
                        box={this.props.box}
                        usersAddress={this.props.usersAddress}
                        getListingsThread={this.props.getListingsThread}
                        submarketThread={this.props.submarketThread}
                        getSubmarketThread={this.props.getSubmarketThread}
                      />
                    );
                  })}
                {this.props.posts.length === 0 && (
                  <p className="brand-font" style={{ textAlign: "left" }}>
                    Nothing here yet!
                  </p>
                )}
              </CardColumns>
            )}
          </>
        )}
        <Modal
          onHide={this.state.handleMyStoreModalClose}
          className="my-modal"
          size="lg"
          show={this.state.myStoreModal}
          animation={false}
          style={{ background: "rgb(0,0,0,0)" }}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.myStoreModalTitle}>
              Please enter your store details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="brand-font"
              style={{ marginTop: "10px" }}
              onSubmit={this.handleSubmit}
              autoComplete="off">
              <Form.Group controlId="formGridName">
                <Form.Label className="float-sm-left">
                  Store name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter store name"
                  name="storeName"
                  value={this.state.storeName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label className="float-sm-left">
                  Description<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Enter store description"
                  name="storeDescription"
                  value={this.state.storeDescription}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label className="float-sm-left">
                  Avatar<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Avatar image URL"
                  name="storeAvatar"
                  value={this.state.storeAvatar}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label className="float-sm-left">
                  Header<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  placeholder="Header image URL"
                  name="storeHeader"
                  value={this.state.storeHeader}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <Container
              style={{
                position: "relative",
                padding: "0px",
                marginBottom: "60px",
                marginTop: "40px",
              }}>
              <p className="brand-font" style={{ fontWeight: "bold" }}>
                Preview
              </p>
              <Image
                src={this.state.storeHeader || placeholderImage}
                fluid
                style={{
                  height: "200px",
                  padding: "0px",
                  borderStyle: "dashed",
                  borderWidth: "thin",
                  borderColor: "#000000",
                  width: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "grayscale(50%)",
                }}
              />
              <Container
                style={{
                  position: "absolute",
                  bottom: "-20%",
                  margin: "0px",
                }}>
                <Image
                  src={this.state.storeAvatar || placeholderImage}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderStyle: "dashed",
                    borderWidth: "thin",
                    borderColor: "#000000",
                    objectFit: "cover",
                  }}
                  roundedCircle
                />
              </Container>
            </Container>
            <h1 className="brand-font">{this.state.storeName}</h1>
            <p className="brand-font">{this.state.storeDescription}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="brand-font"
              variant="dark"
              type="submit"
              onClick={this.handleSubmit}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
