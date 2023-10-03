import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import {
  BusinessCard,
  Dislike,
  Like,
  SetInformation,
} from "../wrappers/tact_BusinessCard";
import { Address, toNano } from "ton-core";

export type UserInfo = {
  name: string;
  profession: string;
  bio: string;
};

export const useBusinessCardContract = () => {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();

  const [userInfo, setUserInfo] = useState<UserInfo | null>();
  const [likes, setLikes] = useState(0);

  const businessCardContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;

    const contract = BusinessCard.fromAddress(
      Address.parse("EQATX4XDdGlEcu18ZpRlq-VVMnGBQcXwVLnWcvKTRCgr0yLu")
    );

    const result = client.open(contract);

    return result;
  }, [client, wallet]);

  useEffect(() => {
    getLikes().catch(console.log);
    getUserInfo().catch(console.log);
  }, [businessCardContract]);

  async function getLikes() {
    if (!businessCardContract) {
      return;
    }

    const likes = await businessCardContract.getLikes();

    setLikes(Number(likes));
  }

  async function getUserInfo() {
    if (!businessCardContract) {
      return;
    }
    setUserInfo(null);

    const userInfo = await businessCardContract.getInfo();

    setUserInfo({
      name: userInfo.name,
      profession: userInfo.profesion,
      bio: userInfo.bio,
    });
  }

  async function sendLike() {
    const message: Like = {
      $$type: "Like",
    };

    await businessCardContract?.send(
      sender,
      {
        value: toNano("0.01"),
      },
      message
    );

    if (message) {
      setLikes(likes + 1);
    }
  }

  async function sendDisike() {
    const message: Dislike = {
      $$type: "Dislike",
    };

    await businessCardContract?.send(
      sender,
      {
        value: toNano("0.01"),
      },
      message
    );

    if (message) {
      setLikes(likes - 1);
    }
  }

  async function setInformation(name: string, profesion: string, bio: string) {
    await businessCardContract?.send(
      sender,
      {
        value: toNano("0.01"),
      },
      {
        $$type: "SetInformation",
        name,
        profesion,
        bio,
      }
    );
  }

  return {
    likes,
    userInfo,
    sendLike,
    sendDisike,
    setInformation,
  };
};
