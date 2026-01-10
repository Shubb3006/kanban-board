import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColumnId = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
  columnId: ColumnId;
}

interface KanbanStore {
  tasks: Task[];
  addTask: (columnId: ColumnId, title: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, title: string) => void;
  moveTask: (taskId: string, columnId: ColumnId) => void;
}

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
      tasks: [
        { id: "1", title: "Learn React", columnId: "todo" },
        { id: "2", title: "Build Kanban Board", columnId: "todo" },
        { id: "3", title: "Practice DSA", columnId: "inProgress" },
      ],

      addTask: (columnId, title) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now().toString(), title, columnId }],
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      editTask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, title } : t)),
        })),

      moveTask: (taskId, columnId) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, columnId } : t)),
        })),
    }),
    { name: "kanban-storage" }
  )
);
