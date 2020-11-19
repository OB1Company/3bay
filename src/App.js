import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import Nav from "./components/Nav";
import history from "./utils/history";
// import ChatBox from "3box-chatbox-react";
import ConnectWallet from "./pages/ConnectWallet";
import MyStore from "./pages/MyStore";
import Store from "./pages/Stores";
import Home from "./pages/Home";
import Thread from "./pages/Thread";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Inbox from "./pages/Inbox";
import Sales from "./pages/Sales";
import About from "./pages/About";
import ListingDetails from "./pages/ListingDetails";
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
  }

  /**
   * connectWallet => Connect Metamask and create/open space in 3Box
   */
  async connectWallet() {
    // Set state to onboarding
    this.setState({ onboarding: true });

    // Fetch the user's ethereum account
    await this.getAddressFromMetaMask();

    // Check if wallet is connected
    if (this.state.needToAWeb3Browser === true) {
      return;
    }

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
    this.setState({ status: "Opening '3Bay'... [3/7]" });

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
    await this.getMyStoreObject();

    // Status update
    this.setState({ status: "Checking for sales... [5/7]" });

    // Create a public sales inbox for the user
    const salesThread = await space.joinThread("salesThread", {
      firstModerator: userMod,
      members: false,
      ghost: false,
      confidential: false,
    });
    const salesThreadAddress = salesThread.address;
    this.setState({ salesThread }, () => this.getSalesThread());
    this.setState({ salesThreadAddress });

    // Status update
    this.setState({ status: "Checking your mail... [6/7]" });

    // Create a public mail inbox for the user
    const inboxThread = await space.joinThread("inboxThread", {
      firstModerator: userMod,
      members: false,
      ghost: false,
      confidential: false,
    });
    const inboxThreadAddress = inboxThread.address;
    this.setState({ inboxThread }, () => this.getInboxThread());
    this.setState({ inboxThreadAddress });

    // Check if there is a public key-value for the inbox address
    // If not, create one
    const inboxAddress = await space.public.get("inboxTestnetAddress");
    if (!inboxAddress) {
      await space.public.set("inboxThreadAddress", inboxThreadAddress);
    }

    // Status update
    this.setState({ status: "Loading purchases... [7/7]" });

    // Create and fetch the testnet receipts
    const testnetReceiptsAddress = await space.private.get(
      "testnetReceiptsAddress"
    );
    if (testnetReceiptsAddress) {
      // Private testnet receipts exists => fetch posts
      const testnetReceipts = await space.joinThreadByAddress(
        testnetReceiptsAddress
      );
      this.setState({ testnetReceiptsAddress });
      this.setState({ testnetReceipts }, () => this.getTestnetReceipts());
    } else {
      // Private testnet receipts doesn't exists => create it
      const testnetReceipts = await space.joinThread(
        "demo-testnet-receipts-private",
        {
          firstModerator: userMod,
          members: true,
          ghost: false,
          confidential: true,
        }
      );
      await space.private.set(
        "testnetReceiptsAddress",
        testnetReceipts.address
      );
      this.setState({ testnetReceipts }, () => this.getTestnetReceipts());
    }

    // Status update
    this.setState({
      status: "Success, syncing complete!",
      walletConnected: true,
    });

    // Close modal
    this.state.handleWalletConnectModalClose();

    // Join global chat
    const globalChat = await space.joinThread("globalListChat");
    this.setState({ globalChat });
  }

  // Change threadId
  async changeThread(threadId) {
    this.setState({ threadId: threadId });
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

  // Get a store's profile and data
  async getStoreProfile(storeAccount) {
    // Fetch the profile and add it to state
    const storeProfile = await Box.getProfile(storeAccount);
    const space = await Box.getSpace(storeAccount, SPACE_NAME);
    const storeName = space.storeName;
    const storeDescription = space.storeDescription;
    const storeHeader = space.storeHeader;
    const storeAvatar = space.storeAvatar;
    const inboxTestnetAddress = space.inboxTestnetAddress;
    this.setState({
      storeProfile: storeProfile,
      storeAccount: storeAccount,
      storeObject: {
        storeName: storeName,
        storeDescription: storeDescription,
        storeHeader: storeHeader,
        storeAvatar: storeAvatar,
        inboxTestnetAddress: inboxTestnetAddress,
      },
    });
    console.log(this.state.storeObject);
  }

  // Get a post from a thread without joining the thread
  async getPost(postId) {
    // Fetch the post and add it to state
    const ipfs = await Box.getIPFS();
    const data = await ipfs.dag.get(postId);
    const threadPost = data.value.payload.value;
    this.setState({ threadPost });
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

  // Get sales in the user's sales thread
  async getSalesThread() {
    if (!this.state.salesThread) {
      console.error("messages in inbox thread not in react state");
      return;
    }

    // Save the thread address
    const salesThreadAddress = this.state.salesThread.address;
    this.setState({ salesThreadAddress });

    // Fetch the messages and add them to state
    const salesMessages = await this.state.salesThread.getPosts();
    this.setState({ salesMessages });

    // Update the state when new messages are added
    await this.state.salesThread.onUpdate(async () => {
      const salesMessages = await this.state.salesThread.getPosts();
      this.setState({ salesMessages });
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

  // Get the user's store details
  async getMyStoreObject() {
    if (!this.state.space) {
      console.error("space isn't there");
      return;
    }

    const storeName = await this.state.space.public.get("storeName");
    const storeDescription = await this.state.space.public.get(
      "storeDescription"
    );
    const storeAvatar = await this.state.space.public.get("storeAvatar");
    const storeHeader = await this.state.space.public.get("storeHeader");
    const myStoreObject = {
      storeName: storeName,
      storeDescription: storeDescription,
      storeAvatar: storeAvatar,
      storeHeader: storeHeader,
    };
    this.setState({ myStoreObject: myStoreObject });
  }

  render() {
    return (
      <Router history={history}>
        <Container fluid>
          <Nav
            inboxMessages={this.state.inboxMessages}
            salesMessages={this.state.salesMessages}
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
                needToAWeb3Browser={this.state.needToAWeb3Browser}
              />
            </Route>
            <Route
              path="/store/:account"
              render={(props) => (
                <Store
                  {...props}
                  thread={this.state.thread}
                  storePosts={this.state.storePosts}
                  storeProfile={this.state.storeProfile}
                  storeObject={this.state.storeObject}
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
              )}></Route>
            <Route
              path="/s/:threadId"
              render={(props) => (
                <Thread
                  {...props}
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
                  salessThread={this.state.salesThread}
                  salesThreadAddress={this.state.salesThreadAddress}
                  getSalesThread={this.getSalesThread.bind(this)}
                />
              )}></Route>
            <Route
              path="/:account/:postId"
              render={(props) => (
                <ListingDetails
                  {...props}
                  threeBox={this.state.threeBox}
                  space={this.state.space}
                  box={this.state.box}
                  usersAddress={
                    this.state.accounts ? this.state.accounts[0] : null
                  }
                  testnetReceipts={this.state.testnetReceipts}
                  testnetReceiptItems={this.state.testnetReceiptItems}
                  getTestnetReceipts={this.getTestnetReceipts.bind(this)}
                  inboxThread={this.state.inboxThread}
                  inboxMessages={this.state.inboxMessages}
                  getInboxThread={this.state.getInboxThread}
                  getStorePosts={this.getStorePosts.bind(this)}
                  getStoreProfile={this.getStoreProfile.bind(this)}
                  getPost={this.getPost.bind(this)}
                  threadPost={this.state.threadPost}
                />
              )}></Route>
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
                storeObject={this.state.storeObject}
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
                getMyStoreObject={this.getMyStoreObject.bind(this)}
                box={this.state.box}
                getListingsThread={this.getListingsThread.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                myStoreObject={this.state.myStoreObject}
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
            <Route path="/sales">
              <Sales
                space={this.state.space}
                box={this.state.box}
                salesThread={this.state.salesThread}
                salesMessages={this.state.salesMessages}
                getSalesThread={this.getSalesThread.bind(this)}
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
            <Route path="/about">
              <About admin={this.state.admin} />
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
                changeThread={this.changeThread.bind(this)}
                getSubmarketPosts={this.getSubmarketPosts.bind(this)}
                testnetReceipts={this.state.testnetReceipts}
                testnetReceiptItems={this.state.testnetReceiptItems}
                getTestnetReceipts={this.getTestnetReceipts.bind(this)}
                salessThread={this.state.salessThread}
                inboxThread={this.state.inboxThread}
                salesThreadAddress={this.state.salesThreadAddress}
                getSalesThread={this.getSalesThread.bind(this)}
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
        </Container>
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
                chatName: "3Bay chat",
              }}
              openOnMount={false}
            />
          )}
        </div> */}
      </Router>
    );
  }
}
