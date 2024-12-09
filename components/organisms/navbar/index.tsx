"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Button } from "@/components/atoms/button";
 
export function Navbar() {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
        <h1>SprintBoard</h1>
        <ul>
            <li>Produto</li>
            <li>Soluções</li>
            <li>Contato</li>
        </ul>
        <Button.Root variant="secondary" onClick={() => router.push("/login")}>Entrar</Button.Root>
        <Button.Root onClick={() => router.push("/cadastro")}>Cadastrar</Button.Root>
    </nav>
  );
}
