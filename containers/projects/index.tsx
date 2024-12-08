"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { Button, Icon, ProjectCard } from "@/components";
import { Sidebar } from "@/components";
import { useState } from "react";

export function ProjectsPage() {
  
  const project = {
    imageSrc: "/assets/pics/fari.png",
    title: "Project Title",
    description: "This is a description of the project.",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  };

  return (
    <section className={styles.projects}>
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Testando</h1>
          <div className={styles.buttonWrap}><Button.Root>asda</Button.Root></div>
        </div>
        <div className={styles.wrap}>
          <ProjectCard
            imageSrc={project.imageSrc}
            title={project.title}
            description={project.description}
            startDate={project.startDate}
            endDate={project.endDate}
          />
          {/* TODO COLOCAR UM MAP AQUI PRA PODER MAPEAR OS PROJECTS */}
        </div>
      </div>
    </section>
  );
}