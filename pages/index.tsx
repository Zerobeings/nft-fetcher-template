import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import {PoweredBy} from "../components/PoweredBy/PoweredBy";
import {GitHub} from "../components/PoweredBy/GitHub";
import {GridLoader} from "react-spinners";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const address = useAddress();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h3 className={styles.heading}>yarn add nft-fetcher</h3>
      </div>
      <PoweredBy />
      <GitHub />
    </main>
  );
};

export default Home;
