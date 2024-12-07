"use client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import Image from "next/image";
import { Button, Hiperlink, Icon } from "@/components";
import { text } from "stream/consumers";

export function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.textWrap}>
        <h1 onClick={() => router.push("/")} style={{ cursor: "pointer" }}>Sprint<span>Board</span></h1>
        <nav>
          <ul>
            <li>
              <Hiperlink text="Produto" onClick={() => router.push("/")} />
            </li>
            <li>
              <Hiperlink text="Soluções" onClick={() => router.push("/")} />
            </li>
            <li>
              <Hiperlink text="Contato" onClick={() => router.push("/")} />
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.authWrap}>
        <Button.Root variant="bordered" onClick={() => router.push("/")}>
          <Icon icon={"material-symbols:account-circle"} fontSize={"2rem"}/>
          <span>Fazer Login</span>
        </Button.Root>
        <Button.Root variant="primary" onClick={() => router.push("/")}>
          <span>Entrar</span>
        </Button.Root>
      </div>
    </header>
  );
}
