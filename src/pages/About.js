import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

const styles = {
  background: {
    textAlign: "center",
  },
};

export default class Home extends Component {
  render() {
    return (
      <Container fluid style={styles.background}>
        <h1 className="brand-font">About</h1>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <Row>
              <h3
                className="brand-font"
                style={{ textAlign: "left", marginTop: "20px" }}>
                What is Spendly?
              </h3>
            </Row>
            <Row>
              <p className="brand-font" style={{ textAlign: "left" }}>
                Spendly is built on top of{" "}
                <span>
                  <a
                    href="https://3box.io"
                    target="_blank"
                    rel="noopener noreferrer">
                    3Box
                  </a>
                </span>
                , a decentralized user identity and data storage system built
                with IPFS and{" "}
                <span>
                  <a
                    href="https://github.com/orbitdb/orbit-db"
                    target="_blank"
                    rel="noopener noreferrer">
                    OrbitDB
                  </a>
                </span>
                . 3Box leverages popular web3 wallets to create decentralized
                identity and storage provision over IPFS and OrbitDB, the latter
                enabling serverless storage and messaging for decentralized
                applications.
              </p>
            </Row>
            <Row>
              <h5 className="brand-font" style={{ textAlign: "left" }}>
                Content moderation
              </h5>
            </Row>
            <Row>
              <p className="brand-font" style={{ textAlign: "left" }}>
                Admins moderate listings posted on the public submarkets. If
                there are listings that could be considered illegal, they will
                be removed by the admins. Listings sold by users on their own
                store page cannot be removed by the admins.
              </p>
            </Row>
            <Row>
              <p
                className="brand-font"
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                  marginBottom: "3px",
                }}>
                Admin accounts
              </p>
            </Row>
            <Row>
              <a
                className="brand-font"
                style={{
                  fontSize: "11px",
                  textAlign: "left",
                  color: "#000000",
                }}
                target="_blank"
                rel="noopener noreferrer"
                href={`https://3box.io/` + this.props.admin}>
                {this.props.admin}
              </a>
            </Row>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    );
  }
}
