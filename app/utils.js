"use client";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./contractRefs";

export let signer = null;
export let provider;

export async function connectWithMetamask() {
    console.log("calling connect with metamask");
    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
        console.log(provider);
    } else {
        provider = await new ethers.BrowserProvider(window.ethereum);
        console.log(provider);
        signer = await provider.getSigner();
        console.log(signer);
        return await provider.send("eth_requestAccounts", [0]);
    }
}
connectWithMetamask();

// Utility to create a new user
export async function createUser(userName, favNumber) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tnx= await contract.createUser(userName,favNumber);
    console.log(tnx);
    return tnx;

}

// Utility to get a user's details
export async function getUser(userid) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const user = await contract.getUser(userid);
    console.log(user);
    return ({
        id: user[0].toString(),
        name: user[1],
        favNum: user[2].toString()
    });    
}

// Utility to delete a user
export async function deleteUser(userid) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const user = await contract.deleteUser(userid);
    console.log(user);
    return user;

}

// Utility to update a user's name and favorite number
export async function updateUser(name, favNum, userid) {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    const tnx = await contract.updateUser(userid,name,favNum);
    console.log(tnx);
    return user;
}



// Utility to get the total number of users
export async function getUserCount() {
    await connectWithMetamask();
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    const tnx = await contract.getUserCount();
    console.log(tnx);
    return tnx;
}
