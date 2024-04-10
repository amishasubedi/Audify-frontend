import ModalContainer from "../UI/ModalContainer";

const DeleteModal = ({ visible, onRequestClose, onConfirmDelete }) => {
  const handleClose = () => {
    onRequestClose();
  };

  return (
    <ModalContainer show={visible} onHide={handleClose}>
      <div className="py-5 px-4 text-center">
        <div className="text-white mb-4">Delete Playlist</div>

        <div className="text-white mb-5">
          Are you sure you want to delete the playlist ?
        </div>

        <button className="btn btn-danger me-2" onClick={onConfirmDelete}>
          Yes
        </button>

        <button className="btn btn-secondary" onClick={handleClose}>
          No
        </button>
      </div>
    </ModalContainer>
  );
};

export default DeleteModal;
