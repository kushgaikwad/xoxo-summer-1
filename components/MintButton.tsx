import { DecentSDK, edition } from '@decent.xyz/sdk';
import { ethers } from 'ethers';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useSigner, useAccount } from "wagmi";
import handleTxError from '../lib/handleTxError';


// type Props = {}

const MintButton = (props: any) => {

    const { data: signer } = useSigner();
    const { address: account } = useAccount();

    const [isMinting, setIsMinting] = useState(false);

    const onSigning = (isMinting: boolean) => {
        setIsMinting(isMinting || false);
    };

    const onSuccess = (receipt: any) => {
        if (receipt) setIsMinting(false);
    };

    const onSuccessfulMint = async (receipt: any) => {
        onSuccess?.(receipt);
        toast.success("Minted successfully.");
    }

    const mint = async () => {
        if (signer) {
            try {
                onSigning?.(true);
                const sdk = new DecentSDK(props.chainId, signer);
                const to = account;
                const price: number = props.price;
                const nftOne = await edition.getContract(sdk, props.contractAddress);
                const tx = await nftOne.mint(to, 1, { value: ethers.utils.parseEther(price.toString()) });
                const receipt = await tx.wait();
                await onSuccessfulMint(receipt);
            } catch (error) {
                handleTxError(error);
                onSigning?.(false);
            }
        } else {
            toast.error("Please connect wallet to continue.");
        }
    }


    return (
        <div>
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-3sm md:text-xl xl:text-2xl px-5 py-2.5 text-center mr-2 mb-5 mt-5" onClick={mint}>{isMinting ? "..." : "MINT: 3 MATIC"}</button>
        </div>
    )
}

export default MintButton