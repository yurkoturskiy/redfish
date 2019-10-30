import React from "react";
import { css } from "linaria";
import { withRouter } from "react-router";
import MaterialIcon from "@material/react-material-icon";
import IconButton from "@material/react-icon-button";

export const logoutBtn = css`
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
  }
`;

export const icon = css``;

function LogoutButton(props) {
  return (
    <IconButton
      className={logoutBtn}
      onClick={() => props.history.push("/logout")}
    >
      <MaterialIcon className={icon} icon="power_settings_new" />
    </IconButton>
  );
}

export default withRouter(LogoutButton);
