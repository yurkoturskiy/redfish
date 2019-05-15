import React, { useRef, useState, useEffect } from "react";
import { css } from "linaria";
import icon from "../../../static/icon.svg";
import Fab from "@material/react-fab";
import MaterialIcon from "@material/react-material-icon";
// local components
import Logout from "./Logout";
import ProfileBtn from "./ProfileBtn";

export const menuWrapper = css`
  z-index: 2;
  position: fixed;
  bottom: 32px;
  left: 32px;
`;

export const fabWrapper = css`
  padding: 0;
  margin: 0;
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 40px;
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
        <div className={fabWrapper} ref={fabRef}>
          <Fab
            mini
            onClick={() => setStatus(!status)}
            icon={<MaterialIcon icon="settings" />}
          />
        </div>
        <div
          className={menu}
          ref={menuRef}
          style={{
            "--preferences-btn-menu-display": status ? "inline-block" : "none"
          }}
        >
          <ProfileBtn handleMenuClick={handleMenuClick} />
          <Logout handleMenuClick={handleMenuClick} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PreferencesBtn;
