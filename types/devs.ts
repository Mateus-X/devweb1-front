import { Project, Task } from "@/types";

export interface Developer {
    id: number;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    tasks: Task[];
    projects: Project[];
    comments: Comment[];
}