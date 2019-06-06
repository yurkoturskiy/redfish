import React, { useEffect, useState, useRef } from "react";
import { withApollo } from "react-apollo";
// Queries
import { LOGOUT } from "../graphql/queries";

function Logout(props) {
  /*
   * This component live on /logout route. Parent is an AutoRouter.js
   * The algorithm:
   * - Send logout request
   * - Remove token from the app's localStorage
   * - Mount landing's iframe with postMessage channel
   * --- if the iframe is failed to mount redirect to the landing
   * --- if ok send request to delete token from landing's localStorage
   * --- on response redirect to the landing page
   */

  const [landingFrameIsMounted, setLandingFrameIsMounted] = useState();
  const [landingFrameIsUnavailable, setLandingFrameIsUnavailable] = useState();
  const iframeRef = useRef();

  useEffect(() => {
    // Logout request on componentDidMount
    props.client.mutate({
      mutation: LOGOUT,
      variables: { key: localStorage.getItem("token") }
    });
    localStorage.removeItem("token");

    // Add event listener for receiving delete token response from landing
    window.addEventListener("message", landingFrameListener, false);
    return () =>
      // Cleanup event
      window.removeEventListener("message", landingFrameListener, false);
  }, []);

  useEffect(() => {
    if (landingFrameIsUnavailable) redirectToLandingPage();

    if (landingFrameIsMounted)
      // Send request to remove token from the landing's localStorage
      iframeRef.current.contentWindow.postMessage(
        "logout",
        process.env.REACT_APP_LANDING_DEV_HOST_NAME
      );
  }, [landingFrameIsMounted, landingFrameIsUnavailable]);

  const landingFrameOnError = () => setLandingFrameIsUnavailable(true);

  const landingFrameListener = e => {
    if (e.data === "mounted") setLandingFrameIsMounted(true);
    if (e.data === "succeed") redirectToLandingPage();
  };

  const redirectToLandingPage = () =>
    window.location.replace(process.env.REACT_APP_LANDING_DEV_HOST_NAME);

  return (
    <React.Fragment>
      <div>logging out</div>
      <iframe
        style={{ visibility: "hidden" }}
        ref={iframeRef}
        onError={landingFrameOnError}
        src={`${process.env.REACT_APP_LANDING_DEV_HOST_NAME}/iframe-logout`}
      />
    </React.Fragment>
  );
}

export default withApollo(Logout);
