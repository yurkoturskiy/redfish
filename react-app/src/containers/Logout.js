import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import axios from "axios";

export const query = gql`
  query($key: String!) {
    logout(input: { token: $key })
      @rest(type: "Logout", method: "POST", path: "rest-auth/logout/") {
      __typename
    }
  }
`;

function Logout(props) {
  const [landingFrameIsMounted, setLandingFrameIsMounted] = useState(false);
  const [landingFrameIsUnavailable, setLandingFrameIsUnavailable] = useState(
    false
  );
  useEffect(() => {
    console.log("loging out");
    axios({
      method: "post",
      url: "http://localhost:9000/" + "rest-auth/logout/",
      headers: { authorization: `Token ${localStorage.getItem("token")}` }
    }).then(res => console.log("responese", res));

    localStorage.removeItem("token");
    window.addEventListener("message", landingFrameLogoutResponse, false);
    return () =>
      window.removeEventListener("message", landingFrameLogoutResponse, false);
  }, []);
  useEffect(() => {
    if (landingFrameIsMounted) {
      console.log("sending logout request");
      let landingFrameElement = document.getElementById("landingFrame");
      landingFrameElement.contentWindow.postMessage(
        "logout",
        "http://localhost:8000/"
      );
    }
  }, [landingFrameIsMounted]);
  const landingFrameOnLoad = () => {
    console.log("frame is loaded");
  };
  const landingFrameOnError = () => setLandingFrameIsUnavailable(true);
  const landingFrameLogoutResponse = e => {
    console.log(e);
    if (e.data === "mounted") setLandingFrameIsMounted(true);
    if (e.data === "succeed") {
      console.log("logout succeed");
      window.location.replace("http://localhost:8000/");
    }
  };
  return (
    <React.Fragment>
      <div>logging out</div>
      <iframe
        style={{ visibility: "hidden" }}
        id="landingFrame"
        onLoad={landingFrameOnLoad}
        onError={landingFrameOnError}
        src="http://localhost:8000/iframe-logout"
      />
    </React.Fragment>
  );
}

export default Logout;
