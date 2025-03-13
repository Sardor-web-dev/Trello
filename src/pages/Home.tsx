import { Column } from "@/components/custom/Column";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<{ [key: string]: Task[] }>({
    todo: [],
    inProgress: [],
    done: [],
  });

  const TaskDrop = (taskId: string, targetColumn: string) => {
	setTasks((prev) => {
	  let taskToMove: Task | undefined;
	  for (const col in prev) {
		const index = prev[col].findIndex((task) => task.id === taskId);
		if (index !== -1) {
		  taskToMove = prev[col][index];
		  prev[col].splice(index, 1);
		  break;
		}
	  }
	  return taskToMove
		? { ...prev, [targetColumn]: [...prev[targetColumn], taskToMove] }
		: prev;
	});
  };

  const handleTaskAdd = (columnKey: string, title: string) => {
    setTasks((prev) => ({
      ...prev,
      [columnKey]: [...prev[columnKey], { id: Date.now().toString(), title }],
    }));
  };

  return (
    <section className="flex items-start justify-start gap-6">
      <Column title="Todo" tasks={tasks.todo} onTaskDrop={TaskDrop} onTaskAdd={handleTaskAdd} columnKey="todo" />
      <Column title="In Progress" tasks={tasks.inProgress} onTaskDrop={TaskDrop} onTaskAdd={handleTaskAdd} columnKey="inProgress" />
      <Column title="Done" tasks={tasks.done} onTaskDrop={TaskDrop} onTaskAdd={handleTaskAdd} columnKey="done" />
    </section>
  );
};

export default Home;
