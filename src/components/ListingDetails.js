import React, { Component } from "react";
import {
  Button,
  Form,
  Image,
  Modal,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import CommentBox from "3box-comments-react";
import ProfileHover from "profile-hover";
import Web3 from "web3";
import { Link } from "react-router-dom";
import daiIcon from "../assets/dai.png";

import {
  SPACE_NAME,
  testnetDAI,
  // contractAddressDAI,
  contractABIDAI,
  fontFamily,
} from "../Constants";

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
  description: {
    fontSize: "20px",
    textAlign: "left",
    lineHeight: "20px",
    padding: "0px",
    fontFamily,
  },
  modalShippingAddress: {
    fontSize: "13px",
    textAlign: "left",
    lineHeight: "13px",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "0px",
    fontFamily,
  },
  soldBy: {
    fontSize: "17px",
    fontWeight: "bold",
    textAlign: "left",
    height: "20px",
    lineHeight: "17px",
    marginTop: "10px",
    marginBottom: "5px",
    marginLeft: "0px",
    marginRight: "0px",
    padding: "0px",
    fontFamily,
  },
  buyNowButton: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    fontFamily,
    fontSize: "20px",
  },
  modalPrice: {
    fontSize: "37px",
    fontWeight: "bold",
    textAlign: "left",
    height: "45px",
    lineHeight: "37px",
    margin: "0px",
    padding: "0px",
    fontFamily,
  },
  daiIcon: {
    height: "20px",
    width: "20px",
  },
  paymentInfo: {
    height: "20px",
    alignText: "center",
    lineHeight: "20px",
    paddingLeft: "10px",
    fontFamily,
  },
  addressName: {
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

const blankAddress = {
  name: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export default class ListingDetails extends Component {
  state = {
    alert: false,
    alertStatus: "",
    purchased: false,
    addressModal: false,
    handleAddressShow: () => this.setState({ addressModal: true }),
    handleAddressClose: () => this.setState({ addressModal: false }),
    handleAlertShow: () => this.setState({ alert: true }),
    handleStatusChange: (status) => this.setState({ alertStatus: status }),
    handlePurchased: () => this.setState({ purchased: true }),
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  };

  handleChange = (event) => {
    this.setState(Object.assign({ [event.target.name]: event.target.value }));
  };

  /*   sendTransaction = async (_payTheMan) => {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD";
    const post = this.props.post;
    const usersAddress = this.props.usersAddress;
    var rate;
    await fetch(url, post)
      .then((resp) => resp.json())
      .then((data) => (rate = data));
    console.log(rate);
    const rateUSD = rate.ethereum.usd;
    console.log(rateUSD);
    const seller = post;
    const sellerAccount = post.message.account;
    const price = post.message.price;
    console.log(seller);
    console.log(sellerAccount);
    console.log(usersAddress);
    console.log(price);
    const priceETH = (price / rateUSD).toString();
    console.log(priceETH);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.web3.eth.sendTransaction({
          to: sellerAccount,
          from: usersAddress,
          value: window.web3.utils.toWei(priceETH, "ether"),
        });
      }
    }
  };

  sendDAI = async (_payTheMan) => {
    // Get addresses
    const post = this.props.post;
    const toAddress = post.message.account;
    const fromAddress = this.props.usersAddress;

    // Get exchange rate for coin
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=USD";
    var rate;
    await fetch(url, post)
      .then((resp) => resp.json())
      .then((data) => (rate = data));
    const rateUSD = rate.dai.usd;

    // Calculate price at the rate
    const listingPrice = post.message.price;
    const price = (listingPrice / rateUSD).toFixed(2).toString();

    // Console check
    console.log(listingPrice);
    console.log(rateUSD);
    console.log(price);

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      // Just gas
      // const gasPrice = await window.web3.eth.getGasPrice();
      const gasLimit = 60000;

      // Step 1: Import the contract ABI and address
      const contractDAI = new window.web3.eth.Contract(
        contractABIDAI,
        contractAddressDAI
      );
      console.log(contractDAI);

      // calculate ERC20 token amount
      // let value = amount.mul(window.web3.utils.toBN(10).pow(decimals));
      let value = window.web3.utils.toWei(price, "ether");

      // call transfer function
      contractDAI.methods
        .transfer(toAddress, value)
        .send({ from: fromAddress, gas: gasLimit })
        .on("transactionHash", function(hash) {
          console.log(hash);
        });
    }
  }; */

  // Check if the listing requires a shipping address; trigger modal if so
  checkShippingAddress = async (_getShippingAddress) => {
    if (this.props.post.message.needsAddress === true) {
      this.state.handleAddressShow();
    } else {
      this.sendTestnetDAI();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.sendTestnetDAI({
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
    });

    this.setState(Object.assign({}, blankAddress));
    this.state.handleAddressClose();
  };

  report = async (_shippingAddress) => {
    console.log(_shippingAddress);
  };

  sendTestnetDAI = async (_shippingAddress) => {
    // Get addresses
    this.state.handleAlertShow();
    this.state.handleStatusChange("Working... (1/5)");
    const space = this.props.space;
    const userAddress = this.props.userAddress;
    const post = this.props.post;
    const toAddress = post.message.account;
    const fromAddress = this.props.usersAddress;
    const testnetReceipts = this.props.testnetReceipts;
    const getTestnetReceipts = () => this.props.getTestnetReceipts();
    const handleStatusChange = (status) =>
      this.state.handleStatusChange(status);
    const handlePurchased = () => this.state.handlePurchased();
    let shippingAddress = blankAddress;

    // Create an empty shipping address object for non-physical listings
    if (_shippingAddress) {
      shippingAddress = _shippingAddress;
    }

    // Get exchange rate for coin
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=USD";
    var rate;
    await fetch(url, post)
      .then((resp) => resp.json())
      .then((data) => (rate = data));
    const rateUSD = rate.dai.usd;

    // Calculate price at the rate
    const listingPrice = post.message.price;
    const price = (listingPrice / rateUSD).toFixed(2).toString();

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      // Just gas
      // const gasPrice = await window.web3.eth.getGasPrice();
      const gasLimit = 60000;

      // Step 1: Import the contract ABI and address
      const contractDAI = new window.web3.eth.Contract(
        contractABIDAI,
        testnetDAI
      );

      // calculate ERC20 token amount
      let value = window.web3.utils.toWei(price, "ether");

      let receipt;

      // call transfer function
      contractDAI.methods
        .transfer(toAddress, value)
        .send({ from: fromAddress, gas: gasLimit })
        .on("transactionHash", async function(hash) {
          handleStatusChange("Transaction sent... (2/5)");

          // 1. Create a thread for the order [DONE]
          const orderNumber = new Date().getTime();
          const orderThread = await space.joinThread(orderNumber, {
            firstModerator: userAddress,
            members: true,
            ghost: false,
            confidential: false,
          });
          await orderThread.addMember(post.message.account);
          const orderThreadAddress = orderThread.address;

          // 2. Create a transaction receipt
          receipt = {
            name: post.message.name,
            description: post.message.description,
            seller: post.message.account,
            price: post.message.price,
            listingImage: post.message.listingImage,
            needsAddress: post.message.needsAddress,
            inboxThreadAddress: post.message.inboxThreadAddress,
            orderThreadAddress: orderThreadAddress,
            txHash: hash,
            shippingAddress: shippingAddress,
          };

          // 2. Add transaction to order history [DONE]
          const addTestnetReceipt = await testnetReceipts.post(receipt);
          console.log(addTestnetReceipt);
          getTestnetReceipts();
          handleStatusChange("Purchase order saved... (3/5)");

          // 3. Add transaction to order thread [DONE]
          const addReceiptToOrder = await orderThread.post(receipt);
          console.log(addReceiptToOrder);
          handleStatusChange("Order details saved... (4/5)");

          // 4. Add order message to inbox of the seller [DONE]
          let message = {
            messageId: orderThreadAddress,
            type: "order",
          };

          const sellerInbox = await space.joinThreadByAddress(
            post.message.inboxThreadAddress
          );
          const addMessageToInbox = await sellerInbox.post(message);
          console.log(addMessageToInbox);
          handleStatusChange("Purchase order message sent... (5/5)");
          handlePurchased();
          handleStatusChange("Purchase complete!");
          // handleToastShow();
        });
    }
  };

  connectAlert = async (_press) => {
    alert("Please connect your wallet to purchase this item.");
  };

  loadStorePosts = async (storeAccount) => {
    this.props.getStorePosts(storeAccount);
    this.props.getStoreProfile(storeAccount);
  };

  render() {
    return (
      <>
        <Modal
          onHide={this.props.handleClose}
          size="xl"
          show={this.props.show}
          animation={false}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>
              {this.props.post.message.name
                ? this.props.post.message.name
                : "Unnamed"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="show-grid"
            style={{
              paddingLeft: "0px",
              paddingRight: "0px",
            }}>
            <Container>
              <Row style={{ paddingTop: "10px" }}>
                <Col xs={12} md={8} style={{ paddingRight: "10px" }}>
                  <img
                    alt="Listing"
                    onError={(ev) =>
                      (ev.target.src =
                        "https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
                    }
                    src={
                      this.props.post.message.listingImage
                        ? this.props.post.message.listingImage
                        : "https://via.placeholder.com/200"
                    }
                    style={{
                      width: "100%",
                      padding: "0px",
                      borderStyle: "dotted",
                      borderWidth: "thin",
                      borderColor: "#000000",
                    }}
                  />
                  {this.props.box && (
                    <div
                      className="container d-flex justify-content-center"
                      style={{
                        width: "100%",
                        paddingTop: "50px",
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}>
                      <CommentBox
                        spaceName={SPACE_NAME}
                        threadName={this.props.post.postId}
                        box={this.props.box}
                        currentUserAddr={this.props.usersAddress}
                        // currentUser3BoxProfile={this.props.threeBox}
                        adminEthAddr={this.props.post.message.account}
                        showCommentCount={10}
                        useHovers={true}
                      />
                    </div>
                  )}
                </Col>
                <Col
                  xs={6}
                  md={4}
                  style={{ paddingRight: "10px", paddingLeft: "20px" }}>
                  <p style={styles.modalPrice}>
                    $
                    {this.props.post.message.price
                      ? this.props.post.message.price
                      : "0"}
                  </p>
                  <p style={styles.description}>
                    {this.props.post.message.description}
                  </p>
                  <Button
                    variant="dark"
                    // onClick={this.state.handleShow}
                    style={styles.buyNowButton}
                    onClick={
                      this.props.space
                        ? this.checkShippingAddress
                        : this.connectAlert
                    }>
                    BUY NOW
                  </Button>
                  <div
                    className="container d-flex justify-content-center"
                    style={{ alignContent: "center" }}>
                    <Row style={{ marginTop: "15px" }}>
                      <Image
                        src={daiIcon}
                        roundedCircle
                        style={styles.daiIcon}
                      />
                      <p style={styles.paymentInfo}>All payments in DAI</p>
                    </Row>
                  </div>
                  {this.props.post.message.needsAddress === true && (
                    <p style={styles.modalShippingAddress}>
                      <span role="img" aria-label="das">
                        📦
                      </span>{" "}
                      Shipping address required
                    </p>
                  )}
                  <p style={styles.soldBy}>Sold by</p>
                  {this.props.post.message.account && (
                    <div style={{ marginBottom: "10px" }}>
                      <ProfileHover
                        address={this.props.post.message.account}
                        style={{ width: "100%" }}
                        showName={true}
                      />
                    </div>
                  )}
                  <div
                    className="container d-flex justify-content-center"
                    style={{ alignContent: "center" }}>
                    <Row style={{ marginTop: "15px" }}>
                      <Link
                        className="brand-font"
                        to={`/store/` + this.props.post.message.account}>
                        Visit store
                      </Link>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Alert
              delay={3000}
              show={this.state.alert}
              variant={this.state.purchased === false ? "secondary" : "success"}
              className="brand-font"
              style={{ width: "100%", fontSize: "14px" }}>
              {this.state.alertStatus}
            </Alert>
          </Modal.Footer>
        </Modal>
        <Modal
          onHide={this.state.handleAddressClose}
          className="my-modal"
          size="lg"
          show={this.state.addressModal}
          animation={false}
          style={{ background: "rgb(0,0,0,0.7)" }}>
          <Modal.Header closeButton>
            <Modal.Title style={styles.name}>Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              className="brand-font"
              style={{ marginTop: "10px" }}
              onSubmit={this.handleSubmit}
              autoComplete="off">
              <Form.Group controlId="formGridName">
                <Form.Label className="float-sm-left">Name</Form.Label>
                <Form.Control
                  placeholder="Enter name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label className="float-sm-left">
                  Address line 1
                </Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  name="address1"
                  value={this.state.address1}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridAddress2">
                <Form.Label className="float-sm-left">
                  Address line 2
                </Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  name="address2"
                  value={this.state.address2}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGridCity">
                <Form.Label className="float-sm-left">City</Form.Label>
                <Form.Control
                  placeholder="Enter city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label className="float-sm-left">State</Form.Label>
                <Form.Control
                  placeholder="Enter state"
                  name="state"
                  value={this.state.state}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridZip">
                <Form.Label className="float-sm-left">Zip/Postcode</Form.Label>
                <Form.Control
                  placeholder="Enter zip or postcode"
                  name="zip"
                  value={this.state.zip}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="formGridCountry"
                style={{ marginBottom: "30px" }}>
                <Form.Label className="float-sm-left">Country</Form.Label>
                <Form.Control
                  placeholder="Enter country"
                  name="country"
                  value={this.state.country}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>

              <Button className="brand-font" variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
