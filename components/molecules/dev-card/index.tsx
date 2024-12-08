import Image from "next/image";
import styles from "./styles.module.css";

interface DevCardProps {
    imageSrc: string;
    name: string;
}

export function DevCard({ imageSrc, name }: DevCardProps) {
    return (
        <div className={styles.card}>
            <Image 
             src={imageSrc}
             alt="dev"
             className={styles.image}	
             width={70}
             height={70}/>
            <p>{name}</p>
        </div>
    );
}