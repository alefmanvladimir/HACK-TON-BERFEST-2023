import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useAsyncInitialize } from './useAsyncInitialize';
import { BusinessCard, Like } from '../wrappers/tact_BusinessCard';
import { Address, OpenedContract, toNano } from 'ton-core';

type userInfo = {
  name: string;
  profession: string;
  bio: string;
};

export const useBisineesCardContract = () => {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [likes, setLikes] = useState<bigint | null>(null);
  const [userInfo, setUserInfo] = useState<userInfo | null>(null);

  const busineesCardContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;
    const contract = BusinessCard.fromAddress(
      Address.parse('EQCM3b63cele_wx64hUJecFvmYA - xHbU4O0lyj3AJxqcLVEe')
    );
    const result = client.open(contract) as OpenedContract<BusinessCard>;
console.log(result)
    return result;
  },[client, wallet]);

  async function getLikes() {
    if (!busineesCardContract) {
      console.log('contract is not initialized');

      return;
    }

    const likes = await busineesCardContract.getLikes();
    console.log(likes)
    setLikes(likes);
  }

  async function getUserInfo() {
    if (!busineesCardContract) {
      console.log('Contract is not initialized');
      return;
    }
    setUserInfo(null);
    const userInfo = await busineesCardContract.getInfo();
    setUserInfo({
      name: userInfo.name,
      profession: userInfo.profesion,
      bio: userInfo.bio,
    });
  }

  async function sendLike() {
    const message: Like = {
      $$type: 'Like',
    };
    await busineesCardContract?.send(
      sender,
      {
        value: toNano('0.01'),
      },
      message
    );
  }

  useEffect(() => {
    getLikes().catch(console.log);
    getUserInfo().catch(console.log);

  }, [busineesCardContract]);

  return {
    likes,
    userInfo,
    sendLike
  };
};
