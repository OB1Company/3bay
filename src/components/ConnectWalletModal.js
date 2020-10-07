import React, { Component } from "react";
import { Button, Card, Modal, Container, Row } from "react-bootstrap";
import { BarLoader } from "react-spinners";

import { fontFamily } from "../Constants";
import metamaskLogo from "../assets/metamask-fox.svg";

const styles = {
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

export default class ConnectWalletModal extends Component {
  render() {
    return (
      <>
        <Modal
          onHide={this.props.handleWalletConnectModalClose}
          size="lg"
          show={this.props.showConnectWalletModal}
          enforceFocus={false}
          animation={false}
          centered
          style={{ background: "rgb(0,0,0,0.7)" }}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>Connect wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="show-grid"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}>
            <Container>
              <Row style={{ paddingTop: "15px", justifyContent: "center" }}>
                <Card style={{ alignItems: "center", borderColor: "#ffffff" }}>
                  <Card.Img
                    className="brand-font"
                    variant="top"
                    src={metamaskLogo}
                    style={{ width: "50px" }}
                  />
                  {this.props.onboarding === false && (
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
                  {this.props.onboarding === true && (
                    <Card.Body>
                      <Row style={styles.loader}>
                        {" "}
                        <BarLoader color={"black"} />
                      </Row>
                      <Row>
                        <p className="brand-font">{this.props.status}</p>
                      </Row>
                    </Card.Body>
                  )}
                </Card>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="brand-font"
              onClick={this.props.handleWalletConnectModalClose}
              variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
