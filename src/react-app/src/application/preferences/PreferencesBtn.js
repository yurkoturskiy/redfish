import React, { useRef, useState, useEffect } from "react";
import { css } from "linaria";
import MaterialIcon from "@material/react-material-icon";
import IconButton from "@material/react-icon-button";

// local components
import LogoutBtn from "./LogoutBtn";
import ProfileBtn from "./ProfileBtn";

export const menuWrapper = css`
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 2;
  position: fixed;
  right: 32px;
  top: 32px;
`;

export const menuBtn = css`
  border-radius: 50%;
`;

export const menu = css`
  position: absolute;
  z-index: 2;
  right: -2px;
  top: -2px;
  display: var(--preferences-btn-menu-display);

  vertical-align: bottom;

  background-color: white;
  border-radius: 4px;
  border: 1px solid lightgrey;
  animation-name: appearance;
  animation-duration: 0.18s;

  @keyframes appearance {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const menuItem = css`
  padding: 12px 16px 12px 16px;
  font-size: 0.875rem;
`;

function PreferencesBtn(props) {
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const [status, setStatus] = useState(false);

  const handleClickOutside = event => {
    // Collapse on click outside of the menu
    if (
      menuBtnRef.current &&
      !menuBtnRef.current.contains(event.target) &&
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
        <div className={menuBtn} ref={menuBtnRef}>
          <IconButton className={menuBtn} onClick={() => setStatus(!status)}>
            <MaterialIcon icon="more_horiz" />
          </IconButton>
        </div>
        <div
          className={menu}
          ref={menuRef}
          style={{
            "--preferences-btn-menu-display": status ? "inherit" : "none"
          }}
        >
          <ProfileBtn handleMenuClick={handleMenuClick} className={menuItem} />
          <LogoutBtn handleMenuClick={handleMenuClick} className={menuItem} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default PreferencesBtn;
