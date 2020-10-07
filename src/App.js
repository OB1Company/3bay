import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
// import ChatBox from "3box-chatbox-react";

import ConnectWallet from "./pages/ConnectWallet";
import MyStore from "./pages/MyStore";
import Store from "./pages/Stores";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Inbox from "./pages/Inbox";
import { SPACE_NAME } from "./Constants";

// 3Box identity
const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {
  // Changes to true if Metamask isn't detected, or there's a problem
  state = {
    needToAWeb3Browser: false,
    showConnectWalletModal: false,
    handleWalletConnectModalClose: () =>
      this.setState({ showConnectWalletModal: false }),
    handleWalletConnectModalShow: () =>
      this.setState({ showConnectWalletModal: true }),
    status: "connecting...",
    onboarding: false,
    walletConnected: false,
  };

  /**
   * getAddressFromMetaMask => fetch the user's Ethereum account
   *  * Function isn't limited to MetaMask; works for all Web3 enabled browswers
   */
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }

  /**
   * componentDidMount
   * * Take care how many times this function is called
   * * We're loading the user's listing, not all the listings from the marketplace
   * * The user is the moderator of their own store
   */
  async componentDidMount() {
    // Set the background color (need to move this out of here)
    document.body.style.backgroundColor = "#ffffff";

    // Set admin
    const admin = "0xf54d276a029a49458e71167ebc25d1cca235ee6f";
    this.setState({ admin });

    // Set default threadId
    const threadId = "all";
    this.setState({ threadId }, () => this.getSubmarketPosts(threadId));

    // Create and fetch the listings thread of admin store
    const storePosts = await Box.getThread(
      SPACE_NAME,
      "listing_list",
      admin,
      true
    );
    this.setState({ storePosts });
    const storeProfile = await Box.getProfile(admin);
    this.setState({
      storeAccount: admin,
      storeProfile: storeProfile,
    });
  }

  /**
   * connectWallet => Connect Metamask and create/open space in 3Box
   */
  async connectWallet() {
    // Set state to onboarding
    this.setState({ onboarding: true });

    // Fetch the user's ethereum account
    await this.getAddressFromMetaMask();

    // Status update
    this.setState({ status: "fetching 3Box profile... [1/7]" });

    // Get 3Box profile of the ethereum account
    if (this.state.accounts) {
      const threeBoxProfile = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBoxProfile });
    }
    const userMod = this.state.accounts[0];
    this.setState({ userMod });

    // Status update
    this.setState({ status: "syncing 3Box... [2/7]" });

    // Open the 3Box object of the user's account
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    await box.syncDone;
    this.setState({ box });

    // Status update
    this.setState({ status: "Opening 'Spendly'... [3/7]" });

    // Open the demo marketplace 'space' of the user
    const space = await this.state.box.openSpace(SPACE_NAME);
    this.setState({ space });

    // Status update
    this.setState({ status: "Loading your store... [4/7]" });

    // Create and fetch the listings thread of the user's store
    const thread = await space.joinThread("listing_list", {
      firstModerator: userMod,
      members: true,
    });
    this.setState({ thread }, () => this.getListingsThread());

    // Status update
    this.setState({ status: "Checking your mail... [5/7]" });

    // Create a public inbox for the user
    const inboxThread = await space.joinThread("inboxTestnet", {
      firstModerator: userMod,
      members: false,
      ghost: false,
      confidential: false,
    });
    this.setState({ inboxThread }, () => this.getInboxThread());

    // Status update
    this.setState({ status: "Loading orders... [6/7]" });

    // Create and fetch the orders
    const orders = await space.joinThread("demo-orders-public", {
      firstModerator: userMod,
      members: true,
      ghost: false,
      confidential: false,
    });
    this.setState({ orders }, () => this.getOrdersThread());

    // Status update
    this.setState({ status: "Loading purchases... [7/7]" });

    // Create and fetch the testnet receipts
    const testnetReceipts = await space.joinThread(
      "demo-testnet-receipts-public",
      {
        firstModerator: userMod,
        members: true,
        ghost: false,
        confidential: false,
      }
    );
    this.setState({ testnetReceipts }, () => this.getTestnetReceipts());

    // Status update
    this.setState({
      status: "Success, onboarding complete!",
      walletConnected: true,
    });

    // Close modal
    this.state.handleWalletConnectModalClose();

    // Join global chat
    const globalChat = await space.joinThread("globalListChat");
    this.setState({ globalChat });
  }

  // Get submarket posts without joining the thread
  async getSubmarketPosts(threadId) {
    this.setState({ threadId: threadId });
    const submarketPosts = await Box.getThread(
      SPACE_NAME,
      threadId,
      this.state.admin,
      false
    );
    this.setState({ submarketPosts });
  }

  // Join the submarket thread
  async joinSubmarket(threadId) {
    const submarketThread = await this.state.space.joinThread(threadId, {
      firstModerator: "0xf54d276a029a49458e71167ebc25d1cca235ee6f",
      members: false,
    });
    this.setState({ submarketThread });
  }

  // Get the posts in a submarket thread that you've joined
  async getSubmarketThread() {
    if (!this.state.submarketThread) {
      console.error("submarket listings thread not in react state");
      return;
    }

    // Fetch the listings and add them to state
    const submarketPosts = await this.state.submarketThread.getPosts();
    this.setState({ submarketPosts });

    // Update the state when new listings are added
    await this.state.submarketThread.onUpdate(async () => {
      const submarketPosts = await this.state.submarketThread.getPosts();
      this.setState({ submarketPosts });
    });
  }

  // Get posts in the user's store thread
  async getListingsThread() {
    if (!this.state.thread) {
      console.error("listings thread not in react state");
      return;
    }

    // Fetch the listings and add them to state
    const posts = await this.state.thread.getPosts();
    this.setState({ posts });

    // Update the state when new listings are added
    await this.state.thread.onUpdate(async () => {
      const posts = await this.state.thread.getPosts();
      this.setState({ posts });
    });
  }

  // Get a store's posts without joining the thread
  async getStorePosts(storeAccount) {
    // Fetch the listings and add them to state
    const storePosts = await Box.getThread(
      SPACE_NAME,
      "listing_list",
      storeAccount,
      true
    );
    this.setState({ storePosts });
  }

  // Get a store's profile
  async getStoreProfile(storeAccount) {
    // Fetch the profile and add it to state
    const storeProfile = await Box.getProfile(storeAccount);
    this.setState({ storeProfile: storeProfile, storeAccount: storeAccount });
  }

  // Get posts in the user's inbox thread
  async getInboxThread() {
    if (!this.state.inboxThread) {
      console.error("messages in inbox thread not in react state");
      return;
    }

    // Save the thread address
    const inboxThreadAddress = this.state.inboxThread.address;
    this.setState({ inboxThreadAddress });

    // Fetch the messages and add them to state
    const inboxMessages = await this.state.inboxThread.getPosts();
    this.setState({ inboxMessages });

    // Update the state when new messages are added
    await this.state.inboxThread.onUpdate(async () => {
      const inboxMessages = await this.state.inboxThread.getPosts();
      this.setState({ inboxMessages });
    });
  }

  // Get posts in the user's sales thread
  async getOrdersThread() {
    if (!this.state.orders) {
      console.error("orders thread not in react state");
      return;
    }

    // Fetch order list and add them to state
    const orderItems = await this.state.orders.getPosts();
    this.setState({ orderItems });

    // Update the order list when new items are added
    await this.state.orders.onUpdate(async () => {
      const orderItems = await this.state.orders.getPosts();
      this.setState({ orderItems });
    });
  }

  // Get posts in the user's purchases thread
  async getTestnetReceipts() {
    if (!this.state.testnetReceipts) {
      console.error("testnet receipts thread not in react state");
      return;
    }

    // Fetch the receipt list and add them to state
    const testnetReceiptItems = await this.state.testnetReceipts.getPosts();
    this.setState({ testnetReceiptItems });

    // Update the receipt list when new items are added
    await this.state.testnetReceipts.onUpdate(async () => {
      const testnetReceiptItems = await this.state.testnetReceipts.getPosts();
      this.setState({ testnetReceiptItems });
    });
  }

  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>; //! Need something nice here
    }

    return (
      <Router>
        <div>
          <Nav
            inboxMessages={this.state.inboxMessages}
            style={{ background: "#ffffff" }}
            handleWalletConnectModalShow={
              this.state.handleWalletConnectModalShow
            }
            handleWalletConnectModalClose={
              this.state.handleWalletConnectModalClose
            }
            walletConnected={this.state.walletConnected}
            usersAddress={this.state.accounts ? this.state.accounts[0] : null}
          />
          <Switch>
            <Route path="/profile">
              <Profile
                box={this.state.box}
                space={this.state.space}
                accounts={this.state.accounts}
                threeBoxProfile={this.state.threeBoxProfile}
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/store">
              <Store
                thread={this.state.thread}
                storePosts={this.state.storePosts}
                storeProfile={this.state.storeProfile}
                storeAccount={this.state.storeAccount}
                space={this.state.space}
                box={this.state.box}
                getStorePosts={this.getStorePosts.bind(this)}
                getStoreProfile={this.getStoreProfile.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/my-store">
              <MyStore
                thread={this.state.thread}
                posts={this.state.posts}
                submarketThread={this.state.submarketThread}
                submarketPosts={this.state.submarketPosts}
                getSubmarketThread={this.getSubmarketThread.bind(this)}
                space={this.state.space}
                box={this.state.box}
                getListingsThread={this.getListingsThread.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                threadId={this.state.threadId}
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/orders">
              <Orders
                space={this.state.space}
                box={this.state.box}
                getTestnetReceipts={this.getTestnetReceipts.bind(this)}
                testnetReceipts={this.state.testnetReceipts}
                testnetReceiptItems={this.state.testnetReceiptItems}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/inbox">
              <Inbox
                space={this.state.space}
                box={this.state.box}
                inboxThread={this.state.inboxThread}
                inboxMessages={this.state.inboxMessages}
                getInboxThread={this.getInboxThread.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/connect-wallet">
              <ConnectWallet
                showConnectWalletModal={this.state.showConnectWalletModal}
                handleWalletConnectModalClose={
                  this.state.handleWalletConnectModalClose
                }
                handleWalletConnectModalShow={
                  this.state.handleWalletConnectModalShow
                }
                connectWallet={this.connectWallet.bind(this)}
                status={this.state.status}
                onboarding={this.state.onboarding}
                walletConnected={this.state.walletConnected}
              />
            </Route>
            <Route path="/">
              <Home
                space={this.state.space}
                box={this.state.box}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                thread={this.state.thread}
                accounts={this.state.accounts}
                admin={this.state.admin}
                getSubmarketPosts={this.getSubmarketPosts.bind(this)}
                testnetReceipts={this.state.testnetReceipts}
                testnetReceiptItems={this.state.testnetReceiptItems}
                getTestnetReceipts={this.getTestnetReceipts.bind(this)}
                inboxThread={this.state.inboxThread}
                inboxMessages={this.state.inboxMessages}
                inboxThreadAddress={this.state.inboxThreadAddress}
                getInboxThread={this.getInboxThread.bind(this)}
                submarketThread={this.state.submarketThread}
                submarketPosts={this.state.submarketPosts}
                getSubmarketThread={this.getSubmarketThread.bind(this)}
                getListingsThread={this.getListingsThread.bind(this)}
                joinSubmarket={this.joinSubmarket.bind(this)}
                threadId={this.state.threadId}
                getStorePosts={this.getStorePosts.bind(this)}
                getStoreProfile={this.getStoreProfile.bind(this)}
                walletConnected={this.state.walletConnected}
              />
            </Route>
          </Switch>
        </div>
        {/*         <div className="userscontainer">
          {this.state.space && (
            <ChatBox
              // required
              spaceName={SPACE_NAME}
              threadName="globalListChat"
              // Required props for context A) & B)
              box={this.state.box}
              currentUserAddr={
                this.state.accounts ? this.state.accounts[0] : null
              }
              // optional
              mute={false}
              popupChat
              showEmoji
              colorTheme="#181F21"
              currentUser3BoxProfile={this.state.threeBoxProfile}
              agentProfile={{
                chatName: "Spendly chat",
              }}
              openOnMount={false}
            />
          )}
        </div> */}
      </Router>
    );
  }
}
