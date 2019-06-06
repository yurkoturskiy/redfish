import React from "react";
import { css } from "linaria";
import Logo from "./Logo";
import PreferencesBtn from "./preferences/PreferencesBtn";

export const wrapper = css`
  height: 128px;
`;

const NavigationBar = () => (
  <div className={wrapper}>
    <Logo />
    <PreferencesBtn />
  </div>
);

export default NavigationBar;
