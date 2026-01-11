import type { Task } from "../store/useKanBanStore";

const TaskCardPreview = ({ task }: { task: Task }) => {
  return (
    <div className="bg-base-100 p-3 rounded shadow flex items-center gap-2 opacity-90">
      <div className="w-2 h-2 rounded-full bg-gray-400" />
      <p className="text-sm break-all">{task.title}</p>
    </div>
  );
};

export default TaskCardPreview;
