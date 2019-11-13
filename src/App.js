import React, { Component } from "react";
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import AppForm from "./components/AppForm";
import Nav from './components/Nav'; 

import Home from './pages/Home';

const getThreeBox = async address => {
  const profile = await Box.getProfile(address);
  console.log(profile);
  return profile;
};

export default class App extends Component {
  state = {
    needToAWeb3Browser: false
  };
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      const threeBox = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBox });
    }
    const rach = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    this.setState({ box });
    const space = await this.state.box.openSpace("test-app-store");
    console.log("space ", space);

    const thread = await space.joinThread("myThread2", {
      firstModerator: rach,
      members: false
    });
    this.setState({ thread });
    console.log("thread", this.state.thread);
    var threadMembers = await this.state.thread.listModerators();
    this.setState({ threadMembers });
    console.log("memebers", threadMembers);
    const posts = await this.state.thread.getPosts();
    this.setState({ posts });
    console.log("get posts ", posts);
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <Router>
        <div>
          <Nav/>
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/messenger">
              <Messenger />
            </Route>
            <Route path="/add-application">
              {this.state.accounts && (
                <AddApp
                  accounts={this.state.accounts}
                  thread={this.state.thread}
                  box={this.state.box}
                  space={this.state.space}
                  threadMembers={this.state.threadMembers}
                  posts={this.state.posts}
                />
              )}
              {!this.state.accounts && <h1>Login with metamask</h1>}
            </Route>
            <Route path="/">
              <Home posts={this.state.posts} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}



class Profile extends Component {
  render() {
    return <h2>Profile </h2>;
  }
}

class AddApp extends Component {
  state = {
    thread: null
  };

  savePost = async formData => {
    await this.props.thread.post(formData);
  };
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Submit your Application!</h1>
        {!this.props.thread && (
          <div style={{ width: "100px", margin: "auto" }}>
            <BounceLoader color={"blue"} />
          </div>
        )}
        {this.props.thread && <AppForm savePost={this.savePost} />}
      </div>
    );
  }
}

function Messenger() {
  return <h2>Messenger</h2>;
}
