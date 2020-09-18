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
};
export default ({
  space,
  match,
  globalThread,
  threeBox,
  box,
  usersAddress,
  cartItems,
  shoppingCart,
  getShoppingCartThread,
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
  const getSubmarketPosts = async () => {
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
  };
  const getSubmarketThread = React.useCallback(async () => {
    const result = await space.joinThread(threadId, {
      firstModerator: "0xf54D276a029a49458E71167EBc25D1cCa235ee6f",
      members: false,
    });
    setSubmarketThread(result);
  }, [space]);
  React.useEffect(() => {
    setThreadId(match.params.threadId);
  }, []);
  React.useEffect(() => {
    if (space) {
      getSubmarketThread();
    }
  }, [space]);
  React.useEffect(() => {
    if (submarketThread) {
      getSubmarketPosts();
    }
  }, [submarketThread]);
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
          style={{
            fontSize: "13px",
            textAlign: "left",
            cursor: "pointer",
            color: "#0000EE",
          }}>
          All
        </Link>
        <p
          style={{
            fontSize: "13px",
            textAlign: "left",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}>
          /
        </p>
        <Link
          className="brand-font float-sm-left"
          to="/s/bbb"
          style={{
            fontSize: "13px",
            textAlign: "left",
            cursor: "pointer",
            color: "#0000EE",
          }}>
          Stuff
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
                    cartItems={cartItems}
                    shoppingCart={shoppingCart}
                    getShoppingCartThread={getShoppingCartThread}
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
