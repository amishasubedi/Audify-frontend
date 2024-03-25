import ModalContainer from "./ModalContainer";

const OptionModal = ({ show, options, onHide, renderItem }) => {
  return (
    <ModalContainer show={show} onHide={onHide}>
      {options.map((item, index) => {
        return <div key={index}>{renderItem(item)}</div>;
      })}
    </ModalContainer>
  );
};

export default OptionModal;
