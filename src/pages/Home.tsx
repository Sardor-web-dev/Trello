import { Column } from "@/components/custom/Column";
import React, { useState } from "react";

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

  const handleTaskDrop = (taskId: string, targetColumn: string) => {
    setTasks((prev) => {
      let taskToMove: Task | undefined;
      const newColumns = { ...prev };

      // Удаляем задачу из старой колонки
      Object.keys(newColumns).forEach((col) => {
        newColumns[col] = newColumns[col].filter((task) => {
          if (task.id === taskId) {
            taskToMove = task;
            return false;
          }
          return true;
        });
      });

      // Добавляем задачу в новую колонку
      if (taskToMove) {
        newColumns[targetColumn] = [...newColumns[targetColumn], taskToMove];
      }

      return newColumns;
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
      <Column title="Todo" tasks={tasks.todo} onTaskDrop={handleTaskDrop} onTaskAdd={handleTaskAdd} columnKey="todo" />
      <Column title="In Progress" tasks={tasks.inProgress} onTaskDrop={handleTaskDrop} onTaskAdd={handleTaskAdd} columnKey="inProgress" />
      <Column title="Done" tasks={tasks.done} onTaskDrop={handleTaskDrop} onTaskAdd={handleTaskAdd} columnKey="done" />
    </section>
  );
};

export default Home;
