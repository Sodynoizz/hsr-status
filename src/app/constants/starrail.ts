import { NoteData, ForgottenHallData, RecordData, HoyolabReward } from '../types/starrail';

export const initialNoteData: NoteData = {
  current_stamina: 0,
  max_stamina: 0,
  stamina_recover_time: 0,
  current_reserve_stamina: 0,
  accepted_epedition_num: 0,
  total_expedition_num: 0,
  expeditions: [],
  current_rogue_score: 0,
  max_rogue_score: 0,
  weekly_cocoon_cnt: 0,
  weekly_cocoon_limit: 0,
  rogue_tourn_weekly_cur: 0,
  rogue_tourn_weekly_max: 0
};

export const initialForgottenHallData: ForgottenHallData = {
  star_num: 0,
  max_floor: "",
  battle_num: 0,
  schedule_id: "",
  begin_time: { month: 0, day: 0 },
  end_time: { month: 0, day: 0 },
  all_floor_detail: []
};

export const initialRecordData: RecordData = {
  stats: {
    active_days: 0,
    avatar_num: 0,
    achievement_num: 0,
    chest_num: 0,
    abyss_process: "",
  },
  dream_paster_num: 0,
  season_title: "",
  avatar_list: [],
  cur_head_icon_url: "",
  phone_background_image_url: ""
};

export const initialRewardData: HoyolabReward = {
  total_sign_day: 0,
  reward: {
    icon: "",
    name: "",
    cnt: 0
  }
};
