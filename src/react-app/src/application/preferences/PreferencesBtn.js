import React, { useRef, useState, useEffect } from "react";
import { css } from "linaria";
import Fab from "@material/react-fab";
import MaterialIcon from "@material/react-material-icon";
import IconButton from "@material/react-icon-button";

// local components
import LogoutBtn from "./LogoutBtn";
import ProfileBtn from "./ProfileBtn";

export const menuWrapper = css`
  z-index: 2;
  position: fixed;
  right: 32px;
  top: 32px;
`;

export const button = css`
  padding: 0;
  margin: 0;
  display: inline-block;
  border-radius: 50%;
`;

export const menu = css`
  vertical-align: bottom;
  background-color: red;
  display: var(--preferences-btn-menu-display);
`;

function PreferencesBtn(props) {
  const fabRef = useRef();
  const menuRef = useRef();
  const [status, setStatus] = useState(false);

  const handleClickOutside = event => {
    // Collapse on click outside of the menu
    if (
      fabRef.current &&
      !fabRef.current.contains(event.target) &&
      !menuRef.current.contains(event.target)
    ) {
      setStatus(false);
    }
  };

  const handleMenuClick = () => {
    // Collapse on menu element click
    setStatus(false);
  };

  useEffect(() => {
    if (status) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [status]);

  return (
    <React.Fragment>
      <div className={menuWrapper}>
        <IconButton className={button} onClick={() => setStatus(!status)}>
          <MaterialIcon icon="more_vert" />
        </IconButton>
        <div
          className={menu}
          ref={menuRef}
          style={{
            "--preferences-btn-menu-display": status ? "inline-block" : "none"
          }}
        >
          <ProfileBtn handleMenuClick={handleMenuClick} />
          <LogoutBtn handleMenuClick={handleMenuClick} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PreferencesBtn;
