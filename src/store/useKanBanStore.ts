// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type { TasksState, ColumnId } from "../types/KanBan";

// interface KanbanStore {
//     tasks: TasksState;
//     isAdding: boolean;
//     isEditing: boolean;
//     isDeleting: boolean;
//     moveTask: (taskId: string, fromColumn: ColumnId, toColumn: ColumnId) => void;
//     addTask: (columnId: ColumnId, title: string) => void;
//     deleteTask: (columnId: ColumnId, taskId: string) => void;
//     editTask: (columnId: ColumnId, taskId: string,newTitle:string) => void;
// }

// export const useKanbanStore = create<KanbanStore>()(
//   persist(
//     (set) => ({
//       isAdding:false,
//       isEditing:false,
//       isDeleting:false,

//       tasks: {
//         todo: [
//           { id: "1", title: "Learn React" },
//           { id: "2", title: "Build Kanban Board" }
//         ],
//         inProgress: [{ id: "3", title: "Practice DSA" }],
//         done: []
//       },

//       moveTask: (taskId, fromColumn, toColumn) =>
//         set((state) => {
//           const source = [...state.tasks[fromColumn]];
//           const destination = [...state.tasks[toColumn]];

//           const index = source.findIndex((t) => t.id === taskId);
//           if (index === -1) return state;

//           const [task] = source.splice(index, 1);
//           destination.push(task);

//           return {
//             tasks: {
//               ...state.tasks,
//               [fromColumn]: source,
//               [toColumn]: destination
//             }
//           };
//         }),

//         addTask: (columnId, title) =>
//         set((state) => {
//           set({isAdding:true})
//           const newTask = {
//             id: Date.now().toString(),
//             title:title.trim()
//           };
//           return {
//             tasks: {
//               ...state.tasks,
//               [columnId]: [...state.tasks[columnId], newTask]
//             }
//           };
//         }),

//         deleteTask: (columnId, taskId) =>
//         set((state) => ({
//           tasks: {
//             ...state.tasks,
//             [columnId]: state.tasks[columnId].filter(
//               (task) => task.id !== taskId
//             ),
//           },
//         })),

//         editTask: (columnId, taskId, newTitle) =>
//         set((state) => ({
//           tasks: {
//             ...state.tasks,
//             [columnId]: state.tasks[columnId].map((task) =>
//               task.id === taskId
//                 ? { ...task, title: newTitle }
//                 : task
//             ),
//           },
//         })),
//     }),
//     {
//       name: "kanban-storage",
      
//     }
//   )
// );


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
