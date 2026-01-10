export type ColumnId = "todo" | "inProgress" | "done";

export interface Task {
  id: string;
  title: string;
}

export type TasksState = Record<ColumnId, Task[]>;
