import { useDroppable } from "@dnd-kit/core";
import type { Task, ColumnId } from "../types/KanBan";
import TaskCard from "./Card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useKanbanStore } from "../store/useKanBanStore";
import AddTaskModal from "./modals/AddTaskModal";

const COLUMN_STYLES: Record<ColumnId, string> = {
  todo: "bg-blue-100 text-blue-700",
  inProgress: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

interface ColumnProps {
  title: string;
  columnId: ColumnId;
  tasks: Task[];
}

const Column = ({ title, columnId, tasks }: ColumnProps) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const { addTask } = useKanbanStore();

  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { columnId },
  });

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask(columnId, taskTitle.trim());
    setTaskTitle("");
    setIsAddingTask(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="
       border
        rounded-lg 
        min-h-90
        flex 
        flex-col
        w-75 
      "
    >
      {/* Header */}
      <div
        className={`
    flex items-center justify-between 
    mb-3 p-3 rounded
    ${COLUMN_STYLES[columnId]}
  `}
      >
        <h2 className="font-semibold text-sm tracking-wide uppercase">
          {title}
        </h2>

        <button
          className="btn btn-ghost btn-xs bg-base-100"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus size={16} />
        </button>
      </div>

      
      <div className="flex-1 space-y-2 pr-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={columnId} />
        ))}
      </div>

      {isAddingTask && (
        <AddTaskModal
          handleAdd={handleAdd}
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          onClose={() => setIsAddingTask(false)}
        />
      )}
    </div>
  );
};

export default Column;
