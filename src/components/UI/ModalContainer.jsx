import { Modal, Button } from "react-bootstrap";
import "./Style.css";

const ModalContainer = ({ show, children, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body
        className="p-4"
        style={{ backgroundColor: "#1E1E1E", color: "white" }}
      >
        {children}
      </Modal.Body>
      <Modal.Footer
        className="justify-content-center"
        style={{ border: "none", backgroundColor: "#1E1E1E" }}
      >
        <Button variant="outline-light" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalContainer;
