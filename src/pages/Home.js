import React, { Component } from "react";
import {
  Button,
  CardColumns,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";

import ListingCard from "../components/ListingCard.js";
import CreateListingModal from "../components/CreateListingModal.js";

const styles = {
  column: {
    width: "100%",
    columnCount: "4",
  },
  background: {
    textAlign: "center",
  },
  wrapper: {
    padding: "20px",
    background: "rgb(0,0,0,0)",
    borderWidth: "0",
  },
  slash: {
    fontSize: "13px",
    textAlign: "left",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  addListing: {
    fontSize: "15px",
    textAlign: "left",
    cursor: "pointer",
    color: "#0000EE",
  },
  link: {
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    color: "#0000EE",
  },
  path: {
    fontSize: "13px",
    textAlign: "left",
    color: "#000000",
  },
  navInput: {
    borderColor: "#000000",
    borderWidth: "1",
    borderStyle: "solid",
  },
  submarkets: {
    fontSize: "15px",
    textAlign: "center",
    fontWeight: "bold",
    padding: "0px",
    margin: "0px",
  },
};

export default class Home extends Component {
  state = {
    submarketName: "",
    thread: null,
    submarketThread: null,
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  saveListing = async (formData) => {
    formData.account = this.props.accounts[0];
    await this.props.thread.post(formData);
    await this.props.submarketThread.post(formData);
    this.props.getListingsThread();
    this.props.getSubmarketThread();
  };

  changeSubmarket = async (threadName) => {
    const threadId = threadName;
    this.setState({ threadId: threadId });
    this.props.joinSubmarket(threadId);
  };

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  render() {
    return (
      <div className="container" style={styles.background}>
        <Row style={{ paddingBottom: "0px", justifyContent: "center" }}>
          <p className="brand-font" style={styles.submarkets}>
            Submarkets
          </p>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <p
            className="brand-font float-sm-left"
            style={this.props.threadId === "all" ? styles.path : styles.link}
            onClick={() => this.changeSubmarket("all")}>
            all
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={this.props.threadId === "bbb" ? styles.path : styles.link}
            onClick={() => this.changeSubmarket("bbb")}>
            bbb
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={
              this.props.threadId === "womensclothing"
                ? styles.path
                : styles.link
            }
            onClick={() => this.changeSubmarket("womensclothing")}>
            women's clothing
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={
              this.props.threadId === "consumerelectronics"
                ? styles.path
                : styles.link
            }
            onClick={() => this.changeSubmarket("consumerelectronics")}>
            consumer electronics
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={this.props.threadId === "sports" ? styles.path : styles.link}
            onClick={() => this.changeSubmarket("sports")}>
            sports
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={
              this.props.threadId === "mensclothing" ? styles.path : styles.link
            }
            onClick={() => this.changeSubmarket("mensclothing")}>
            men's clothing
          </p>
          <p style={styles.slash}>/</p>
          <p
            className="brand-font float-sm-left"
            style={this.props.threadId === "shoes" ? styles.path : styles.link}
            onClick={() => this.changeSubmarket("shoes")}>
            shoes
          </p>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <InputGroup
            className="mb-3"
            size="sm"
            style={{ width: "250px", fontSize: "13px" }}>
            <FormControl
              placeholder="Submarket name"
              aria-label="Submarket name"
              aria-describedby="basic-addon2"
              className="brand-font"
              name="submarketName"
              value={this.state.submarketName}
              onChange={this.handleChange}
              style={styles.navInput}
            />
            <InputGroup.Append>
              <Button
                className="brand-font button btn"
                variant="outline-secondary"
                style={styles.navInput}
                onClick={() =>
                  this.changeSubmarket(
                    this.state.submarketName === ""
                      ? "all"
                      : this.state.submarketName
                  )
                }>
                Go
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        {this.props.threadId && (
          <div className="container">
            <Row
              style={{
                justifyContent: "center",
                marginTop: "20px",
              }}>
              <h1
                className="brand-font"
                style={{
                  marginBottom: "0px",
                }}>
                {this.props.threadId}
              </h1>
            </Row>
            <Row
              style={{
                justifyContent: "center",
                marginTop: "5px",
              }}>
              <p
                className="brand-font"
                style={styles.addListing}
                onClick={this.state.handleShow}>
                +Add a listing
              </p>
            </Row>
          </div>
        )}
        <CreateListingModal
          threeBox={this.props.threeBox}
          accounts={this.props.accounts}
          space={this.props.space}
          box={this.props.box}
          usersAddress={this.props.usersAddress}
          handleClose={this.state.handleClose}
          handleShow={this.state.handleShow}
          show={this.state.show}
          submarketThread={this.props.submarketThread}
          getSubmarketThread={this.props.getSubmarketThread}
          getListingsThread={this.props.getListingsThread}
          threadId={this.props.threadId}
          saveListing={this.saveListing}
          inboxThreadAddress={this.props.inboxThreadAddress}
        />
        <div className="row" style={{ marginTop: "10px" }}>
          {!this.props.submarketPosts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.submarketPosts && (
            <CardColumns style={styles.column}>
              {this.props.submarketPosts.length >= 1 &&
                this.props.submarketPosts.map((post, i) => {
                  return (
                    <ListingCard
                      post={post}
                      key={i}
                      threeBox={this.props.threeBox}
                      space={this.props.space}
                      box={this.props.box}
                      usersAddress={this.props.usersAddress}
                      submarketThread={this.props.submarketThread}
                      getSubmarketThread={this.props.getSubmarketThread}
                      i={i}
                      admin={this.props.admin}
                      home={true}
                      testnetReceipts={this.props.testnetReceipts}
                      testnetReceiptItems={this.props.testnetReceiptItems}
                      getTestnetReceipts={this.props.getTestnetReceipts}
                      inboxThread={this.props.inboxThread}
                      inboxMessages={this.props.inboxMessages}
                      getInboxThread={this.props.getInboxThread}
                      threadId={this.props.threadId}
                      getStorePosts={this.props.getStorePosts}
                      getStoreProfile={this.props.getStoreProfile}
                    />
                  );
                })}
            </CardColumns>
          )}
        </div>
        {this.props.submarketPosts && this.props.submarketPosts.length === 0 && (
          <div className="row">
            <p className="brand-font" style={{ textAlign: "left" }}>
              Nothing here yet!
            </p>
          </div>
        )}
      </div>
    );
  }
}
