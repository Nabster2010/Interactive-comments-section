import ReactModal from "react-modal";

const ConfirmModal = ({ modalOpen, closeModal, handleDelete }) => {
  return (
    <ReactModal style={style} isOpen={modalOpen}>
      <div className="">
        <h1 className="text-DarkBlue text-lg font-semibold">Delete Comment</h1>
        <p className="text-GrayishBlue mt-4">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={closeModal}
            className="flex-1 whitespace-nowrap  bg-DarkBlue hover:bg-GrayishBlue transition text-White py-3 px-4 font-semibold text-sm  rounded-lg "
          >
            NO, CANCEL
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 whitespace-nowrap  bg-SoftRed hover:bg-PaleRed transition text-White py-3 px-4 font-semibold  text-sm rounded-lg "
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
const style = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "static",
    marginLeft: "16px",
    marginRight: "16px",
    maxWidth: "350px",
    height: "auto",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    padding: "24px",
  },
};

export default ConfirmModal;
