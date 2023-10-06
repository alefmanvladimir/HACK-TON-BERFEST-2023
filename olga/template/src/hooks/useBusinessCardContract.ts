import { Address, OpenedContract, toNano } from 'ton-core';
import { useEffect, useState } from "react"
import { useTonClient } from "./useTonClient"
import { useTonConnect } from "./useTonConnect"
import { useAsyncInitialize } from "./useAsyncInitialize"
import { BusinessCard, Like } from "../wrappers/tact_BusinessCard"

type UserInfo={
    name:string
   profesion:string
   bio:string
}

export function useBusinesscardContract(){
    const {client}=useTonClient()
    const {sender,wallet}=useTonConnect()
    const [likes,setLikes]=useState<number|null>()
    const [userInfo,setUserInfo]=useState<UserInfo|null>()

    const businessCardContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return null;
        const contract =BusinessCard.fromAddress(Address.parse("EQCM3b63cele_wx64hUJecFvmYA-xHbU4O0lyj3AJxqcLVEe"))

        const res=client.open(contract) as OpenedContract<BusinessCard>

        return res
    }, [client, wallet]);

    async function getLikes(){
        if(!businessCardContract) {
            console.log("businessCardContract is not initialized")
            return
        }
        setLikes(null)
        const likes=await businessCardContract.getLikes()
        setLikes(Number(likes))
    }

    async function getUserInfo(){
        if(!businessCardContract) {
            console.log("businessCardContract is not initialized")
            return
        }
        const userInfo=await businessCardContract.getInfo()
        setUserInfo(userInfo)
        return userInfo
    }

async function sendLike(){
    if(!businessCardContract) {
        console.log("businessCardContract is not initialized")
        return
    }
    const message:Like={
        $$type:"Like"
    }

    await businessCardContract.send(sender,{value:toNano("0.01")},message)
}
    useEffect(()=>{
        getLikes()
        getUserInfo()
    },[businessCardContract])

    return {
        likes,
        userInfo,
        sendLike
    }

}