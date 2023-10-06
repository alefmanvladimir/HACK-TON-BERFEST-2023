import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useEffect, useState} from "react";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {BusinessCard, Like} from "../wrappers/tact_BusinessCard";
import {Address, OpenedContract, toNano} from "ton-core";

type UserInfo = {
    name: string;
    profession: string;
    bio: string;
}

export function useBusinessCardContract(){
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [likes, setLikes] = useState<number | null>()
    const [userInfo, setUserInfo]= useState<UserInfo | null>()

    const businessCardContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return
        const contract = BusinessCard.fromAddress(
            Address.parse("EQCM3b63cele_wx64hUJecFvmYA-xHbU4O0lyj3AJxqcLVEe")
        )
        const result = client.open(contract) as OpenedContract<BusinessCard>

        return result
    }, [client, wallet])

    async function getLikes(){
        if(!businessCardContract){
            console.log("Contract is not initialized")
            return
        }
        setLikes(null)
        const likes = await businessCardContract.getLikes()
        console.log(likes)
        setLikes(Number(likes))
    }

    async function getUserInfo(){
        if(!businessCardContract){
            console.log("Contract is not initialized")
            return
        }
        setUserInfo(null)
        const userInfo = await businessCardContract.getInfo()
        setUserInfo({
            name: userInfo.name,
            profession: userInfo.profesion,
            bio: userInfo.bio
        })
    }

    async function sendLike(){
        const message : Like = {
            $$type: "Like"
        }
        await businessCardContract?.send(sender,
            {
                value: toNano("0.01")
            }, message)

    }

    useEffect(()=>{
        getLikes().catch(console.log)
        getUserInfo().catch(console.log)
        console.log("useEffect")
    }, [businessCardContract])

    return {
        likes,
        userInfo,
        sendLike
    }
}