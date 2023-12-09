import styles from './NFTCard.module.css';
import Image from 'next/image';
import { MediaRenderer } from "@thirdweb-dev/react";
import { useEffect, useState } from 'react';

interface Props {
  nft: any;
  network: string;
  contractAddress: string;
  onAttributeSelect: (selectedAttribute: string, tokenStart: number) => Promise<void>;
}

export default function NFTCard({ nft, network, contractAddress, onAttributeSelect }: Props) {
  const handleAttributeClick = (attribute: string) => {
    onAttributeSelect(attribute, 0); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h4 className={styles.heading}>{nft.name}</h4>
        {network === "ethereum" ?
        <a target="_blank" href={`https://opensea.io/assets/ethereum/${contractAddress}/${nft.index}`}>
          <MediaRenderer src={nft.image} alt="image" height="233px" width="233px" />
        </a>
        : network === "polygon" &&
        <a target="_blank" href={`https://opensea.io/assets/matic/${contractAddress}/${nft.index}`}>
          <MediaRenderer src={nft.image} alt="image" height="233px" width="233px"  />
        </a>
        }
        <table className={styles.table}>
          <tbody>
          {Object.entries(nft.attributes).map(([key, value], i) => {
              return (
                <tr key={i} onClick={() => handleAttributeClick(`"${key}" = "${String(value)}"`)}>
                    <td>{key}</td>
                    <td>{String(value)}</td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
