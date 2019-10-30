import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/photos">Photos</Link>
              </li>
              <li>
                <Link to="/messager">Messenger</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/messenger">
              <Messenger />
            </Route>
            <Route path="/photos">
              {this.state.accounts && (
                <Photos account={this.state.accounts[0]} />
              )}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

class Profile extends Component {
  render() {
    return <h2>Profile </h2>;
  }
}

class Photos extends Component {

  state = {
    thread : false,
  }
  async componentDidMount() {
    const box = await Box.openBox(this.props.account, window.ethereum);
    this.setState({box})
    const space = await this.state.box.openSpace("my-photos");
    this.setState({space})
    const thread = await this.state.space.joinThread("myThread", {
      members: true
    });
    this.setState({thread})
    this.getPosts()
    return;
  }

  getPosts = async () => {
    if(this.state.thread){
      const posts = await this.state.thread.getPosts();
      this.setState({ posts });
    } else {
      console.error("thread not in react state")
    }
  }

  addPost = async() => {
    await this.state.thread.post('hello cat');
    await this.getPosts();

  }
  render() {
    return (
      <div>
        <h2>Photos</h2>;
        {this.state.thread && <button onClick={this.addPost}>add post</button>}
      </div>
    );
  }
}

function Messenger() {
  return <h2>Messenger</h2>;
}
