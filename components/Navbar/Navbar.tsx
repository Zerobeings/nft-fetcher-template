import { ConnectWallet, useAddress, lightTheme, MediaRenderer, useChain } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import stylesNav from "./Navbar.module.css";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';

export default function Navbar() {
  const [search, setSearch] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [network, setNetwork] = useState<string>("");
  const address = useAddress();
  const router = useRouter();
  const chain = useChain();
  const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e:any) => {
      const query = e.target.value;
      setSearch(query);
      setShowSuggestions(query !== '');
    };
  
    const handleClearSearch = () => {
      setSearch("");
      setShowSuggestions(false);
    };

    const handleSuggestionClick = (search:string) => {
        setSearch('');
        setShowSuggestions(false);
        router.push(`/${network}/${search}`).then(() => {
          window.location.reload();
        });
      };



  useEffect(() => {
    (async () => {
    try{
      if (chain && chain.chain.toLowerCase() === "ethereum" || network === "ethereum") {
      const collection = await fetch("https://nft-indexer-ten.vercel.app/eth-directory/directory.json");
      const collectionJson = await collection.json();
      setCollections(collectionJson);
      } else if (chain && chain.chain.toLowerCase() === "polygon" || network === "polygon") {
      const collection = await fetch("https://nft-indexer-ten.vercel.app/poly-directory/directory.json");
      const collectionJson = await collection.json();
      setCollections(collectionJson);
      } else if (chain && chain.chain.toLowerCase() === "avalanche" || network === "avalanche") {
        const collection = await fetch("https://nft-indexer-ten.vercel.app/avax-directory/directory.json");
        const collectionJson = await collection.json();
        setCollections(collectionJson);
      } else if (chain && chain.chain.toLowerCase() === "fantom" || network === "fantom") {
        const collection = await fetch("https://nft-indexer-ten.vercel.app/ftm-directory/directory.json");
        const collectionJson = await collection.json();
        setCollections(collectionJson);
      } else {
        const collection = await fetch("https://nft-indexer-ten.vercel.app/eth-directory/directory.json");
        const collectionJson = await collection.json();
        setCollections(collectionJson);
      }
    } catch (error) {
      console.log(error);
    }
  })();
  }, [chain,network]);
  
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
       <div className={stylesNav.searchBg}>
        <div className={stylesNav.searchBarContainer}>
        <div className={stylesNav.selectorContainer}>
        <select
          className={stylesNav.selectNetwork}
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        >
          <option value="">Network?</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="avalanche">Avalanche</option>
          <option value="fantom">Fantom</option>
        </select>
       </div>
          <input
          className={stylesNav.searchBar}
          type={"text"}
          placeholder="Name/Address"
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
        {showSuggestions && (
          <div className={stylesNav.suggestionsContainer}>
            {collections && collections
              .filter((collection) =>
              collection.name.toLowerCase().includes(search.toLowerCase())
              )
              .slice(0, 6)
              .map((collection, index) => (
                    <div
                      key={index}
                      className={stylesNav.suggestion}
                      onClick={() => handleSuggestionClick(collection.contract)}
                    >
                      <MediaRenderer src={collection.image} alt={collection.contract} className={stylesNav.suggestionLogo} width={"20"} height={"20"} />
                      <span>{collection.name}</span>
                    </div>
              ))}
          </div>
        )}
        </div>
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
          modalTitle={"nft indexer"}
          modalSize={"wide"}
          welcomeScreen={{
            title: "nft indexer",
            subtitle:
              "Login in to check indexed nfts or to submit a collection for indexing.",
            img: {
              src: "https://indexer.locatia.app/icon-512x512.png",
              width: 150,
              height: 150,
            },
          }}
          modalTitleIconUrl={
            "https://indexer.locatia.app/icon-384x384.png"
          }
          privacyPolicyUrl={
            "https://www.privacypolicytemplate.net/live.php?token=nhTPoMIeOzVU56HL0ltZg1aFaK7mtlNl"
          }
        />
      </div>
  </nav>
  </div>
  
  );
}
