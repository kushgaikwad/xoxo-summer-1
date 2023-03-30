import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import gif from '../public/assets/ezgif.com-gif-maker (2).gif'
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { chain, DecentSDK, edition } from '@decent.xyz/sdk';
import MintButton from '../components/MintButton';
import { Prata, Lato } from 'next/font/google';
import bgImage from '../public/assets/bg1.jpeg'

const prata = Prata({
  weight: ["400"],
  subsets: ['latin']
})

const lato = Lato({
  weight: ['400', '900'],
  subsets: ['latin']
})

const Home: NextPage = () => {

  const RPC = "https://polygon-rpc.com//"; //for testing on Ethereum goerli; do not need for mainnet - other chains have different RPC endpoints you'll have to input here if contract is not on Ethereum mainnet

  const CHAINID = 137; //change to 5 to test on goerli

  {/* make sure to update for your contract address; if you created your contract through the HQ, you can grab its address off the Success or Admin page */ }
  const contractAddress = "0x1172AA36c81C394C333cb4602EaaBB9aE8A533DB";
  const price = 3;
  {/* can be deleted if only using 1 contract */ }

  const [contractMints, setContractMints] = useState(1)

  // required to display the mint counts you'll see below || can add any other contract data via a similar method
  const updateContractInfo = async () => {
    const provider = ethers.getDefaultProvider(RPC); //add RPC as parameter for goerli
    const sdk = new DecentSDK(CHAINID, provider);
    const contract = await edition.getContract(sdk, contractAddress);

    setContractMints(parseInt(await contract.totalSupply()));
  }

  useEffect(() => {
    updateContractInfo();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Summer in February</title>
        <meta
          content="Summer in February NFT by Honey Musket"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* <Image src={bgImage} alt="background image" className='object-fit ' priority/> */}
      <main className={`${styles.main} ${lato.className} ${prata.className} `}>
        
        <header className='top-0 left-0 flex justify-center py-5 md:justify-end xl:text-1xl'>
          <ConnectButton />
        </header>
        <section className='flex flex-col items-center gap-3 md:gap-7 xl:gap-16 xl:flex-row justify-evenly xl:mt-10 '>
          <div className='mx-4 basis-1/2'>
            <Image className="object-cover object-center rounded" alt="main_NFT" src={gif} />
          </div>
          <div className=' basis-1/2 flex flex-col mx-4  justify-items-start content-center items-center xl:items-start gap-y-0.5 md:gap-y-2'>
            <h1 className={` ${prata.className} mt-4 text-[1.75rem] font-bold md:text-5xl `}>Summer in February</h1>
            <h2 className='mt-1 text-2xl text-gray-500 md:text-3xl xl:text-4xl xl:mt-6'>by honeymusket.eth</h2>
            <h3 className='text-center text-sm md:text-base xl:text-left xl:text-[1rem] mt-8 md:mt-6 xl:mt-[4rem]'>This art is about a person who reminds the artist of that last tequila sunrise at the bottomless brunch</h3>
            <h3 className='text-center text-sm md:text-base xl:text-left xl:mt-5 xl:text-[1rem] mt-4 '>Utility: If you buy this, it  would let the artist buy a vada pav [Vada Pav is to Marathi people what Croissant is to French people]</h3>
            <h2 className='mt-8 font-bold text-gray-500 text-1xl md:text-2xl xl:text-2xl xl:mt-10'>EDITIONS MINTED: {contractMints}/100 </h2>
            <div className="xl:mt-5">
              <MintButton chainId={CHAINID} price={price} contractAddress={contractAddress} />
            </div>

          </div>
        </section>
      </main>



      <footer className={`${styles.footer} text-[0.6rem] md:text-[0.8rem]`} >
        <a href="https://kushgaikwad.studio" rel="noopener noreferrer" target="_blank">
          Made with @Decent.xyz & lots of Deep House and Dark Chocolate
        </a>
      </footer>
    </div >
  );
};

export default Home;
