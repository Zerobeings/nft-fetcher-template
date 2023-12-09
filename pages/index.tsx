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

    const handleInputChange = (e:any) => {
      const query = e.target.value;
      setSearch(query);
    };
  
    const handleClearSearch = () => {
      setSearch("");
    };

    const handleSuggestionClick = (search:string) => {
        setSearch('');
        router.push(`/${search}`).then(() => {
          window.location.reload();
        });
      };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h4 className={styles.title}>
          edit <code>`pages/index.tsx`</code> to begin.
        </h4>

          <div className={styles.searchBarContainer}>
            <input
            className={styles.searchBar}
            type={"text"}
            placeholder="collection address"
            onChange={handleInputChange}
            onKeyPress={event => {
              if (event.key === 'Enter' && search) {
                handleSuggestionClick(search);
              };
              }}
            value={search}
            />
              {search && (
              <button className={styles.clearButton} onClick={handleClearSearch}>
                X
              </button>
            )}
          </div>
        </div>

      <PoweredBy />
      <GitHub />
    </main>
  );
};

export default Home;
