import {useTonClient} from "../hooks/useTonClient";
import {useTonConnect} from "../hooks/useTonConnect";
import {useEffect, useState} from "react";
import {Address, OpenedContract, toNano} from "ton-core";
import {useAsyncInitialize} from "../hooks/useAsyncInitialize";
import {BusinessCard, Like} from "../wrappers/tact_BusinessCard";
type UserInfo={
    name:string,
    profession: string,
    bio: string
}
export function useBusinessCardContract() {

    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [likes, setLikes] = useState<number | null>()
    const [userInfo, setUserInfo] = useState<UserInfo |null>()


    const businessCardContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return
        const contract = BusinessCard.fromAddress(Address.parse('EQAwBoVd79c5QUxwsuwiYrY429qryftXi67voepKNcyzH_Ad'))
       // const contract = BusinessCard.fromAddress(Address.parse('EQCM3b63cele_wx64hUJecFvmYA-xHbU4O0lyj3AJxqcLVEe'))
        const result = client.open(contract)
        return result
    },[client,wallet])

    const getLikes = async () => {
        if(!businessCardContract){
            console.log('contract is not initializided')
            return
        }
        setLikes(null)
        const likes = await businessCardContract.getLikes()
        setLikes(Number(likes))
    };
    const getUserInfo = async () => {

        if(!businessCardContract){
            console.log('contract is not initializided')
            return
        }
        setUserInfo(null)
        const userInfo = await businessCardContract.getInfo()
        setUserInfo({
            name: userInfo.name,
            profession: userInfo.profesion,
            bio:userInfo.bio
        })
        console.log(userInfo)
    };
    async function sendLike(){
        const message:Like ={
            $$type: 'Like'
        }
        await businessCardContract?.send(sender,{
            value: toNano('0.01')
        },
            message)
    }

    useEffect(()=>{
        getLikes(),
            getUserInfo()
    },[businessCardContract])
    return {
        likes, userInfo, sendLike
    }

}