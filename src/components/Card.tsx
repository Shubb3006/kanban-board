import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { useKanbanStore } from "../store/useKanBanStore";
import type { Task } from "../store/useKanBanStore";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  isDeleting: boolean;
  onRequestDelete: () => void;
  onCancelDelete: () => void;
}

const TaskCard = ({
  task,
  isDeleting,
  onCancelDelete,
  onRequestDelete,
}: TaskCardProps) => {
  const { deleteTask, editTask } = useKanbanStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { columnId: task.columnId },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  const handleEdit = () => {
    if (!title.trim()) return;
    editTask(task.id, title.trim());
    setIsEditing(false);
  };

  let lastTap = 0;

  const handleTextTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      setIsEditing(true);
    }
    lastTap = now;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-base-100 p-3 rounded shadow wrap-break-word flex justify-between items-center"
    >
      {!isEditing && !isDeleting && (
        <div {...listeners} {...attributes} className="text-gray-500 mr-2">
          <GripVertical size={16} className="cursor-grab" />
        </div>
      )}

      {isEditing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEdit();
            if (e.key === "Escape") {
              setTitle(task.title);
              setIsEditing(false);
            }
          }}
          className="flex-1 min-w-0 text-sm bg-transparent border-b border-gray-400 outline-none"
        />
      ) : isDeleting ? (
        <div
          className="flex-1 rounded-md bg-red-50 border border-red-200 p-2"
          onKeyDown={(e) => {
            if (e.key === "Escape") onCancelDelete();
          }}
        >
          <p className="text-sm font-medium text-red-700">Delete this task?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              autoFocus
              className="btn btn-xs btn-error"
              onClick={() => deleteTask(task.id)}
            >
              Yes
            </button>
            <button className="btn btn-xs" onClick={onCancelDelete}>
              No
            </button>
          </div>
        </div>
      ) : (
        <p
          className="flex-1 text-sm break-all cursor-text"
          onDoubleClick={() => setIsEditing(true)}
          onTouchEnd={handleTextTap}
        >
          {task.title}
        </p>
      )}

      {!isDeleting && !isEditing && (
        <div className="flex gap-1">
          <button className="btn btn-ghost btn-xs" onClick={onRequestDelete}>
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
