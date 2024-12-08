import Image from "next/image";
import styles from "./styles.module.css";

interface ProjectCardProps {
    imageSrc: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
}

export function ProjectCard({ imageSrc, title, description, startDate, endDate }: ProjectCardProps) {
    return (
        <div className={styles.card}>
            <Image 
             src={imageSrc}
             className={styles.image}
             alt={"proj"}
             width={375}
             height={150}/>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className={styles.timeWrap}>
                <p>{startDate}</p>
                <p>{endDate}</p>
            </div>
            <p>tag</p> 
            {/* TODO */}
        </div>
    );
}