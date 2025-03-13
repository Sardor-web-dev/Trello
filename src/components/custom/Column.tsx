import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import { TaskCard } from "./Task";
import { Input } from "@/components/ui/input";

interface Task {
  id: string;
  title: string;
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskDrop: (taskId: string, column: string) => void;
  onTaskAdd: (column: string, title: string) => void;
  columnKey: string;
}

export const Column: React.FC<ColumnProps> = ({ title, tasks, onTaskDrop, onTaskAdd, columnKey }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onTaskAdd(columnKey, newTask.trim());
      setNewTask("");
    }
  };

  return (
    <Card
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
          onTaskDrop(taskId, columnKey);
        }
      }}
      className="w-[350px] flex flex-col bg-gray-100 shadow-md rounded-2xl overflow-hidden"
    >
      <div className="p-4 bg-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        </div>
      </ScrollArea>
      <div className="p-4 bg-gray-200 flex flex-col space-y-2">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Создайте свою задачу..." />
        <Button onClick={handleAddTask} variant="outline">
          Добавить задачу
        </Button>
      </div>
    </Card>
  );
};
