"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/configs/yup";
import {
  Button,
  ControlledDatePickerInput,
  ControlledInput,
} from "@/components";
import styles from "./styles.module.css";
import toast from "react-hot-toast";

interface FieldValues {
  title?: string;
  description?: string;
  initial_date: string;
  final_date: string;
  status?: string;
  image?: string;
}

interface ApiError extends Error {
  data?: {
    errors?: string[];
  };
}

const schemaToCreate = yup.object().shape({
    title: yup.string().max(255).label("Título"),
    description: yup.string().max(1000).label("Descrição"),
    initial_date: yup
      .string()
      .label("Data Inicial")
      .required("A data inicial é obrigatória."),
    final_date: yup
      .string()
      .label("Data Final")
      .required("A data final é obrigatória.")
      .test(
        "is-after-initial-date",
        "A data final não pode ser anterior à data inicial.",
        function (value) {
          const { initial_date } = this.parent; // Acessa a data inicial
          if (!initial_date || !value) return true; // Permite validação para campos vazios
          return new Date(value) >= new Date(initial_date); // Verifica a relação entre as datas
        }
      ),
    status: yup.string().max(255).label("Status"),
    image: yup.string().url().label("Imagem"),
  });
  

export function NewProjectForm(userData: any) {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [isFullRegistered, setisFullRegistered] = useState(false);

  const defaultValues: FieldValues = {
    title: userData.title,
    description: userData.description,
    initial_date: userData.initial_date,
    final_date: userData.final_date,
    status: userData.status,
    image: userData.image,
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaToCreate),
  });

  function onSubmit() {
    setisFullRegistered(true);
    toast.success("Cadastro completo!");
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
            name="title"
            placeholder="Insira o título do projeto"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.title?.message}
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
            name="initial_date"
            placeholder="__/__/____"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.initial_date?.message}
          />
          <ControlledDatePickerInput<FieldValues>
            label="Data Final"
            name="final_date"
            placeholder="__/__/____"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.final_date?.message}
          />
        </div>
        <div className={styles.line}>
          <ControlledInput<FieldValues>
            label="Status"
            name="status"
            placeholder="Insira o status do projeto"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.status?.message}
          />
        </div>
        <div className={styles.line}>
          <ControlledInput<FieldValues>
            label="Imagem"
            name="image"
            placeholder="Insira a URL da imagem"
            control={control}
            disabled={isSubmitting}
            errorMessage={errors.image?.message}
          />
        </div>
      </div>
      <div className={styles.buttonLine}>
        <Button.Root
          type="submit"
          variant="secondary"
          disabled={isSubmittingForm}
        >
          Enviar
        </Button.Root>
      </div>
    </form>
  );
}
