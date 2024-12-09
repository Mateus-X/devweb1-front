"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import styles from "./styles.module.css";
import { Button, Icon, ProjectCard } from "@/components";
import { Sidebar } from "@/components";
import { Modal } from "@/components";
import { NewProjectForm } from "@/views";
import { Project } from "@/types";
import { getAllProjects } from "@/services";

export function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section className={styles.projects}>
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Projetos</h1>
            <div className={styles.buttonWrap}>
              <Button.Root onClick={toggleModal} variant="cruder">
                Novo Projeto
              </Button.Root>
            </div>
          </div>
          <div className={styles.wrap}>
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  startDate={project.startDate}
                  endDate={project.endDate}
                  status={project.status}
                />
              ))
            ) : (
              <p>Sem Projetos Cadastrados</p>
            )}
          </div>
        </div>
      </section>
      {modalOpen && (
        <Modal.Root onClick={toggleModal}>
          <Modal.Header title="Adicionar projeto" onClick={toggleModal} />
          <Modal.Body>
            <NewProjectForm />
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}
