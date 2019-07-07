import React from "react";
import { css } from "linaria";

export const colorsBox = css`
  display: none;
  position: absolute;
  top: -40px;
  left: 0;
  transform: translate(-50%, 0);
  z-index: 4;

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

export const arrow = css`
  position: absolute;
  display: none;
  z-index: 3;
  width: 8px;
  height: 8px;
  top: -8px;
  left: 50%;
  border-radius: 2px;
  transform: translate(-50%, 0) rotate(45deg);
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  .options-icon:hover & {
    display: inline-block;
  }
`;

function ColorsBox(props) {
  return (
    <div>
      <div className={colorsBox}>{props.children}</div>
      <div className={arrow} />
    </div>
  );
}

export default ColorsBox;
