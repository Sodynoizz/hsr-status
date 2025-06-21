import { create } from "zustand";

import { ForgottenHallData, HoyolabReward, NoteData, RecordData } from "@/app/types/starrail"
import { initialNoteData, initialForgottenHallData, initialRecordData, initialRewardData } from "@/app/constants/starrail";

export type StarRailState = {
  noteData: NoteData;
  setNoteData: (data: NoteData) => void;
  forgottenHallData: ForgottenHallData;
  setForgottenHallData: (data: ForgottenHallData) => void;
  recordData: RecordData;
  setRecordData: (data: RecordData) => void;
  rewardData: HoyolabReward;
  setRewardData: (data: HoyolabReward) => void;
};

const useStarRailStore = create<StarRailState>((set) => ({
  noteData: initialNoteData,
  setNoteData: (data) => set({ noteData: data }),
  forgottenHallData: initialForgottenHallData,
  setForgottenHallData: (data) => set({ forgottenHallData: data }),
  recordData: initialRecordData,
  setRecordData: (data) => set({ recordData: data }),
  rewardData: initialRewardData,
  setRewardData: (data) => set({ rewardData: data }),
}));

export default useStarRailStore;
