import React, { Component } from "react";
import {
  Button,
  Image,
  Modal,
  Container,
  Row,
  Col,
  Toast,
} from "react-bootstrap";
import CommentBox from "3box-comments-react";
import ProfileHover from "profile-hover";
import Web3 from "web3";
import daiIcon from "../assets/dai.png";

import {
  SPACE_NAME,
  testnetDAI,
  contractAddressDAI,
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
    margin: "0px",
    padding: "0px",
    fontFamily,
  },
  modalShippingAddress: {
    marginTop: "10px",
    fontSize: "13px",
    textAlign: "left",
    lineHeight: "13px",
    marginBottom: "10px",
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
  addToCart: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    fontFamily,
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
};

export default class ListingDetails extends Component {
  /*   state = {
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true, toast: false }),
    handleToastShow: () => this.setState({ toast: true }),
    handleToastClose: () => this.setState({ toast: false }),
  }; */

  /*   addToCart = async (_ButtonShit) => {
    this.props.handleToastShow();
    const cartItem = this.props.post;
    console.log(cartItem);
    await this.props.shoppingCart.post(cartItem);
    this.props.getShoppingCartThread();
    console.log(this.props.cartItems);
  }; */

  sendTransaction = async (_payTheMan) => {
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

  /*   triggerTransaction = async (_fuck) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.web3.eth.sendTransaction({
        to: sellerAccount,
        from: this.props.usersAddress,
        value: window.web3.utils.toWei("1", "ether"),
      });
    }
  }}; */

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
  };

  sendTestnetDAI = async (_payTheMan) => {
    // Get addresses
    const space = this.props.space;
    const userAddress = this.props.userAddress;
    const post = this.props.post;
    const toAddress = post.message.account;
    const fromAddress = this.props.usersAddress;
    const testnetReceipts = this.props.testnetReceipts;
    const getTestnetReceipts = () => this.props.getTestnetReceipts();
    const testnetReceiptItems = this.props.testnetReceiptItems;

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
          console.log(orderThreadAddress);

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
          };

          console.log("receiptItem:");
          console.log(receipt);
          console.log(testnetReceipts);

          // 2. Add transaction to order history [DONE]
          await testnetReceipts.post(receipt);
          getTestnetReceipts();
          console.log(testnetReceiptItems);

          // 3. Add transaction to order thread [DONE]
          await orderThread.post(receipt);
          console.log("Order thread:");
          console.log(orderThread);

          // 4. Add order message to inbox of the seller [DONE]
          let message = {
            messageId: orderThreadAddress,
            type: "order",
          };

          const sellerInbox = await space.joinThreadByAddress(
            post.message.inboxThreadAddress
          );
          await sellerInbox.post(message);
        });
    }
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
                  {this.props.post.message.needsAddress === true && (
                    <p style={styles.modalShippingAddress}>
                      <span role="img" aria-label="das">
                        📦
                      </span>{" "}
                      Shipping address required
                    </p>
                  )}
                  <Button
                    variant="dark"
                    // onClick={this.state.handleShow}
                    style={styles.addToCart}
                    post={this.props.post}
                    onClick={this.sendTestnetDAI}>
                    BUY NOW
                  </Button>
                  {/*                   <Button
                    variant="dark"
                    // onClick={this.state.handleShow}
                    style={styles.addToCart}
                    post={this.props.post}
                    onClick={this.addToCart}>
                    ADD TO CART
                  </Button> */}
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
                  <Toast
                    show={this.props.toast}
                    onClose={this.props.handleToastClose}>
                    <Toast.Header>
                      <strong className="mr-auto">
                        <span role="img" aria-label="das">
                          🛒
                        </span>{" "}
                        Shopping cart
                      </strong>
                      <small>Just now</small>
                    </Toast.Header>
                    <Toast.Body>Item added to cart!</Toast.Body>
                  </Toast>
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
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.handleClose} variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
