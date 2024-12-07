"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import styles from "./styles.module.css";

interface OwnerProps {
  imgSrc: string;
  name: string;
  githubLink: string;
  linkedinLink: string;
}

export function Owner({ imgSrc, name, githubLink, linkedinLink }: OwnerProps) {
  const router = useRouter();

  return (
    <div className={styles.owner}>
      <Image
        src={imgSrc}
        alt="Imagem do dev"
        width={100}
        height={100}
        className={styles.img}
      />
      <p>{name}</p>
      <div className={styles.iconWrap}>
        <Icon
          icon="line-md:github-twotone"
          onClick={() => router.push(githubLink)}
        />
        <Icon
          icon="mingcute:linkedin-line"
          onClick={() => router.push(linkedinLink)}
        />
      </div>
    </div>
  );
}
