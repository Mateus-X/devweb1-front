"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { Project } from "@/types";
import { Button, Modal } from "@/components";
import { useRouter } from "next/navigation";
import { deleteProject, updateProject } from "@/services";
import toast from "react-hot-toast";
import { useState } from "react";
import { NewProjectForm } from "@/views";

export function ProjectCard({
  id,
  name,
  description,
  startDate,
  endDate,
  status,
}: Project) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    const updatedProject = {
      id,
      name,
      description,
      startDate,
      endDate,
      status,
    };
    try {
      await updateProject(id, updatedProject);
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <>
      <div className={styles.card} key={id}>
        <h1>{name}</h1>
        <p>{description}</p>
        <div className={styles.timeWrap}>
          <p>{startDate}</p>
          <p>{endDate}</p>
        </div>
        <p>{status}</p>
        <Button.Root
          variant="cruder"
          onClick={() =>
            toast((t) => (
              <span>
                Tem certeza que deseja deletar?
                <Button.Root
                  variant="secondary"
                  onClick={async () => {
                    await handleDelete();
                    toast.dismiss(t.id);
                  }}
                >
                  Sim
                </Button.Root>
                <Button.Root
                  variant="primary"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Não
                </Button.Root>
              </span>
            ))
          }
        >
          Deletar
        </Button.Root>
      </div>
    </>
  );
}
