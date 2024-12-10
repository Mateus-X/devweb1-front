import { Task, Developer } from "@/types";

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    taskId: number;
    developerId: number;
    task: Task;
    developer: Developer;
}
  