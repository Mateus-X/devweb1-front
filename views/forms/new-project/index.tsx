"use client";
import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/configs/yup";
import {
  Button,
  ControlledDatePickerInput,
  ControlledFileInput,
  ControlledInput,
  ControlledSelectInput,
} from "@/components";
import styles from "./styles.module.css";
import toast from "react-hot-toast";
import { createProject, updateProject, uploadProjectFile } from "@/services";
import { Project, Status } from "@/types";

interface FieldValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status?: string;
  imageSrc?: File;
}

interface ApiError extends Error {
  data?: {
    errors?: string[];
  };
}

const schemaToCreate = yup.object().shape({
  name: yup.string().max(255).label("Título").required("O título é obrigatório."),
  description: yup.string().max(1000).label("Descrição").required("A descrição é obrigatória."),
  startDate: yup.string().label("Data Inicial").required("A data inicial é obrigatória."),
  endDate: yup
    .string()
    .label("Data Final")
    .required("A data final é obrigatória.")
    .test(
      "is-after-initial-date",
      "A data final não pode ser anterior à data inicial.",
      function (value) {
        const { startDate } = this.parent;
        if (!startDate || !value) return true;
        return new Date(value) >= new Date(startDate);
      }
    ),
  status: yup.string().max(255).label("Status"),
  imageSrc: yup
    .mixed<File>()
    .test("fileType", "Formato de arquivo inválido", (value) => {
      if (!value) return true;
      return value instanceof File;
    })
    .label("Foto do projeto"),
});

export function NewProjectForm({ userData }: { userData?: Project }) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isFullRegistered, setisFullRegistered] = useState(false);
  const isUpdateMode = !!userData;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "",
    },
    resolver: yupResolver(schemaToCreate),
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        description: userData.description,
        startDate: userData.startDate,
        endDate: userData.endDate,
        status: userData.status,
      });
    }
  }, [userData, reset]);

  async function onSubmit(data: FieldValues) {
    setIsSubmittingForm(true);
    const formattedData = {
      ...data,
      startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
    };

    try {
      let project;
      if (userData) {
        project = await updateProject(userData.id, formattedData as Project);
        toast.success("Projeto atualizado com sucesso!");
      } else {
        project = await createProject(formattedData as Project);
        toast.success("Projeto criado com sucesso!");
      }

      if (data.imageSrc && project.id) {
        await uploadProjectFile(project.id, data.imageSrc);
        toast.success("Arquivo enviado com sucesso!");
      }

      setisFullRegistered(true);
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message);
    } finally {
      setIsSubmittingForm(false);
    }
  }

  return (
    <form
      className={styles.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      id={"registration-data-form"}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div className={styles.projectData}>
        <div className={styles.line}>
          <ControlledInput<FieldValues>
            label="Título"
            name="name"
            placeholder="Insira o título do projeto"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.name?.message}
          />
        </div>
        <div className={styles.line}>
          <ControlledInput<FieldValues>
            label="Descrição"
            name="description"
            placeholder="Insira a descrição do projeto"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.description?.message}
          />
        </div>
        <div className={styles.line}>
          <ControlledDatePickerInput<FieldValues>
            label="Data Inicial"
            name="startDate"
            placeholder="__/__/____"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.startDate?.message}
          />
          <ControlledDatePickerInput<FieldValues>
            label="Data Final"
            name="endDate"
            placeholder="__/__/____"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.endDate?.message}
          />
        </div>
        <div className={styles.line}>
          <ControlledSelectInput<FieldValues>
            label="Status"
            name="status"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.status?.message}
            options={[
              { label: "Backlog", value: Status.BACKLOG },
              { label: "À Fazer", value: Status.TODO },
              { label: "Fazendo", value: Status.ON_PROCESS },
              { label: "Terminado", value: Status.DONE },
            ]}
          />
        </div>
        <div className={styles.line}>
          <ControlledFileInput<FieldValues>
            label="Foto do projeto"
            name="imageSrc"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.imageSrc?.message}
          />
        </div>
      </div>
      <div className={styles.buttonLine}>
        <Button.Root
          type="submit"
          variant="secondary"
          disabled={isSubmittingForm}
        >
          {isUpdateMode ? "Atualizar" : "Enviar"}
        </Button.Root>
      </div>
    </form>
  );
}