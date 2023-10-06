import {useTonClient} from "./useTonClient";
import {useTonConnect} from "./useTonConnect";
import {useEffect, useState} from "react";
import {useAsyncInitialize} from "./useAsyncInitialize";
import {BusinessCard, Like} from "../wrappers/tact_BusinessCard";
import {Address, OpenedContract, toNano} from "ton-core";

interface UserInfo {
  name: string
  profession: string
  bio: string
}

export function useBusinessCardContract (){
  const { client } = useTonClient()
  const { sender, wallet} = useTonConnect()
  const [likes, setLikes] = useState<bigint | null>(null)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const businessCardContract = useAsyncInitialize(async () => {
    if(!client || !wallet) return
    const contract = BusinessCard.fromAddress(
      Address.parse("EQCM3b63cele_wx64hUJecFvmYA-xHbU4O0lyj3AJxqcLVEe")
    )

    const result = client.open(contract) as OpenedContract<BusinessCard>

    return result
  }, [client, wallet])

  async function getLikes(){
    if(!businessCardContract){
      console.log('likes', businessCardContract)
      return
    }

    const likes = await businessCardContract.getLikes()
    setLikes(likes)
  }

  async function getUserInfo(){
    if(!businessCardContract) {
      console.log('userInfo', businessCardContract)
      return
    }

    const userInfo = await businessCardContract.getInfo()

    setUserInfo({
      name: userInfo.name,
      profession: userInfo.profesion,
      bio: userInfo.bio
    })
  }

  async function sendLike(){
    const message: Like = {
      $$type: "Like"
    }

    await businessCardContract?.send(sender, {
      value: toNano("0.01"),
      bounce: true
    }, message)
  }

  useEffect(() => {
    getLikes().catch(e => console.log(e.message))
    getUserInfo().catch(e => console.log(e.message))
  }, [businessCardContract])

  return {likes, userInfo, sendLike}
}