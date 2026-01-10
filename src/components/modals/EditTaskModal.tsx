import React from "react";

interface EditTaskModalProps {
  handleEdit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

const EditTaskModal = ({
  handleEdit,
  title,
  setTitle,
  onClose,
}: EditTaskModalProps) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <form onSubmit={handleEdit} className="card-body gap-4">
          <h2 className="text-xl font-bold text-center text-primary">
            Edit Task
          </h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />

          <div className="modal-action">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
