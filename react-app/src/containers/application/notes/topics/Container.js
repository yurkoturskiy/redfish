import React, { useState } from "react";
// Local components
import TopicsMenuBtn from "./TopicsMenuBtn";
import TopicsMenuBody from "./TopicsMenuBody";

function Topics(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TopicsMenuBtn expand={expand} />
      {isExpanded && <TopicsMenuBody />}
    </>
  );
}

export default Topics;
