import React from "react";
import { css } from "linaria";
// components

const title = css`
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-size: 1.5em;
  color: palevioletred;
`;

const hero = css`
  position: relative;
  height: 100vh;
  width: 100%;
  background: papayawhip;
`;

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className={hero}>
          <h1 className={title}>Blank React-Django project</h1>
        </div>
        <div className={hero}>
          <h1>Second view</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
