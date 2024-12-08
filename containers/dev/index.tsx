import { Button, DevCard, Sidebar } from "@/components";
import styles from "./styles.module.css";

export function DevsPage() {
  const dev = {
    imageSrc: "/assets/pics/fari.png",
    name: "Project Title",
  };

  return (
    <section className={styles.projects}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Testando</h1>
          <div className={styles.buttonWrap}>
            <Button.Root variant="cruder">Novo Dev</Button.Root>
          </div>
        </div>
        <div className={styles.wrap}>
          <DevCard
            imageSrc={dev.imageSrc}
            name={dev.name}
          />
          {/* TODO COLOCAR UM MAP AQUI PRA PODER MAPEAR OS devs */}
        </div>
      </div>
    </section>
  );
}
