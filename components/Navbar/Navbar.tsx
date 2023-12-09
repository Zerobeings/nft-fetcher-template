import { ConnectWallet, useAddress, lightTheme } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import stylesNav from "./Navbar.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';


export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const address = useAddress();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
      setIsOpen(!isOpen);
  };
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect (() => {
    try{
        if (router.pathname === '/index') {
          setHideNavbar(true);
        } else if (router.pathname === '/[contract]') {
          setHideNavbar(false);
        }
      } catch (error) {
        console.error('Error hiding navbar:', error);
      }
  }, [setHideNavbar, router.pathname])

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
    
    <div className={stylesNav.navContainer}>
    <nav className={stylesNav.nav}>
      <div className={stylesNav.navLeft}>
        <div className={stylesNav.menuContainer}>
            <div className={`${stylesNav.menu} ${isOpen ? stylesNav.menuVisible : ""}`}>
                <ul>
                    <li>
                        <Link href="/" onClick={() => setIsOpen(false)}><button className={stylesNav.navBtn}>Home</button></Link>
                    </li>
                </ul>
                <div className={stylesNav.socialLinks}>
                    <a href="https://x.com/art_locatia" target="_blank" rel="noopener noreferrer">
                        <Image src="/socials/light/twitter.png" width={22} height={22} alt="Twitter"/>
                    </a>
                    <a href="https://instagram.com/art_locatia" target="_blank" rel="noopener noreferrer">
                        <Image src="/socials/light/instagram.png" width={22} height={22} alt="Instagram"/>
                    </a>
                </div>
            </div>

            <div className={`${stylesNav.content} ${isOpen ? stylesNav.contentShifted : ""}`}>
                
            </div>
            {!isOpen ?
                <Image
                    src="/icon-72x72.png"
                    width={52}
                    height={52}
                    alt="nft-indeer"
                    className={stylesNav.toggleButton}
                    onClick={toggleMenu}
                />
                :
                <Image
                    src="/icon-72x72.png"
                    width={52}
                    height={52}
                    alt="nft-indexer"
                    className={stylesNav.toggleButtonRotate}
                    onClick={toggleMenu}
                />
            }
     
        </div>
      </div>
      <div className={stylesNav.placeholder}>
        </div>
      {hideNavbar &&
       <div className={stylesNav.searchBarContainer}>
          <input
          className={stylesNav.searchBar}
          type={"text"}
          placeholder="check collection"
          onChange={handleInputChange}
          onKeyPress={event => {
            if (event.key === 'Enter' && search) {
              handleSuggestionClick(search);
            };
            }}
          value={search}
          />
            {search && (
            <button className={stylesNav.clearButton} onClick={handleClearSearch}>
              X
            </button>
          )}
        </div>
        }
      <div className={stylesNav.navRight}>
        <ConnectWallet
          theme={lightTheme({
            colors: {
              accentText: "#EC9E72",
              accentButtonBg: "#EC9E72",
              modalBg: "#ffffff",
              dropdownBg: "#ffffff",
              borderColor: "#ccc",
              separatorLine: "#ccc",
              primaryText: "#666",
              secondaryText: "#706f78",
              primaryButtonBg: "#252405",
            },
          })}
          btnTitle={"login"}
          modalTitle={"nft fetcher"}
          switchToActiveChain={true}
          modalSize={"wide"}
          welcomeScreen={{
            title: "nft fetcher",
            subtitle:
              "Login in.",
            img: {
              src: "https://indexer.locatia.app/icon-512x512.png",
              width: 150,
              height: 150,
            },
          }}
          modalTitleIconUrl={
            "https://indexer.locatia.app/icon-384x384.png"
          }
        />
      </div>
  </nav>
  </div>
  
  );
}
