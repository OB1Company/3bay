import React, {Component} from 'react';
import AppForm from './../components/AppForm';
import { BounceLoader } from 'react-spinners';

export default class AddApp extends Component {
    state = {
      thread: null
    };
  
    savePost = async formData => {
      formData.account = this.props.accounts[0];
      await this.props.thread.post(formData);
      this.props.getAppsThread();
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