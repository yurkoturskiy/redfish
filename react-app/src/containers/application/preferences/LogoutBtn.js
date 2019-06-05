import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { withRouter } from "react-router";

function LogoutBtn(props) {
  const logout = () => {
    props.history.push("/logout");
    props.handleMenuClick();
  };
  return <div onClick={logout}>Logout</div>;
}

LogoutBtn.propTypes = {
  handleMenuClick: PropTypes.func
};

export default withRouter(LogoutBtn);
