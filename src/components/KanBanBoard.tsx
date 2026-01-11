import {
  DndContext,
  closestCorners,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import { useKanbanStore, type Task } from "../store/useKanBanStore";
import TaskCardPreview from "./TaskCardPreview";

const KanbanBoard = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const { tasks, moveTask } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (event: any) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id) || null;
    setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) {
      setActiveTask(null);
      return;
    }

    const toColumn = over.id as "todo" | "inProgress" | "done";
    moveTask(active.id, toColumn);
    setActiveTask(null);
  };

  const todoTasks = tasks.filter((t) => t.columnId === "todo");
  const inProgressTasks = tasks.filter((t) => t.columnId === "inProgress");
  const doneTasks = tasks.filter((t) => t.columnId === "done");

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 justify-center">
        {/* Columns */}
        <Column title="Todo" columnId="todo" tasks={todoTasks} />
        <Column
          title="In Progress"
          columnId="inProgress"
          tasks={inProgressTasks}
        />
        <Column title="Done" columnId="done" tasks={doneTasks} />
      </div>

      <DragOverlay>
        {activeTask && <TaskCardPreview task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
