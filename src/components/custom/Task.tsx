import { GripVertical } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [className, setClassName] = useState("");

  return (
    <Card
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        setClassName("bg-red-500")
        setTimeout(() => setClassName("hidden"), 0);
      }}
      onDragEnd={() => setClassName("flex")}
      className={cn("bg-white shadow-sm flex items-center p-3 gap-3", className)}
    >
      <GripVertical className="text-gray-400" size={16} />
      <CardContent className="p-0 flex-1">{task.title}</CardContent>
    </Card>
  );
};
