"use client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { api } from "@/services/api";
import styles from "./styles.module.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export function LoginForm() {
  const router = useRouter();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setIsSubmittingForm(true);
      const response = await api.post('/auth/login', data);
      const { token } = response.data;

      localStorage.setItem('token', token);

      router.push('/projetos');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...control.register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          {...control.register("password")}
        />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>
      <button type="submit" disabled={isSubmittingForm}>
        {isSubmittingForm ? "Enviando..." : "Entrar"}
      </button>
    </form>
  );
}