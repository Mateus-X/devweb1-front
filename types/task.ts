import { Project, Developer, Status } from "@/types";

export interface Task {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    status: Status;
    dueDate?: Date;
    projectId: number;
    comments: Comment[];
    project: Project;
    developers: Developer[];
}
