import React from "react";
import { withRouter } from "react-router";
import icon from "../static/icon.svg";
import { css } from "linaria";

export const logo = css`
  width: 64px;
  height: 64px;
  margin: 24px;

  animation-name: appearance;
  animation-duration: 0.5s;
  @keyframes appearance {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 767px) {
    /* Extra small */
    margin: 12px;
    width: 64px;
    height: 64px;
  }
`;

function Logo(props) {
  const redirect = () => {
    if (props.history.location.pathname !== "/") {
      props.history.push("/");
    }
  };
  return (
    <React.Fragment>
      <img className={logo} src={icon} onClick={() => redirect()} />
    </React.Fragment>
  );
}

export default withRouter(Logo);
