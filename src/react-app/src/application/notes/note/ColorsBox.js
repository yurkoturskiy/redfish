import React from "react";
import { css } from "linaria";

const wrapper = css``;

export const colorsBox = css`
  display: none;
  position: absolute;
  top: -36px;
  left: 0;
  transform: translate(-50%, 0);
  box-sizing: border-box;
  padding: 3px;
  height: 36px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  .options-icon:hover & {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const triangle = css`
  position: absolute;
  display: none;
  width: 0;
  height: 0;
  top: 0;
  left: 50%;
  border: 4px solid black;
  border-radius: 2px;
  border-color: transparent transparent white white;

  box-sizing: border-box;
  transform: translate(-50%, 0) rotate(-45deg);
  transform-origin: 0 0;

  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.15);

  .options-icon:hover & {
    display: inline-block;
  }
`;

function ColorsBox(props) {
  return (
    <div className={wrapper}>
      <div className={colorsBox}>{props.children}</div>
      <div className={triangle} />
    </div>
  );
}

export default ColorsBox;
