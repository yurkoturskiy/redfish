import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
import appState from "../graphql/appState";

const localKey = localStorage.getItem("token");

function Authentication(props) {
  const [iframeLandingIsMounted, setIframeLandingIsMounted] = useState();
  const [
    iframeLandingIsUnavailable,
    setIframeLandingIsUnavailable
  ] = useState();
  const [keyIsReceived, setKeyIsReceived] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();

  const landingFrameOnError = () => {
    setIframeLandingIsUnavailable(true);
    window.location.replace("http://localhost:8000/login");
  };

  useEffect(() => {
    // Set isAuthenticated to true if we already have key in the app local storage
    if (localKey) {
      props.client.writeData({ data: { isAuthenticated: true } });
    }
  });

  useEffect(() => {
    // Add key receiver
    window.addEventListener("message", receiveKey, false);
    return () => window.removeEventListener("message", receiveKey, false);
  }, []);

  const receiveKey = e => {
    // Key receiver
    var payload = JSON.parse(e.data);
    if (payload.key) {
      // Landing page has a key.
      // Store it in the app's localstorage and set auth status to true
      localStorage.setItem("token", payload.key);
      console.log("token: " + localStorage.getItem("token"));
      props.client.writeData({ data: { isAuthenticated: true } });
    } else {
      // Landing page has no key
      // Redirect to the login page
      window.location.replace("http://localhost:8000/login");
    }
  };

  if (localKey) {
    // We have already have a key and there is no need to mount landing's localstorage
    console.log("token: " + localStorage.getItem("token"));
    return null;
  } else {
    return (
      // Render iframe with a landing page to get a key from a localstorage
      <iframe
        style={{ visibility: "hidden" }}
        id="landingFrame"
        onError={landingFrameOnError}
        src="http://localhost:8000/iframe-key"
      />
    );
  }
}

export default withApollo(Authentication);
