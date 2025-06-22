import { create } from "zustand";

import { HsrAccountData } from "@/app/types/starrail";
import { initialAccountData } from "@/app/constants/account";

export type StarRailAccount = {
  accountData: HsrAccountData;
  setAccountData: (data: HsrAccountData) => void;
};

const useStarRailAccount= create<StarRailAccount>((set) => ({
  accountData: initialAccountData,
  setAccountData: (data) => set({ accountData: data }),
}));

export default useStarRailAccount;
