import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

function LogoutBtn(props) {
  const logout = () => {
    props.history.push("/logout");
    props.handleMenuClick();
  };
  return (
    <div className={props.className || ""} onClick={logout}>
      Logout
    </div>
  );
}

LogoutBtn.propTypes = {
  handleMenuClick: PropTypes.func
};

export default withRouter(LogoutBtn);
