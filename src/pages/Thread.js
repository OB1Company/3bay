import React from "react";
import { CardColumns, Row } from "react-bootstrap";
import { BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

import ListingCard from "../components/ListingCard.js";

const styles = {
  column: {
    width: "100%",
    columnCount: "4",
  },
  background: {
    textAlign: "center",
  },
  wrapper: {
    padding: "20px",
    background: "rgb(0,0,0,0)",
    borderWidth: "0",
  },
  slash: {
    fontSize: "13px",
    textAlign: "left",
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  link: {
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    color: "#0000EE",
  },
  path: {
    fontSize: "13px",
    textAlign: "left",
    color: "#000000",
  },
};

export default ({
  space,
  match,
  globalThread,
  threeBox,
  box,
  usersAddress,
  getGlobalListingsThread,
  admin,
  testnetReceipts,
  testnetReceiptItems,
  getTestnetReceipts,
  inboxThread,
  inboxMessages,
  getInboxThread,
}) => {
  const [submarketPosts, setSubmarketPosts] = React.useState();
  const [submarketThread, setSubmarketThread] = React.useState();
  const [threadId, setThreadId] = React.useState();
  const getSubmarketPosts = React.useCallback(async () => {
    if (!submarketThread) {
      console.error("global listings thread not in react state");
      return;
    }

    // Fetch the listings and add them to state
    const threadPosts = await submarketThread.getPosts();
    setSubmarketPosts(threadPosts);

    // Update the state when new listings are added
    await submarketThread.onUpdate(async () => {
      const data = await submarketThread.getPosts();
      setSubmarketPosts(data);
    });
  }, [submarketThread]); //eslint-disable-line react-hooks/exhaustive-deps

  const getSubmarketThread = React.useCallback(async () => {
    const result = await space.joinThread(threadId, {
      firstModerator: "0xf54D276a029a49458E71167EBc25D1cCa235ee6f",
      members: false,
    });
    setSubmarketThread(result);
  }, [space, threadId]); //eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setThreadId(match.params.threadId);
  }, [match]);

  React.useEffect(() => {
    if (space && threadId) {
      getSubmarketThread();
    }
  }, [space, threadId]); //eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (submarketThread) {
      getSubmarketPosts();
    }
  }, [submarketThread]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container" style={styles.background}>
      {threadId && (
        <div>
          <h1 className="brand-font" style={{ fontSize: "4rem" }}>
            s/{threadId}
          </h1>
          <p className="brand-font">Submarket</p>
        </div>
      )}
      <Row>
        <Link
          className="brand-font float-sm-left"
          to="/"
          style={threadId === "all" ? styles.path : styles.link}>
          all
        </Link>
        <p style={styles.slash}>/</p>
        <Link
          className="brand-font float-sm-left"
          to="/s/bbb"
          style={threadId === "bbb" ? styles.path : styles.link}>
          bbb
        </Link>
        <p style={styles.slash}>/</p>
        <Link
          className="brand-font float-sm-left"
          to="/s/shoes"
          style={threadId === "shoes" ? styles.path : styles.link}>
          shoes
        </Link>
        <p style={styles.slash}>/</p>
        <Link
          className="brand-font float-sm-left"
          to="/s/shirts"
          style={threadId === "shirts" ? styles.path : styles.link}>
          shirts
        </Link>
      </Row>
      <div className="row" style={{ marginTop: "50px" }}>
        {!submarketPosts && (
          <div style={{ width: "60px", margin: "auto" }}>
            <BounceLoader color={"blue"} />
          </div>
        )}
        {submarketPosts && (
          <CardColumns style={styles.column}>
            {submarketPosts.length >= 1 &&
              submarketPosts.map((post, i) => {
                return (
                  <ListingCard
                    globalThread={globalThread}
                    post={post}
                    key={i}
                    threeBox={threeBox}
                    space={space}
                    box={box}
                    usersAddress={usersAddress}
                    getGlobalListingsThread={getGlobalListingsThread}
                    i={i}
                    admin={admin}
                    home={true}
                    testnetReceipts={testnetReceipts}
                    testnetReceiptItems={testnetReceiptItems}
                    getTestnetReceipts={getTestnetReceipts}
                    inboxThread={inboxThread}
                    inboxMessages={inboxMessages}
                    getInboxThread={getInboxThread}
                  />
                );
              })}
            {submarketPosts.length === 0 && (
              <p className="brand-font" style={{ textAlign: "left" }}>
                Nothing here yet!
              </p>
            )}
          </CardColumns>
        )}
      </div>
    </div>
  );
};
