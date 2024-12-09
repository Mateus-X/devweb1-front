import Image from "next/image";
import styles from "./styles.module.css";
import { Project } from "@/types";

export function ProjectCard({ id, title, description, startDate, endDate, status }: Project) {
    return (
        <div className={styles.card} key={id}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={styles.timeWrap}>
                <p>{startDate}</p>
                <p>{endDate}</p>
            </div>
            <p>{status}</p> 
            {/* TODO */}
        </div>
    );
}