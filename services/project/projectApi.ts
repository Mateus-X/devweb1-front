// src/api/projectsApi.js
import { api } from "../api";
import { Project } from "@/types";

export async function createProject(projectData: Project) {
  const response = await api.post("/projects", projectData);
  return response.data;
}

export async function uploadProjectFile(projectId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    `/projects/${projectId}/upload-project-file`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export async function getAllProjects() {
  const response = await api.get("/projects");
  console.log(response.data);
  return response.data;

}


export async function getProjectById(projectId: string) {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
}

export async function updateProject(projectId: string, projectData: Project) {
  const response = await api.patch(`/projects/${projectId}`, projectData);
  return response.data;
}

export async function deleteProject(projectId: string) {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
}
