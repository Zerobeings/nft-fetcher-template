import {
    useAddress,
    useContract
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Contract.module.css";
import NFTCard from "../../components/NFTCard/NFTCard";
import Container from "../../components/Container/Container";
import { GridLoader } from "react-spinners";
import Filter from "../../components/Filter/Filter";
import getMixtapeNFTs from 'nft-fetcher';

interface Attributes {
    [key: string]: string[];
  }

export default function Contract() {
    const address = useAddress();
    const router = useRouter();
    const contractAddress = router.query.contract as string;
    const network = router.query.network as string;
    const [NFTs, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState<boolean>(true);
    const [atBottom, setAtBottom] = useState<boolean>(false);
    const [attributes, setAttributes] = useState<Attributes>({});
    
    //Fetch NFTs from contract
    useEffect(() => {
        (async () => {
            if (!isProcessing) {
                console.log('Fetching NFTs...');
                if(contractAddress && network) {
                    try {
                        console.log('Fetching NFTs...');
                        const nfts = await getMixtapeNFTs(contractAddress, network);
                        console.log(nfts);
                        setNfts(nfts);
                        const attributes = extractAttributes(nfts);
                        setAttributes(attributes);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching NFT data:', error);
                        setLoading(false);
                    }
                }
            }
        })();
    }, [contractAddress, network, isProcessing]);

    useEffect(() => {
        setInterval(() => {
            setIsProcessing(false);
        }, 5000); 
        }
    , []);

    const extractAttributes = (nfts: any[]) => {
        const attributeMap: Attributes = {};
        nfts.forEach(nft => {
            Object.entries(nft.attributes || {}).forEach(([key, value]) => {
              if (!attributeMap[key]) {
                attributeMap[key] = [];
              }

              if (typeof value === 'string' && !attributeMap[key].includes(value)) {
                attributeMap[key].push(value);
              }
            });
          });
      
        return attributeMap;
      };

    //Click an attribute to search for all NFTs with that attribute
    const handleAttributeFromCard = async (selectedAttribute:string, tokenStart:number) => {
        const limit = 100;
        console.log(tokenStart);
        const start = tokenStart !== undefined ? tokenStart : 0;
        const where = selectedAttribute !== "" ? [selectedAttribute] as any[] : [] as any[];
        const select = "*";
        const dbURL = ""
        if(contractAddress && network) {
            setLoading(true);
            try {
                console.log('Fetching Query...');
                const nfts = await getMixtapeNFTs(contractAddress, network, {limit: limit, start: start, where: where});
                console.log(nfts);
                setNfts(nfts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching query:', error);
                setLoading(false);
            }
        }
    }

    const handleClearSearch = () => {
        const clear = "";
        handleAttributeFromCard(clear, 0);
      }

    //Click an attribute to search for all NFTs with that attribute
    const handleSelection = async (event:any) => {
        const selectedName = event.target.getAttribute('data-attribute-label');
        const selectedValue = event.target.value;

        const selectedAttribute = `"${selectedName}" = "${selectedValue}"`;
        const limit = 100;
        const start = 0;
        const where = selectedAttribute !== "" ? [selectedAttribute] as any[] : [] as any[];
        const select = "*";
        const dbURL = ""
        if(contractAddress && network) {
            setLoading(true);
            try {
                console.log('Fetching Query...');
                const nfts = await getMixtapeNFTs(contractAddress, network, {limit: limit, start: start, where: where});
                console.log(nfts);
                setNfts(nfts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching query:', error);
                setLoading(false);
            }
        }
    }

    return (
        <Container maxWidth="lg">
             <div className={styles.selectorContainer}>
                <Filter attributes={attributes} onAttributeSelect={handleAttributeFromCard}></Filter>
                <div className={styles.selection}>
                    <button className={styles.resetBtn} onClick={handleClearSearch}><Image src="/images/reset.png" width={22} height={22} alt="reset"/></button>
                </div> 
            </div>
            <div className={styles.container}>
                <div className={styles.grid}>
                {NFTs && NFTs.length > 0 &&
                    NFTs.map((nft, i) => (
                        <NFTCard nft={nft} key={i} network={network} contractAddress={contractAddress} onAttributeSelect={handleAttributeFromCard}></NFTCard>
                    ))
                }
                </div>
                {loading ?
                    <GridLoader className={styles.loader}/>
                : NFTs && NFTs.length === 0 &&
                    <>
                        <h1 className={styles.heading}>No NFTs found</h1>
                       {address ?
                        <div className={styles.btnContainer}>
                            <Link className={styles.indexBtn} href="/request">Index this Collection</Link>
                        </div>
                        :
                        <div className={styles.btnContainer}>
                            <p>Connect Wallet to submit a request</p>
                        </div>
                        }
                    </>
                }
            </div>
        </Container>
    );
};
