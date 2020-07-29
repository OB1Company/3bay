import React, {Component} from 'react';
import ListingForm from '../components/ListingForm';
import { BounceLoader } from 'react-spinners';

export default class AddListing extends Component {
    state = {
      thread: null,
      globalThread: null,
    };
  
    saveListing = async formData => {
      formData.account = this.props.accounts[0];
      await this.props.thread.post(formData);
      await this.props.globalThread.post(formData);
      this.props.getListingsThread();
      this.props.getGlobalListingsThread();
    };
    render() {
      return (
        <div className="container">
          <h1 style={{ textAlign: "center" }}>Add a listing</h1>
          {!this.props.thread && (
            <div style={{ width: "100px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.thread && this.props.globalThread && <ListingForm saveListing={this.saveListing} />}
        </div>
      );
    }
  }
