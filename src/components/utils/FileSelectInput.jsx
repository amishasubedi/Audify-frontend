import React from "react";

const FileSelectInput = ({ icon, onSelect, btnTitle }) => {
  const handleDocumentSelect = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        onSelect(file);
      }
    },
    [onSelect]
  );

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={customStyles.btnContainer}
    >
      <label className="btn btn-secondary" style={customStyles.iconContainer}>
        {icon}
        <input type="file" className="d-none" onChange={handleDocumentSelect} />
      </label>
      {btnTitle && <span style={customStyles.btnTitle}>{btnTitle}</span>}
    </div>
  );
};

export default FileSelectInput;
