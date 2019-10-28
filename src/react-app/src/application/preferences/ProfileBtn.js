import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

function ProfileBtn(props) {
  const redirect = () => {
    if (props.history.location.pathname !== "/profile") {
      props.history.push("/profile");
    }
    props.handleMenuClick();
  };
  return (
    <div className={props.className || ""} onClick={redirect}>
      Profile
    </div>
  );
}

ProfileBtn.propTypes = {
  handleMenuClick: PropTypes.func
};

export default withRouter(ProfileBtn);
