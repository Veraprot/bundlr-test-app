import Bundlr from "@bundlr-network/client";
import fs from "fs";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const bundlr = new Bundlr.default(
    "https://devnet.bundlr.network",
    "solana",
    process.env.PHANTOM_WALLET_KEY, 
    {
        providerUrl: "https://api.devnet.solana.com"
    }
);

// // // Print your wallet address
console.log(`wallet address = ${bundlr.address}`);

let atomicBalance = await bundlr.getLoadedBalance();
console.log(`node balance (atomic units) = ${atomicBalance}`);

// uncommment this block to fund bundlr node
// this is step one before you can make any other transactions 

// try {
//     // response = {
//     //  id, // the txID of the fund transfer
//     //  quantity, // how much is being transferred
//     //  reward, // the amount taken by the network as a fee
//     //  target, // the address the funds were sent to
//     // };
//     let response = await bundlr.fund(1000000);
//     console.log(
//         `Funding successful txID=${response.id} amount funded=${response.quantity}`,
//     );
// } catch (e) {
//     console.log("Error funding node ", e);
// }


const folderToUpload = "images";
try {
    let response = await bundlr.uploadFolder("./" + folderToUpload, {
        indexFile: "", // optional index file (file the user will load when accessing the manifest)
        batchSize: 50, //number of items to upload at once
        keepDeleted: true, // whether to keep now deleted items from previous uploads
    }); //returns the manifest ID

    console.log(`Files uploaded ${response}`);

    for (const key in response) {
        console.log(`${key}: ${response[key]} \n`);
    }

} catch (e) {
    console.log("Error uploading file ", e);
}