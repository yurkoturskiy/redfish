import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// Queries
import { IS_AUTHENTICATED, SWITCH_AUTHENTICATION } from "../graphql/queries";

const TOKEN_IS_VALID = gql`
  query tokenIsValid($key: String!) {
    tokenIsValid(key: $key)
  }
`;

function Authentication(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [iframeLandingIsMounted, setIframeLandingIsMounted] = useState();
  const [
    iframeLandingIsUnavailable,
    setIframeLandingIsUnavailable
  ] = useState();

  const { loading, error, data, refetch } = useQuery(TOKEN_IS_VALID, {
    variables: { key: token }
  });
  const [switchAuthStatus] = useMutation(SWITCH_AUTHENTICATION);

  useEffect(() => {
    // Add key receiver
    window.addEventListener("message", receiveKey, false);
    return () => window.removeEventListener("message", receiveKey, false);
  }, []);

  const redirectToLoginPage = () =>
    window.location.replace(
      `${process.env.REACT_APP_LANDING_DEV_HOST_NAME}/login`
    );

  const receiveKey = e => {
    // Key receiver from the landing's Iframe
    var payload = JSON.parse(e.data); // Prepare data
    console.log("payload", payload);
    if (payload.key) {
      // Landing page has a key.
      setToken(payload.key);
    } else {
      // Landing page has no key
      // Redirect to the login page
      redirectToLoginPage();
    }
  };
  console.log("token", token);
  console.log("loading", loading);
  console.log("error", error);
  console.log("data", data);
  useEffect(() => {
    // Check if token is valid
    if (token) {
      refetch();
    }
  }, [token]);

  useEffect(() => {
    // Make actions depends on token validity
    if (!error && !loading && token) {
      if (data.tokenIsValid === true) {
        // Provided token is valid. Save it and allow access
        localStorage.setItem("token", token);
        switchAuthStatus({ variables: { status: true } });
      } else if (data.tokenIsValid === false) {
        // Provided token is not valid
        // Redirect to the login page
        localStorage.removeItem("token");
        redirectToLoginPage();
      }
    }
  }, [data, token, props.client]);

  const landingFrameOnError = () => {
    setIframeLandingIsUnavailable(true);
    // redirectToLoginPage();
  };

  if (token) {
    // We have already have a key and there is no need to mount landing's localstorage
    return null;
  } else {
    return (
      // Render iframe with a landing page to get a key from a localstorage
      <iframe
        style={{ visibility: "hidden" }}
        id="landingFrame"
        onError={landingFrameOnError}
        src={`${process.env.REACT_APP_LANDING_DEV_HOST_NAME}/iframe-key`}
      />
    );
  }
}

export default Authentication;
