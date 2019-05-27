import React from "react";
import { withRouter } from "react-router";
import icon from "../../static/icon.svg";
import { css } from "linaria";

export const logo = css`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 44px;
  height: 44px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 12px;
`;

function Logo(props) {
  const redirect = () => {
    if (props.history.location.pathname !== "/app") {
      props.history.push("/app");
    }
  };
  return (
    <React.Fragment>
      <img className={logo} src={icon} onClick={() => redirect()} />
    </React.Fragment>
  );
}

export default withRouter(Logo);
