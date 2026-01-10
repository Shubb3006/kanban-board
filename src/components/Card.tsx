// import { useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import type { Task, ColumnId } from "../types/KanBan";
// import { Trash2, GripVertical, Pencil } from "lucide-react";
// import { useKanbanStore } from "../store/useKanBanStore";
// import { useState } from "react";
// import EditTaskModal from "./modals/EditTaskModal";

// interface TaskCardProps {
//   task: Task;
//   columnId: ColumnId;
// }

// const TaskCard = ({ task, columnId }: TaskCardProps) => {
//   const {isDeleting}=useKanbanStore();
//   const { deleteTask, editTask } = useKanbanStore();
//   const [isEditing, setIsEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);

//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: task.id,
//     data: { columnId },
//   });

//   const style = {
//     transform: CSS.Translate.toString(transform),
//   };

//   const handleDelete = () => {

//     deleteTask(columnId, task.id);
//   };

//   const handleEdit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title.trim()) return;
//     editTask(columnId, task.id, title.trim());
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <div
//         ref={setNodeRef}
//         style={style}
//         className="bg-base-100 p-3 mb-2 rounded shadow flex items-start gap-2"
//       >

//         <div
//           {...listeners}
//           {...attributes}
//           className="cursor-grab text-gray-500 pt-1"
//         >
//           <GripVertical size={16} />
//         </div>

//         <p className="flex-1 min-w-0 wrap-break-word whitespace-normal text-sm">
//           {task.title}
//         </p>

//         <div className="flex gap-1 shrink-0">
//           <button
//             className="btn btn-ghost btn-xs"
//             onClick={() => setIsEditing(true)}
//           >
//             <Pencil size={14} />
//           </button>
//           <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
//             <Trash2 size={14} />
//           </button>
//         </div>
//       </div>

//       {isEditing && (
//         <EditTaskModal
//           handleEdit={handleEdit}
//           title={title}
//           setTitle={setTitle}
//           onClose={() => setIsEditing(false)}
//         />
//       )}
//     </>
//   );
// };

// export default TaskCard;
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical, Pencil } from "lucide-react";
import { useKanbanStore } from "../store/useKanBanStore";
import type { Task } from "../store/useKanBanStore";
import { useState } from "react";
import EditTaskModal from "./modals/EditTaskModal";

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
  };

  const handleDelete = () => deleteTask(task.id);

  const handleEdit = () => {
    if (!title.trim()) return;
    editTask(task.id, title.trim());
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-base-100 p-3 rounded shadow flex justify-between items-center"
    >
      <div {...listeners} {...attributes} className="text-gray-500 mr-2">
        <GripVertical size={16} className="cursor-grab" />
      </div>
      <p className="flex-1 text-sm">{task.title}</p>
      <div className="flex gap-1">
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => setIsEditing(true)}
        >
          <Pencil size={14} />
        </button>
        <button className="btn btn-ghost btn-xs" onClick={handleDelete}>
          <Trash2 size={14} />
        </button>
      </div>

      {isEditing && (
        <EditTaskModal
          handleEdit={handleEdit}
          title={title}
          setTitle={setTitle}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default TaskCard;
