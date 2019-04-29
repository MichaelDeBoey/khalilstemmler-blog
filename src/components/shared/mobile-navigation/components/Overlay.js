import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import "../styles/Navbar.sass";

const OverlayLink = ({ path, displayName, toggleBurgerMenu, ext }) => {
  return (
    <div className="mobileNavItem" onClick={toggleBurgerMenu}>
      {ext ? <a href={path}>{displayName}</a> : <Link to={path}>{displayName}</Link>}
    </div>
  );
};

OverlayLink.propTypes = {
  path: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  toggleBurgerMenu: PropTypes.func.isRequired,
  ext: PropTypes.bool
};

const Overlay = props => {
  return (
    <div
      className={
        props.isOpen ? `overlayOpen overlayContainer` : "overlayContainer"
      }
    >
      <OverlayLink
        path={"/"}
        displayName="~"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"/articles"}
        displayName="/articles"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"/about"}
        displayName="/about"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"mailto:khalilstemmler@gmail.com"}
        displayName="/contact"
        ext={true}
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"/portfolio"}
        displayName="/portfolio"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"/resources"}
        displayName="/resources"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
      <OverlayLink
        path={"/wiki"}
        displayName="/wiki"
        toggleBurgerMenu={props.toggleBurgerMenu}
      />
    </div>
  );
};

export default Overlay;
