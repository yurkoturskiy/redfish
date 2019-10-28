import React from "react";
import { css } from "linaria";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export const wrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 98px;
`;

const NavigationBar = () => (
  <div className={wrapper}>
    <Logo />
    <LogoutButton />
  </div>
);

export default NavigationBar;
