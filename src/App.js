import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
import * as blobUtil from "blob-util";
import { BounceLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import AppForm from "./components/AppForm";

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

    // async componentDidMount() {
      const rach = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";
  
      const rachEth = "0x2f4cE4f714C68A3fC871d1f543FFC24b9b3c2386";
      const box = await Box.openBox(this.state.accounts[0], window.ethereum);
      this.setState({box})
      const space = await this.state.box.openSpace("test-app-store");
      console.log("space ", space);
  
      const thread = await space.joinThread("myThread", {
        firstModerator: rach,
        members: false
      });
      this.setState({ thread });
      console.log("thread", this.state.thread);
      var threadMembers = await this.state.thread.listModerators();
      this.setState({threadMembers})
      console.log("memebers", threadMembers);
      const posts = await this.state.thread.getPosts();
      this.setState({posts})
      console.log("get posts ", posts);
    // }
  }
  render() {
    if (this.state.needToAWeb3Browser) {
      return <h1>Please install metamask</h1>;
    }

    return (
      <Router>
        <div>
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/messager">
                Messenger
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-application">
                Add an Application
              </Link>
            </li>
          </ul>

          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/messenger">
              <Messenger />
            </Route>
            <Route path="/add-application">
              {this.state.accounts && <AddApp 
                                        accounts={this.state.accounts} 
                                        thread={this.state.thread} 
                                        box={this.state.box} 
                                        space={this.state.space}
                                        threadMembers={this.state.threadMembers}
                                        posts={this.state.posts} />}
              {!this.state.accounts && <h1>Login with metamask</h1>}
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

class Home extends Component {
  async componentDidMount(){
   
      const posts = await this.state.thread.getPosts();
      console.log("get posts ", posts);

  }
  render(){
    return (<dib>

    </dib>

    )

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
      <div className="container" >
        <h1 style={{textAlign : "center"}}>Submit your Application!</h1>
        {!this.props.thread && (
          <div style={{ width: "100px", margin: "auto" }}>
            <BounceLoader color={"blue"} />
          </div>
        )}
        {this.props.thread && <AppForm savePost={this.savePost} />}
        {/* <button
          onClick={async () => {
            const posts = await this.state.thread.getPosts();
            console.log("get posts ", posts);
          }}
        >
          Get Posts
        </button> */}
      </div>
    );
  }
}

function Messenger() {
  return <h2>Messenger</h2>;
}
