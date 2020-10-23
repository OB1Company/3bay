import React, { Component } from "react";
import {
  CardColumns,
  Col,
  Container,
  Row,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

import history from "../utils/history.js";
import ListingCard from "../components/ListingCard.js";
import CreateListingModal from "../components/CreateListingModal.js";

const styles = {
  background: {
    textAlign: "center",
  },
  column: {
    width: "100%",
    columnCount: "5",
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

  async componentDidMount() {
    // Set default threadId
    const threadId = "all";
    this.setState({ threadId }, () => this.props.getSubmarketPosts(threadId));
  }

  // Save the listing to the user's store
  saveListing = async (formData) => {
    formData.account = this.props.accounts[0];
    const threadId = this.props.threadId;
    formData.submarket = threadId;
    try {
      await this.props.joinSubmarket(threadId);
      await this.props.thread.post(formData);
    } catch (err) {
      console.log(err);
      console.log("Error in saveListing");
    }
    this.saveListingtoThread(formData, threadId);
  };

  // Save the listing to the correct thread
  saveListingtoThread = async (formData, threadId) => {
    console.log(formData);
    try {
      const postId = await this.props.submarketThread.post(formData);
      console.log(postId);
    } catch (err) {
      console.log(err);
      console.log("Error in saveListingtoThread");
    }
    this.props.getListingsThread();
    this.props.getSubmarketPosts(threadId);
  };

  // Change the submarket
  changeSubmarket = async (threadName) => {
    history.push("/s/" + threadName);
  };

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  addToAll = async (_all) => {
    const threadId = "all";
    this.props.changeThread(threadId);
    this.setState({ show: true });
  };

  render() {
    return (
      <Container fluid style={styles.background}>
        <Row style={{ paddingBottom: "0px", justifyContent: "center" }}>
          <p className="brand-font" style={styles.submarkets}>
            Submarkets
          </p>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <p className="brand-font float-sm-left" style={styles.path}>
            all
          </p>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/bbb">
            bbb
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/womensclothing">
            women's clothing
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/consumerelectronics">
            consumer electronics
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/sports">
            sports
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/mensclothing">
            men's clothing
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            style={styles.link}
            to="/s/shoes">
            shoes
          </Link>
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
              <Link
                className="brand-font button btn"
                variant="outline-secondary"
                to={
                  this.state.submarketName
                    ? `/s/` + this.state.submarketName
                    : `/`
                }
                style={styles.navInput}>
                Go
              </Link>
            </InputGroup.Append>
          </InputGroup>
        </Row>
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
            all
          </h1>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            marginTop: "5px",
          }}>
          {this.props.space ? (
            <p
              className="brand-font"
              style={styles.addListing}
              onClick={this.state.handleShow}>
              +Add a listing
            </p>
          ) : (
            <Link
              className="brand-font"
              style={styles.addListing}
              to="/connect-wallet">
              +Add a listing
            </Link>
          )}
        </Row>
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
        <Row style={{ marginTop: "10px" }}>
          {!this.props.submarketPosts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"black"} />
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
                      joinSubmarket={this.props.joinSubmarket}
                    />
                  );
                })}
            </CardColumns>
          )}
        </Row>
        {this.props.submarketPosts && this.props.submarketPosts.length === 0 && (
          <Row style={{ marginTop: "10px" }}>
            <Col sm={2}></Col>
            <Col sm={8}>
              <p className="brand-font" style={{ textAlign: "left" }}>
                Nothing here yet!
              </p>
            </Col>
            <Col sm={2}></Col>
          </Row>
        )}
      </Container>
    );
  }
}
