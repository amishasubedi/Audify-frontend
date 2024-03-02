import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className = "" }) => {
  const classes = `bg-dark rounded h-auto w-100 ${className}`;
  return <div className={classes}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
