import React, { Component } from "react";
import ProfileHover from "profile-hover";
import { BounceLoader } from "react-spinners";

export default class Home extends Component {
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1>Home</h1>
        {/* TODO fix bootstrap grid */}
        <div className="row">
          {!this.props.posts && (
            <div style={{ width: "100px", margin: "auto" }}>
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
                  />
                  <p>{post.message.description}</p>
                  {post.message.url && (
                    <p>
                      <a href={post.message.url} target="_blank">
                        website
                      </a>
                    </p>
                  )}
                  {post.message.account && <ProfileHover address={post.message.account} />}
                </div>
                {i % 3 == 0 && i != 0 && <div className="w-100"></div>}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
