"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, ProjectCard, Sidebar } from "@/components";
import { getAllProjects } from "@/services";
import { Project } from "@/types";
import { NewProjectForm } from "@/views/forms/new-project";
import styles from "./styles.module.css";

export function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

  const updateForm = (project: Project) => {
    setIsUpdateMode(true);
    setSelectedProject(project);
    setModalOpen(true);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (!modalOpen) {
      setIsUpdateMode(false);
      setSelectedProject(undefined);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response);
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
                <div className={styles.cardWrap} key={project.id}>
                  <Button.Root variant="mini" onClick={() => updateForm(project)}>Editar</Button.Root>
                  <ProjectCard
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    startDate={project.startDate}
                    endDate={project.endDate}
                    status={project.status}
                  />
                </div>
              ))
            ) : (
              <p>Sem Projetos Cadastrados</p>
            )}
          </div>
        </div>
      </section>
      {modalOpen && (
        <Modal.Root onClick={toggleModal}>
          <Modal.Header title={isUpdateMode ? "Atualizar projeto" : "Adicionar projeto"} onClick={toggleModal} />
          <Modal.Body>
            <NewProjectForm userData={isUpdateMode ? selectedProject : undefined} />
          </Modal.Body>
        </Modal.Root>
      )}
    </>
  );
}