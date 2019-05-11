import React from "react";
import { css } from "linaria";

const topic = css`
  border: 1px solid lightgrey;
  height: 48px;
  width: 100%;
  line-height: 48px;
  padding-left: 16px;
  margin-bottom: 16px;
`;

function Topic(props) {
  return <div className={topic}>{props.topicName}</div>;
}

export default Topic;
