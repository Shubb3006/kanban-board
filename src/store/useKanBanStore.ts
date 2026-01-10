import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TasksState, ColumnId } from "../types/KanBan";

interface KanbanStore {
    tasks: TasksState;
    moveTask: (taskId: string, fromColumn: ColumnId, toColumn: ColumnId) => void;
    addTask: (columnId: ColumnId, title: string) => void;
    deleteTask: (columnId: ColumnId, taskId: string) => void;
    editTask: (columnId: ColumnId, taskId: string,newTitle:string) => void;
}

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      tasks: {
        todo: [
          { id: "1", title: "Learn React" },
          { id: "2", title: "Build Kanban Board" }
        ],
        inProgress: [{ id: "3", title: "Practice DSA" }],
        done: []
      },

      moveTask: (taskId, fromColumn, toColumn) =>
        set((state) => {
          const source = [...state.tasks[fromColumn]];
          const destination = [...state.tasks[toColumn]];

          const index = source.findIndex((t) => t.id === taskId);
          if (index === -1) return state;

          const [task] = source.splice(index, 1);
          destination.push(task);

          return {
            tasks: {
              ...state.tasks,
              [fromColumn]: source,
              [toColumn]: destination
            }
          };
        }),

        addTask: (columnId, title) =>
        set((state) => {
          const newTask = {
            id: Date.now().toString(),
            title:title.trim()
          };
          return {
            tasks: {
              ...state.tasks,
              [columnId]: [...state.tasks[columnId], newTask]
            }
          };
        }),

        deleteTask: (columnId, taskId) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [columnId]: state.tasks[columnId].filter(
              (task) => task.id !== taskId
            ),
          },
        })),

        editTask: (columnId, taskId, newTitle) =>
        set((state) => ({
          tasks: {
            ...state.tasks,
            [columnId]: state.tasks[columnId].map((task) =>
              task.id === taskId
                ? { ...task, title: newTitle }
                : task
            ),
          },
        })),
    }),
    {
      name: "kanban-storage",
      
    }
  )
);
