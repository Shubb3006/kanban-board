import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { ColumnId, Task } from "../store/useKanBanStore";
import { useKanbanStore } from "../store/useKanBanStore";
import TaskCard from "./Card";
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
  const { addTask } = useKanbanStore();
  const { setNodeRef } = useDroppable({ id: columnId });

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(columnId, newTitle.trim());
    setNewTitle("");
    setIsAdding(false);
  };

  return (
    <div
      ref={setNodeRef}
      className="bg-base-300 rounded-lg p-3 flex flex-col w-55 md:w-60 lg:w-75 max-h-[80vh] "
    >
      {/* Header */}
      <div
        className={`flex justify-between items-center mb-3 p-2 rounded ${COLUMN_STYLES[columnId]} `}
      >
        <h2 className="font-semibold text-sm tracking-wide uppercase">
          {title}
        </h2>
        <button
          className="btn btn-ghost btn-xs"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 pr-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add Task Input */}
      {isAdding && (
        <AddTaskModal
          handleAdd={handleAdd}
          taskTitle={newTitle}
          setTaskTitle={setNewTitle}
          onClose={() => setIsAdding(false)}
        />
      )}
    </div>
  );
};

export default Column;
