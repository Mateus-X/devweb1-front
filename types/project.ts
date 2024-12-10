import { Status } from "@/types";
import { string } from "yup";

export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: Status;
}