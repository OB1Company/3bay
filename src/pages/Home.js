import React, { Component } from "react";
import ProfileHover from "profile-hover";
import { BounceLoader } from "react-spinners";
import Modal from "./../components/Modal";

export default class Home extends Component {
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Distribute
        </h1>
        <p>The Decentralised App Store.</p>
        {/* TODO fix bootstrap grid */}
        <div className="row" style={{ marginTop: "10%" }}>
          {!this.props.posts && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          {this.props.posts &&
            this.props.posts.map((post, i) => (
              <div key={i}>
                <div className="col">
                  <h5>{post.message.name ? post.message.name : "unknown"}</h5>
                  <img
                    style={{ width: "200px" }}
                    src={
                      post.message.appImage
                        ? post.message.appImage
                        : "https://via.placeholder.com/200"
                    }
                    onError={ev =>
                      (ev.target.src =
                        "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
                    }
                  />
                  <p>{post.message.description}</p>
                  {post.message.url && (
                    <p>
                      <a href={post.message.url} target="_blank">
                        website
                      </a>
                    </p>
                  )}
                  {post.message.account && (
                    <div>
                      <p>Submitted by</p>
                      <ProfileHover address={post.message.account} />
                    </div>
                  )}
                  <Modal
                    app={post.message}
                    threeBox={this.props.threeBox}
                    space={this.props.space}
                  />
                </div>
                {i % 3 == 0 && i != 0 && <div className="w-100"></div>}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
