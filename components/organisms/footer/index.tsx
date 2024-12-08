"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Icon, Owner } from "@/components";

export function Footer() {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <h1>Desenvolvido por:</h1>
      <div className={styles.hotWrap}>
        <Owner
          imgSrc="/assets/pics/fari.png"
          name="Fari"
          githubLink="https://github.com/Mateus-X/"
          linkedinLink="https://www.linkedin.com/in/fabio-arico/"
        />
        <Owner
          imgSrc="/assets/pics/edu.png"
          name="Edugay"
          githubLink="https://github.com/EduKaique/"
          linkedinLink="https://www.linkedin.com/in/eduardo-kaique-alberico/"
        />
      </div>
    </footer>
  );
}
