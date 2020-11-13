import React, { Component } from "react";
import {
  Button,
  CardColumns,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import makeBlockie from "ethereum-blockies-base64";

import { placeholderImage } from "../Constants";
import ListingCard from "../components/ListingCard.js";
import ChatThread from "../components/ChatThread.js";

const styles = {
  column: {
    width: "100%",
    columnCount: "4",
    marginTop: "30px",
  },
  background: {
    textAlign: "center",
    position: "relative",
  },
};

export default class Store extends Component {
  state = {
    show: false,
    handleClose: () => this.setState({ show: false }),
    handleShow: () => this.setState({ show: true }),
  };

  async componentDidMount() {
    if (this.props.match && this.props.match.params) {
      const storeAccount = this.props.match.params.account;
      console.log(storeAccount);
      // this.props.getStorePosts(this.props.match.params.account);
      this.setState(
        { storeAccount: storeAccount },
        () => this.props.getStorePosts(storeAccount),
        this.props.getStoreProfile(storeAccount)
      );
    }
  }

  // Todo: Finishing wiring up the ChatThread

  // * [1] Check if the user has a chat thread with the store
  // If 'no', go to [2]
  // If 'yes', go to [3]
  checkForChatThread = async (_submit) => {
    this.setState({ show: true });
    const space = this.props.space;
    const storeAccount = this.props.match.params.account;
    const storeChatAddress = await space.private.get(storeAccount);
    if (!storeChatAddress) {
      this.createChatThread();
    } else {
      this.loadTheChatThread();
    }
  };

  // * [2] Create a chat thread with the store
  // Next, go to [3]
  createChatThread = async (_submit) => {
    const space = this.props.space;
    const userAddress = this.props.userAddress;
    const storeAccount = this.props.match.params.account;
    const inboxThreadAddress = this.props.storeObject.inboxTestnetAddress;

    // * Create the private chat thread
    const storeChatThread = await space.joinThread(storeAccount, {
      firstModerator: userAddress,
      members: true,
      ghost: false,
      confidential: true,
    });
    await storeChatThread.addMember(storeAccount);
    const chatThreadAddress = storeChatThread.address;

    // * Add a private entry with the account and the private chat thread address
    // Reason: if we join a private thread that already exists, it wipes it out
    // So we have to join a private thread by its address to preserve it
    const accountEntry = await space.private.set(
      storeAccount,
      chatThreadAddress
    );
    console.log(accountEntry);

    // * Make an inbox message of type: chat
    // This indicates to the store that the user has sent them a chat message
    // The private address can only be joined by the user and the store
    let message = {
      messageId: chatThreadAddress,
      type: "chat",
    };
    const storeInbox = await space.joinThreadByAddress(inboxThreadAddress);
    const addMessageToInbox = await storeInbox.post(message);
    console.log(addMessageToInbox);
    this.setState({ storeChatThread }, () => this.getChatThread());
  };

  // * [3] Add chat message to chat thread
  sendChatMessage = async (_message) => {
    const space = this.props.space;
    const storeAccount = this.props.match.params.account;
    const storeChatAddress = await space.private.get(storeAccount);
    const storeChatThread = await space.joinThreadByAddress(storeChatAddress);
  };

  loadTheChatThread = async (_stuff) => {
    const space = this.props.space;
    const storeAccount = this.props.match.params.account;
    const storeChatAddress = await space.private.get(storeAccount);
    const storeChatThread = await space.joinThreadByAddress(storeChatAddress);
    this.setState({ storeChatThread }, () => this.getChatThread());
  };

  async getChatThread() {
    if (!this.state.storeChatThread) {
      console.error("store chat thread not in react state");
      return;
    }

    // Fetch the order list and add them to state
    const fetch = await this.state.storeChatThread.getPosts();
    let chatItems = fetch.reverse();
    this.setState({ chatItems });

    // Update the chat list when new chat is added
    await this.state.storeChatThread.onUpdate(async () => {
      const fetch = await this.state.storeChatThread.getPosts();
      let chatItems = fetch.reverse();
      this.setState({ chatItems });
    });
  }

  render() {
    return (
      <Container fluid style={styles.background}>
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
            {this.props.storeAccount && (
              <Image
                src={
                  this.props.storeObject && this.props.storeObject.storeHeader
                    ? this.props.storeObject.storeHeader
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
            {this.props.storeAccount && (
              <Container
                style={{ position: "absolute", bottom: "-25%", margin: "0px" }}>
                <Image
                  src={
                    this.props.storeObject && this.props.storeObject.storeAvatar
                      ? this.props.storeObject.storeAvatar
                      : makeBlockie(this.props.storeAccount)
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
        {this.props.storeAccount && (
          <h1 className="brand-font">
            {this.props.storeObject && this.props.storeObject.storeName
              ? this.props.storeObject.storeName
              : this.props.storeAccount}
          </h1>
        )}
        {!this.props.match && <h1 className="brand-font">Store not found</h1>}
        {this.props.storeAccount && (
          <p className="brand-font">
            {this.props.storeObject && this.props.storeObject.storeDescription
              ? this.props.storeObject.storeDescription
              : `Another amazing store on 3Bay!`}
          </p>
        )}
        {this.props.space && (
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
            onClick={this.checkForChatThread}>
            Send a message
          </Button>
        )}
        {this.props.match &&
          this.props.params &&
          this.props.params.account &&
          !this.props.storePosts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"black"} />
            </div>
          )}
        {!this.props.match && (
          <Col sm={12}>
            <p className="brand-font">
              Please include a store account in the url path (e.g.
              /store/0xd664d46e6adc48a66244310223bfbb89ed42b12c).
            </p>
          </Col>
        )}
        {this.props.storePosts && (
          <CardColumns style={styles.column}>
            {this.props.storePosts.length >= 1 &&
              this.props.storePosts.map((post, i) => {
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
                    getStorePosts={this.props.getStorePosts}
                    getStoreProfile={this.props.getStoreProfile}
                  />
                );
              })}
            {this.props.storePosts.length === 0 && (
              <p className="brand-font" style={{ textAlign: "left" }}>
                Nothing for sale here yet!
              </p>
            )}
          </CardColumns>
        )}
        {!this.props.storePosts && (
          <p className="brand-font" style={{ textAlign: "left" }}>
            Nothing for sale here yet!
          </p>
        )}
        <ChatThread
          threeBox={this.props.threeBox}
          space={this.props.space}
          box={this.props.box}
          item={this.props.item}
          usersAddress={this.props.usersAddress}
          handleClose={this.state.handleClose}
          handleShow={this.state.handleShow}
          show={this.state.show}
          storeChatThread={this.state.storeChatThread}
          chatItems={this.state.chatItems}
          getChatThread={this.getChatThread.bind(this)}
        />
      </Container>
    );
  }
}
