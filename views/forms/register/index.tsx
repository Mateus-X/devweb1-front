"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/configs/yup";
import { Button, ControlledInput, ControlledPasswordInput } from "@/components";
import { api } from "@/services/api";
import styles from "./styles.module.css";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], "As senhas devem coincidir").required("Confirmação de senha é obrigatória"),

});

export function RegisterForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      setIsSubmittingForm(true);
      const response = await api.post("/auth/register", data);
      const { token } = response.data;

      localStorage.setItem("token", token);

      router.push("/projetos");
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <ControlledInput
        name="name"
        control={control}
        label="Nome"
        errorMessage={errors.name?.message}
      />
      <ControlledInput
        name="email"
        control={control}
        label="Email"
        errorMessage={errors.email?.message}
      />
      <ControlledPasswordInput
        name="password"
        control={control}
        label="Senha"
        errorMessage={errors.password?.message}
      />
      <ControlledPasswordInput
        name="confirmPassword"
        control={control}
        label="Confirme a Senha"
        errorMessage={errors.confirmPassword?.message}
      />
      <Button.Root type="submit" disabled={isSubmittingForm}>
        {isSubmittingForm ? "Enviando..." : "Cadastrar"}
      </Button.Root>
    </form>
  );
}
