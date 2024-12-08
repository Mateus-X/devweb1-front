import { Status } from "@/types";

export interface Project {
    id: string;
    imageSrc: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: Status;
}