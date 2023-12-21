import React from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import styles from "./Nav.module.css";

export default function Navigation() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/images/Logo(2).png" alt="logo" width={40} height={50} />
      </div>
      <div className={styles.nav}>
        <FaBell className={styles.icon} />
        <Image src="/images/user image.png" alt="user" width={50} height={50} />
        <div className={styles.header}>
          <h3>Lisa</h3>
          <p>Operator</p>
        </div>
      </div>
    </div>
  );
}
