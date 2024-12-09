"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components";
import styles from "./styles.module.css";
import Image from "next/image";

export function HomePage() {
  const router = useRouter();
  return (
    <section className={styles.home}>
      <div className={styles.infoWrap}>
        <h1>Sistema de Gerenciamento de Projetos</h1>
        <p>
          Gerencie seus projetos com facilidade! Organize tarefas, acompanhe o
          progresso e alcance seus objetivos com eficiência em um só lugar.
        </p>
        <div className={styles.buttonWrap}>
            <Button.Root variant="primary" onClick={() => router.push("/cadastro")} >Comece Agora</Button.Root>
            <Button.Root variant="secondary">Saiba mais</Button.Root>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src="/assets/images/collection.svg"
          alt="Imagem de um computador com gráficos"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
}
