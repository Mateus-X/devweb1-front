"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Divider, Menu } from "antd";
import Image from "next/image";
import { Icon, Separator } from "@/components";
import styles from "./styles.module.css";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];

export function Sidebar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className={styles.mobile}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      {/* SEPARADOR ENTRE DESKTOP E MOBILE */}
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
          <li className={styles.routes}>
            <Icon icon="default" /> Projetos
          </li>
          <li className={styles.routes}>
            <Icon icon="default" /> Projetos
          </li>
          <li className={styles.routes}>
            <Icon icon="default" /> Projetos
          </li>
        </ul>
      </aside>
    </>
  );
}
