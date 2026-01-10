import React from "react";

interface AddTaskModalProps {
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}
const AddTaskModal = ({
  handleAdd,
  taskTitle,
  setTaskTitle,
  onClose,
}:AddTaskModalProps) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md w-full">
        <form onSubmit={handleAdd} className="card-body gap-4" action="">
          <h2 className="text-2xl font-bold text-center text-primary">
            Add Task
          </h2>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="input input-bordered w-full"
          />
          <div className=" modal-action">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <button
              className="btn btn-ghost"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
