// import { DndContext, closestCorners } from "@dnd-kit/core";
// import Column from "./Column";
// import { useKanbanStore } from "../store/useKanBanStore";

// const KanbanBoard = () => {
//   const { tasks, moveTask } = useKanbanStore();

//   const handleDragEnd = (event: any) => {
//     const { active, over } = event;
//     if (!over) return;

//     const fromColumn = active.data.current.columnId;
//     const toColumn = over.data.current.columnId;

//     if (fromColumn === toColumn) return;

//     moveTask(active.id, fromColumn, toColumn);
//   };

//   return (
//     <DndContext
//       collisionDetection={closestCorners}
//       onDragEnd={handleDragEnd}
//     >
//       <div className="flex gap-4 p-4 flex-col sm:flex-row justify-center">
//         <Column title="Todo" columnId="todo" tasks={tasks.todo} />
//         <Column
//           title="In Progress"
//           columnId="inProgress"
//           tasks={tasks.inProgress}
//         />
//         <Column title="Done" columnId="done" tasks={tasks.done} />
//       </div>
//     </DndContext>
//   );
// };

// export default KanbanBoard;
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";
import TaskCard from "./Card";
import{  useKanbanStore, type Task } from "../store/useKanBanStore";


const KanbanBoard = () => {
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
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 justify-center">
        <Column title="Todo" columnId="todo" tasks={todoTasks} />
        <Column title="In Progress" columnId="inProgress" tasks={inProgressTasks} />
        <Column title="Done" columnId="done" tasks={doneTasks} />
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
