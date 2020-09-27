import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BounceLoader } from "react-spinners";
// import ChatBox from "3box-chatbox-react";

import MyStore from "./pages/MyStore";
import Home from "./pages/Home";
import AddListing from "./pages/AddListing";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Inbox from "./pages/Inbox";
import Thread from "./pages/Thread";
import { SPACE_NAME } from "./Constants";
import history from "./utils/history";

// 3Box identity
const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {
  // Changes to true if Metamask isn't detected, or there's a problem
  state = {
    needToAWeb3Browser: false,
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

    // Fetch the user's ethereum account
    await this.getAddressFromMetaMask();

    // Get 3Box profile of the ethereum account
    if (this.state.accounts) {
      const threeBoxProfile = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBoxProfile });
    }
    const userMod = this.state.accounts[0];
    this.setState({ userMod });
    const admin = "0xf54d276a029a49458e71167ebc25d1cca235ee6f";
    this.setState({ admin });

    // Open the 3Box object of the user's account
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    await box.syncDone;
    this.setState({ box });

    // Open the demo marketplace 'space' of the user
    const space = await this.state.box.openSpace(SPACE_NAME);
    this.setState({ space });

    // Fetch the listings in the thread of the global marketplace
    const globalThread = await space.joinThreadByAddress(
      "/orbitdb/zdpuAosv7kRPN49quPCwVr5p531SwjycjdxQeEbM9Y3SiNBp9/3box.thread.demo-marketplace.globalList"
    );
    this.setState({ globalThread }, () => this.getGlobalListingsThread());

    // Create and fetch the listings thread of the user's store
    const thread = await space.joinThread("listing_list", {
      firstModerator: userMod,
      members: true,
    });
    this.setState({ thread }, () => this.getListingsThread());

    // Create a public inbox for the user
    const inboxThread = await space.joinThread("inboxTestnet", {
      firstModerator: userMod,
      members: false,
      ghost: false,
      confidential: false,
    });
    this.setState({ inboxThread }, () => this.getInboxThread());

    // Create and fetch the orders
    const orders = await space.joinThread("demo-orders-public", {
      firstModerator: userMod,
      members: true,
      ghost: false,
      confidential: false,
    });
    this.setState({ orders }, () => this.getOrdersThread());

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

    // Join global chat
    const globalChat = await space.joinThread("globalListChat");
    this.setState({ globalChat });
  }

  /**
   * getListingsThread => Fetch the listings in a user's store
   */
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

  /**
   * getInboxThread => Fetch the messages in a user's inbox
   */
  async getInboxThread() {
    if (!this.state.inboxThread) {
      console.error("messages in inbox thread not in react state");
      return;
    }

    // Save the thread address
    const inboxThreadAddress = this.state.inboxThread.address;
    console.log(inboxThreadAddress);
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

  /**
   * getGlobalListingsThread => Fetch the listings from the global marketplace
   */
  async getGlobalListingsThread() {
    if (!this.state.globalThread) {
      console.error("global listings thread not in react state");
      return;
    }

    // Fetch the listings and add them to state
    const globalPosts = await this.state.globalThread.getPosts();
    this.setState({ globalPosts });

    // Update the state when new listings are added
    await this.state.globalThread.onUpdate(async () => {
      const globalPosts = await this.state.globalThread.getPosts();
      this.setState({ globalPosts });
    });
  }

  /**
   * getOrdersThread => Fetch orders for a user
   */
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

  /**
   * getTestnetReceiptsThread => Fetch receipts from testnet
   */
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

  async joinSubmarket() {
    // Fetch the listings in the thread of the global marketplace
    const space = this.state.space;
    const submarketThread = await space.joinThread("bbb", {
      firstModerator: "0xf54D276a029a49458E71167EBc25D1cCa235ee6f",
      members: false,
    });
    this.setState({ submarketThread }, () => this.getSubmarketThread());
  }

  async getSubmarketThread() {
    if (!this.state.submarketThread) {
      console.error("global listings thread not in react state");
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

  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>; //! Need something nice here
    }

    return (
      <Router history={history}>
        <div>
          <Nav
            inboxMessages={this.state.inboxMessages}
            style={{ background: "#ffffff" }}
          />
          <Switch>
            <Route path="/profile">
              {this.state.space && (
                <Profile
                  box={this.state.box}
                  space={this.state.space}
                  accounts={this.state.accounts}
                  threeBoxProfile={this.state.threeBoxProfile}
                />
              )}
              {!this.state.space && (
                <div style={{ width: "60px", margin: "auto" }}>
                  <BounceLoader color={"blue"} />
                </div>
              )}
            </Route>
            <Route path="/add-listing">
              {this.state.accounts && (
                <AddListing
                  accounts={this.state.accounts}
                  thread={this.state.thread}
                  globalThread={this.state.globalThread}
                  box={this.state.box}
                  space={this.state.space}
                  threadMembers={this.state.threadMembers}
                  posts={this.state.posts}
                  globalPosts={this.state.globalPosts}
                  threeBoxProfile={this.state.threeBoxProfile}
                  getListingsThread={this.getListingsThread.bind(this)}
                  getGlobalListingsThread={this.getGlobalListingsThread.bind(
                    this
                  )}
                  inboxThreadAddress={this.state.inboxThreadAddress}
                  getSubmarketThread={this.getSubmarketThread.bind(this)}
                  submarketThread={this.state.submarketThread}
                  submarketPosts={this.state.submarketPosts}
                />
              )}
              {!this.state.accounts && <h1>Login with metamask</h1>}
            </Route>
            <Route path="/my-store">
              <MyStore
                thread={this.state.thread}
                posts={this.state.posts}
                globalThread={this.state.globalThread}
                globalPosts={this.state.globalPosts}
                space={this.state.space}
                box={this.state.box}
                getGlobalListingsThread={this.getGlobalListingsThread.bind(
                  this
                )}
                getListingsThread={this.getListingsThread.bind(this)}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
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
              />
            </Route>
            <Route
              path="/s/:threadId"
              render={(props) => (
                <Thread
                  {...props}
                  thread={this.state.thread}
                  posts={this.state.posts}
                  globalThread={this.state.globalThread}
                  globalPosts={this.state.globalPosts}
                  space={this.state.space}
                  box={this.state.box}
                  getGlobalListingsThread={this.getGlobalListingsThread.bind(
                    this
                  )}
                  getListingsThread={this.getListingsThread.bind(this)}
                  usersAddress={
                    this.state.accounts ? this.state.accounts[0] : null
                  }
                  joinSubmarket={this.joinSubmarket.bind(this)}
                  getSubmarketThread={this.getSubmarketThread.bind(this)}
                  submarketThread={this.state.submarketThread}
                  submarketPosts={this.state.submarketPosts}
                />
              )}></Route>
            <Route path="/">
              <Home
                globalThread={this.state.globalThread}
                globalPosts={this.state.globalPosts}
                space={this.state.space}
                box={this.state.box}
                getGlobalListingsThread={this.getGlobalListingsThread.bind(
                  this
                )}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                admin={this.state.admin}
                testnetReceipts={this.state.testnetReceipts}
                testnetReceiptItems={this.state.testnetReceiptItems}
                getTestnetReceipts={this.getTestnetReceipts.bind(this)}
                inboxThread={this.state.inboxThread}
                inboxMessages={this.state.inboxMessages}
                getInboxThread={this.getInboxThread.bind(this)}
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
                chatName: "Spendit chat",
              }}
              openOnMount={false}
            />
          )}
        </div> */}
      </Router>
    );
  }
}
