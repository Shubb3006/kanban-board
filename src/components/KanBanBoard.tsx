import { DndContext, closestCorners } from "@dnd-kit/core";
import Column from "./Column";
import { useKanbanStore } from "../store/useKanBanStore";

const KanbanBoard = () => {
  const { tasks, moveTask } = useKanbanStore();

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = active.data.current.columnId;
    const toColumn = over.data.current.columnId;

    if (fromColumn === toColumn) return;

    moveTask(active.id, fromColumn, toColumn);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 flex-col sm:flex-row justify-center">
        <Column title="Todo" columnId="todo" tasks={tasks.todo} />
        <Column
          title="In Progress"
          columnId="inProgress"
          tasks={tasks.inProgress}
        />
        <Column title="Done" columnId="done" tasks={tasks.done} />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
