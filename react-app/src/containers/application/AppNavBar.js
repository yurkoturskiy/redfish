import React from "react";
import { css } from "linaria";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import Logo from "./Logo";
import PreferencesBtn from "./preferences/PreferencesBtn";

export const wrapper = css`
  height: 128px;
`;

function NavBar(props) {
  return (
    <div className={wrapper}>
      <Logo />
      <PreferencesBtn />
    </div>
  );
}

export default withRouter(NavBar);
