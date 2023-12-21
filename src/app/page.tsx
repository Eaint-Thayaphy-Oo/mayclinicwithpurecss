import Image from "next/image";
import styles from "./page.module.css";
import Navigation from "../../components/Navigation/Nav";
import Body from "../../components/Body/Body";

export default function Home() {
  return (
    <main className={styles.container}>
      <Navigation />
      <Body />
    </main>
  );
}
