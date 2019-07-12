import React from "react";
import { css } from "linaria";
// Local components
import Topic from "./Topic";

export const body = css`
  background-color: white;
  position: fixed;
  height: 100vh;
  right: 0px;
  bottom: 0px;
  width: 320px;
  z-index: 4;
  box-shadow: 0px 3px 26px 0px rgba(0, 0, 0, 0.3);
`;

export const topics = css`
  position: absolute;
  top: 128px;
  border: 1px solid pink;
  width: 100%;
  padding: 12px;
`;

function TopicsMenuBody(props) {
  return (
    <div className={body}>
      <div className={topics}>
        <Topic topicName={"Food"} />
        <Topic topicName={"Daily tasks"} />
      </div>
    </div>
  );
}

export default TopicsMenuBody;
