import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { useKanbanStore } from "../store/useKanBanStore";
import type { Task } from "../store/useKanBanStore";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
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

  const handleDelete = () => deleteTask(task.id);

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
      <div {...listeners} {...attributes} className="text-gray-500 mr-2">
        <GripVertical size={16} className="cursor-grab" />
      </div>
      {/* <p
        className="flex-1 text-sm break-all"
        onTouchEnd={handleTextTap}
        onDoubleClick={() => setIsEditing(true)}
      >
        {task.title}
      </p> */}

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
          className="flex-1 text-sm bg-transparent border-b border-gray-400 outline-none"
        />
      ) : (
        <p
          className="flex-1 text-sm break-all cursor-text"
          onDoubleClick={() => setIsEditing(true)} // desktop
          onTouchEnd={handleTextTap} // mobile
        >
          {task.title}
        </p>
      )}

      <div className="flex gap-1">
        {/* <button
          className="btn btn-ghost btn-xs"
          onClick={() => setIsEditing(true)}
        >
          <Pencil size={14} />
        </button> */}
        <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
          <Trash2 size={14} />
        </button>
      </div>

      {/* {isEditing && (
        <EditTaskModal
          handleEdit={handleEdit}
          title={title}
          setTitle={setTitle}
          onClose={() => setIsEditing(false)}
        />
      )} */}
    </div>
  );
};

export default TaskCard;
