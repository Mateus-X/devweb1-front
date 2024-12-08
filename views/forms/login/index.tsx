"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "@/configs/yup";
import { Button, ControlledInput } from "@/components";
import styles from "./styles.module.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface ApiError extends Error {
  data?: {
    errors?: string[];
  };
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    // Lógica de login
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <ControlledInput
        name="email"
        control={control}
        label="Email"
        errorMessage={errors.email?.message}
      />
      <ControlledInput
        name="password"
        control={control}
        label="Senha"
        type="password"
        errorMessage={errors.password?.message}
      />
      <Button.Root type="submit">Entrar</Button.Root>
    </form>
  );
}
