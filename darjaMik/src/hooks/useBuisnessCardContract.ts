import { BusinessCard } from "./../wrappers/tact_BusinessCard";
import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "ton-core";
import { log } from "console";

export function useBuisnessCardContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();
  const [likes, setLikes] = useState<number | null>();
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
    setLikes(Number(likes.toString));
  }

  useEffect(() => {
    getLikes();
  }, [buisnessCardContract]);
  return {
    likes,
  };
}
