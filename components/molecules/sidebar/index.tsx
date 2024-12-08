"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import Image from "next/image";
import { Icon, Separator } from "@/components";
import styles from "./styles.module.css";

// Definição centralizada das rotas
const routes = [
  { key: "1", label: "Home", icon: <Icon fontSize={"2rem"} icon="ic:outline-home" />, path: "/" },
  { key: "2", label: "Projetos", icon: <Icon fontSize={"2rem"} icon="ix:project" />, path: "/projetos" },
  { key: "3", label: "Devs", icon: <Icon fontSize={"2rem"} icon="material-symbols:developer-mode-tv-outline-rounded" />, path: "/devs" },
];

export function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  // Converter rotas para itens do menu mobile
  const menuItems = routes.map(({ key, label, icon, path }) => ({
    key,
    label: (
      <div onClick={() => router.push(path)} className={styles.menuItem}>
        {icon} {label}
      </div>
    ),
  }));

  return (
    <>
      {/* Versão Mobile */}
      <div className={styles.mobile}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          className={styles.toggleButton}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div
          className={`${styles.overlay} ${collapsed ? styles.hidden : ""}`}
          onClick={toggleCollapsed}
        />
        <div className={`${styles.sidebar} ${collapsed ? styles.hidden : ""}`}>
          <Menu mode="inline" theme="dark" items={menuItems} />
        </div>
      </div>

      {/* Versão Desktop */}
      <aside className={styles.desktop}>
        <div className={styles.profileInfo}>
          <Image
            src="assets/pics/fari.png"
            alt="fari"
            className={styles.img}
            width={100}
            height={100}
          />
          <h1>Olá! Usuário</h1>
        </div>
        <Separator />
        <ul className={styles.navigation}>
          {routes.map(({ key, label, icon, path }) => (
            <li
              key={key}
              className={styles.routes}
              onClick={() => router.push(path)}
            >
              {icon} {label}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
