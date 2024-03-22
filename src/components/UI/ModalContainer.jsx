import { Button, Modal } from "react-bootstrap";
import "./Style.css";

const ModalContainer = ({ show, children, onRequestClose }) => {
  return (
    <Modal show={show} onHide={onRequestClose} centered>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalContainer;
