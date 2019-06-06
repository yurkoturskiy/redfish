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
   * --- if the iframe is failed: redirect to the landing
   * --- if ok: send request to delete token from landing's localStorage
   * --- on positive response redirect to the landing page
   */

  const [landingIframeFailed, setLandingIframeFailed] = useState();
  const [landingIframeIsMounted, setLandingIframeIsMounted] = useState();
  const [landingIframeIsLoggedOut, setLandingIframeIsLoggedOut] = useState();
  const iframeRef = useRef();

  useEffect(() => {
    logoutRequest();
    addLandingIframeMessageListener();
    return () => removeLandingIframeMessageListener();
  }, []);

  useEffect(() => {
    landingIframeFailed && redirectToLandingPage();
    landingIframeIsMounted && landingLogoutRequest();
    landingIframeIsLoggedOut && redirectToLandingPage();
  }, [landingIframeIsMounted, landingIframeFailed, landingIframeIsLoggedOut]);

  const logoutRequest = () => {
    props.client.mutate({
      mutation: LOGOUT,
      variables: { key: localStorage.getItem("token") }
    });
    localStorage.removeItem("token");
  };

  const addLandingIframeMessageListener = () =>
    window.addEventListener("message", landingIframeListener, false);

  const removeLandingIframeMessageListener = () =>
    window.removeEventListener("message", landingIframeListener, false);

  const landingIframeListener = e => {
    e.data === "mounted" && setLandingIframeIsMounted(true);
    e.data === "succeed" && setLandingIframeIsLoggedOut(true);
  };

  const landingIframeOnError = () => setLandingIframeFailed(true);

  const landingLogoutRequest = () =>
    // Remove token from landing's localStorage
    iframeRef.current.contentWindow.postMessage(
      "logout",
      process.env.REACT_APP_LANDING_DEV_HOST_NAME
    );

  const redirectToLandingPage = () =>
    window.location.replace(process.env.REACT_APP_LANDING_DEV_HOST_NAME);

  return (
    <React.Fragment>
      <div>logging out</div>
      <iframe
        style={{ visibility: "hidden" }}
        ref={iframeRef}
        onError={landingIframeOnError}
        src={`${process.env.REACT_APP_LANDING_DEV_HOST_NAME}/iframe-logout`}
      />
    </React.Fragment>
  );
}

export default withApollo(Logout);
