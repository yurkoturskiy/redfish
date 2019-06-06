import React from "react";
import { css } from "linaria";

export const button = css`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 6;
  width: 128px;
  height: 48px;
  border-radius: 24px;
  background-color: white;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
  /* text */
  line-height: 48px;
  text-align: center;
`;

function TopicsMenuBtn(props) {
  return (
    <div className={button} onClick={() => props.expand()}>
      Topics
    </div>
  );
}

export default TopicsMenuBtn;
