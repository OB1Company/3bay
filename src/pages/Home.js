import React, { Component } from "react";
import { CardColumns, Row, InputGroup, FormControl } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

import ListingCard from "../components/ListingCard.js";

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
  };

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  goToSubmarket = () => {
    console.log(this.state.submarketName);
    this.props.history.push("/s/bbb");
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
          <Link className="brand-font float-sm-left" style={styles.path} to="/">
            all
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/bbb"
            style={styles.link}>
            bbb
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/shoes"
            style={styles.link}>
            shoes
          </Link>
          <p style={styles.slash}>/</p>
          <Link
            className="brand-font float-sm-left"
            to="/s/shirts"
            style={styles.link}>
            shirts
          </Link>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <InputGroup
            className="mb-3"
            size="sm"
            style={{ width: "200px", fontSize: "13px" }}>
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
                to={this.state.submarketName ? `/s/` + this.state.submarketName : `/`}
                style={styles.navInput}>
                Go
              </Link>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <h1
          className="brand-font"
          style={{ fontSize: "4rem", marginTop: "20px" }}>
          Spendit
        </h1>
        <p className="brand-font">Reddit-style decentralized marketplace.</p>
        <div className="row" style={{ marginTop: "50px" }}>
          {(!this.props.globalPosts || this.props.globalPosts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <CardColumns style={styles.column}>
            {this.props.globalPosts &&
              this.props.globalPosts.map((post, i) => {
                return (
                  <ListingCard
                    globalThread={this.props.globalThread}
                    post={post}
                    key={i}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                    box={this.props.box}
                    usersAddress={this.props.usersAddress}
                    getGlobalListingsThread={this.props.getGlobalListingsThread}
                    i={i}
                    admin={this.props.admin}
                    home={true}
                    testnetReceipts={this.props.testnetReceipts}
                    testnetReceiptItems={this.props.testnetReceiptItems}
                    getTestnetReceipts={this.props.getTestnetReceipts}
                    inboxThread={this.props.inboxThread}
                    inboxMessages={this.props.inboxMessages}
                    getInboxThread={this.props.getInboxThread}
                  />
                );
              })}
          </CardColumns>
        </div>
      </div>
    );
  }
}
