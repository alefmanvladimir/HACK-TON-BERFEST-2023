import { BusinessCard, Like } from "./../wrappers/tact_BusinessCard";
import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract, toNano } from "ton-core";

export type UserInfo = {
  name: string;
  profesion: string;
  bio: string;
};
export function useBuisnessCardContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [likes, setLikes] = useState<number | null>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>();

  const buisnessCardContract = useAsyncInitialize(async () => {
    if (!wallet || !client) return;

    const contract = BusinessCard.fromAddress(Address.parse("EQCM3b63cele_wx64hUJecFvmYA-xHbU4O0lyj3AJxqcLVEe"));

    const result = client.open(contract) as OpenedContract<BusinessCard>;
    return result;
  }, [wallet, client]);

  async function getLikes() {
    if (!buisnessCardContract) {
      console.log("Contr is not inis");
      return;
    }

    setLikes(null);
    const likes = await buisnessCardContract.getLikes();
    setLikes(Number(likes));
  }
  async function sendLike() {
    const message: Like = {
      $$type: "Like",
    };
    await buisnessCardContract?.send(
      sender,
      {
        value: toNano(0.01),
      },
      message
    );
  }

  async function getUserInfo() {
    if (!buisnessCardContract) {
      console.log("Contr is not inis");
      return;
    }

    setUserInfo(null);
    const userInfo = await buisnessCardContract.getInfo();
    setUserInfo({
      name: userInfo?.name,
      profesion: userInfo?.profesion,
      bio: userInfo?.bio,
    });
  }

  useEffect(() => {
    getLikes().catch(console.log);
    getUserInfo().catch(console.log);
  }, [buisnessCardContract]);
  return {
    likes,
    userInfo,
    sendLike,
  };
}
