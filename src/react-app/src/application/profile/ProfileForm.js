import React from "react";
import PropTypes from "prop-types";

let ProfileForm = props => {
  const { user } = props;
  return (
    <div>
      <p>{user.pk}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object
};

export default ProfileForm;
