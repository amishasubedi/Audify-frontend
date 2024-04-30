import React from "react";

const OptionModal = ({ show, options, onHide, onOptionClick }) => {
  const displayStyle = {
    display: show ? "block" : "none",
  };

  return (
    <div className="option-modal" style={displayStyle}>
      {options.map((playlist) => (
        <div
          key={playlist.id}
          className="option-modal-item"
          onClick={() => {
            onOptionClick(playlist.id);
            onHide();
          }}
        >
          {playlist.title}
        </div>
      ))}
    </div>
  );
};

export default OptionModal;
