import React from "react";

const OptionModal = ({
  show,
  options,
  onHide,
  onOptionClick,
  renderOption,
}) => {
  const displayStyle = {
    display: show ? "block" : "none",
  };

  return (
    <div className="option-modal" style={displayStyle}>
      {options.map((option, index) => (
        <div
          key={index}
          className="option-modal-item"
          onClick={() => {
            onOptionClick(index);
            onHide();
          }}
        >
          {renderOption(option)}
        </div>
      ))}
    </div>
  );
};

export default OptionModal;
