import React, { Component } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { BarLoader } from "react-spinners";

import { fontFamily } from "../Constants";
import metamaskLogo from "../assets/metamask-fox.svg";

const styles = {
  background: {
    textAlign: "center",
  },
  navHeading: {
    textAlign: "center",
    fontColor: "#0c2845",
    paddingBottom: "10px",
  },
  name: {
    fontSize: "30px",
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
  loader: {
    justifyContent: "center",
    marginBottom: "10px",
  },
};

export default class ConnectWallet extends Component {
  render() {
    return (
      <div className="container" style={styles.background}>
        <h1 className="brand-font" style={styles.navHeading}>
          {this.props.walletConnected === false
            ? "Connect wallet"
            : "Wallet connected"}
        </h1>
        <Row style={{ paddingTop: "15px", justifyContent: "center" }}>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Card style={{ alignItems: "center", borderColor: "#ffffff" }}>
              <Card.Img
                className="brand-font"
                variant="top"
                src={metamaskLogo}
                style={{ width: "50px" }}
              />
              {this.props.onboarding === false &&
                this.props.needToAWeb3Browser === false && (
                  <Card.Body>
                    <Card.Title className="brand-font">Metamask</Card.Title>
                    <Button
                      className="brand-font"
                      variant="dark"
                      onClick={this.props.connectWallet}>
                      Select
                    </Button>
                  </Card.Body>
                )}
              {this.props.onboarding === true &&
                this.props.needToAWeb3Browser === false && (
                  <Card.Body>
                    <Row style={styles.loader}>
                      {this.props.walletConnected === false ? (
                        <BarLoader color={"black"} />
                      ) : (
                        <p
                          className="brand-font"
                          style={{ marginBottom: "0px", fontSize: "17px" }}>
                          <span
                            role="img"
                            description="emoji"
                            aria-label="emoji">
                            ✅
                          </span>{" "}
                          Connected
                        </p>
                      )}
                    </Row>
                    <Row>
                      <p className="brand-font">{this.props.status}</p>
                    </Row>
                  </Card.Body>
                )}
              {this.props.needToAWeb3Browser === true && (
                <Row>
                  <p className="brand-font" style={{ marginTop: "20px" }}>
                    Please install Metamask and refresh the page.
                  </p>
                </Row>
              )}
            </Card>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </div>
    );
  }
}
