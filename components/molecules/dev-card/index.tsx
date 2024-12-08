import Image from "next/image";
import styles from "./styles.module.css";

export function DevCard() {
    return (
        <div className={styles.card}>
            <Image 
             src="/assets/pics/fari.png"
             alt="fari"
             width={100}
             height={100}/>
            <p>nome</p>
        </div>
    );
}