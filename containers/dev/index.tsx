"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Button, DevCard, Sidebar } from "@/components";
import styles from "./styles.module.css";
import { Developer } from "@/types";
import toast from "react-hot-toast";
import { getAllProjects } from "@/services";
// import {}

export function DevsPage() {
  const [devs, setDevs] = useState<Developer[]>([]);

  const fetchDevs = async () => {
    try {
      const response = await getAllProjects();
      setDevs(response.data);
    } catch (error) {
      toast.error(`Erro ao buscar devs: ${error}`);
    }
  };

  useEffect(() => {
    fetchDevs();
  }, []);

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
          {devs.length > 0 ? (
            devs.map((dev) => (
              <DevCard
                key={dev.id}
                imageSrc={dev.imageSrc}
                name={dev.name}
              />
            ))
          ) : (
            <p>Sem Devs Cadastrados</p>
          )}
        </div>
      </div>
    </section>
  );
}
