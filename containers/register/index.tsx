"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components";
import styles from "./styles.module.css";
import Image from "next/image";
import { RegisterForm } from "@/views";

export function RegisterPage() {
    
    return (
        <section className={styles.register}>
            <div className={styles.formContainer}>
                <h1>Cadastro</h1>
                <p>Preencha as informações para criar uma conta!</p>
                <RegisterForm />
            </div>
        </section>
    )
}