"use client";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components";
import styles from "./styles.module.css";
import Image from "next/image";
import { LoginForm } from "@/views";

export function LoginPage() {
    
    return (
        <section className={styles.login}>
            <div className={styles.formContainer}>
                <h1>Login</h1>
                <p>Preencha as informações para fazer o Login!</p>
                <LoginForm />
            </div>
        </section>
    )
}

