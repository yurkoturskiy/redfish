import React, { useState, useEffect } from "react";
import { withApollo } from "react-apollo";
// Queries
import { TOKEN_IS_VALID } from "../graphql/queries";

function Authentication(props) {
  /*
   * AutoRouter.js is a parent of this component.
   * It check if the user have a permission to the application.
   * The algorithm:
   * - Try to get token from the localStorage
   * - It there is no token:
   * --- Mount landing's iframe
   * --- If iframe raise error:
   * ----- Remove token from the app's localStorage
   * ----- Redirect to the login page
   * --- Receive message with token (which can be null) via postMessage
   * - If token state is true:
   * --- Check if token is valid via the tokenIsValid gql query
   * --- If token is valid:
   * ----- Set isAuthenticated global state to true. Give us access.
   * --- If token is not valid:
   * ----- Remove token from the localStorage
   * ----- Redirect to the login page
   * - If token state is false: *Means we haven't token in any localStorage
   * --- Remove fake token from app's localStorage. *Landing has own validation
   * --- Redirect to the login page
   */

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [tokenIsValid, setTokenIsValid] = useState();

  useEffect(() => {
    // Add key receiver
    window.addEventListener("message", landingIframeListener, false);
    return () =>
      window.removeEventListener("message", landingIframeListener, false);
  }, []);

  useEffect(() => {
    token && validateToken();
  }, [token]);

  useEffect(() => {
    tokenIsValid === true && approve();
    tokenIsValid === false && refuse();
  }, [tokenIsValid]);

  const validateToken = () => {
    props.client
      .query({
        query: TOKEN_IS_VALID,
        variables: { key: token ? token : "" }
      })
      .then(res => {
        setTokenIsValid(res.data.tokenIsValid);
      })
      .catch(() => setTokenIsValid(false));
  };

  const landingIframeOnError = () => refuse();

  const landingIframeListener = e => {
    var payload = JSON.parse(e.data);
    payload.key && setToken(payload.key);
    !payload.key && refuse();
  };

  const approve = () => {
    localStorage.setItem("token", token);
    props.client.writeData({ data: { isAuthenticated: true } });
  };

  const refuse = () => {
    localStorage.removeItem("token");
    window.location.replace(
      process.env.REACT_APP_LANDING_URL +
        process.env.REACT_APP_AUTHENTICATION_ENDPOINT
    );
  };

  if (token) {
    // We already have a key and there is no need to mount landing's localStorage
    return null;
  } else {
    return (
      // Render iframe with a landing page to get a key from a localStorage
      <iframe
        style={{ visibility: "hidden" }}
        onError={landingIframeOnError}
        src={
          process.env.REACT_APP_LANDING_URL +
          process.env.REACT_APP_LANDING_IFRAME_KEY_ENDPOINT
        }
      />
    );
  }
}

export default withApollo(Authentication);
