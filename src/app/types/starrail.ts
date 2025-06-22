export interface Expedition {
  item_url: string;
  name: string;
  status: string;
}

export interface NoteData {
  current_stamina: number;
  max_stamina: number;
  stamina_recover_time: number;
  current_reserve_stamina: number;
  accepted_epedition_num: number;
  total_expedition_num: number;
  expeditions: Expedition[];
  current_rogue_score: number;
  max_rogue_score: number;
  weekly_cocoon_cnt: number;
  weekly_cocoon_limit: number;
  rogue_tourn_weekly_cur: number;
  rogue_tourn_weekly_max: number;
}

export interface FloorDetail {
  name: string;
  is_fast: boolean;
  star_num: number;
}

export interface TimeData {
  month: number;
  day: number;
}

export interface ForgottenHallData {
  star_num: number;
  max_floor: string;
  battle_num: number;
  schedule_id: string;
  begin_time: TimeData;
  end_time: TimeData;
  all_floor_detail: FloorDetail[];
}

export interface HSRCharacter {
    id: number,
    level: number,
    name: string,
    element: string,
    icon: string,
    rarity: number,
    rank: number
}

export interface RecordData {
  stats: {
    active_days: number,
    avatar_num: number,
    achievement_num: number,
    chest_num: number,
    abyss_process: string,
  },
  dream_paster_num: number,
  season_title: string,
  avatar_list: HSRCharacter[],
  cur_head_icon_url: string,
  phone_background_image_url: string
}

export interface HoyolabReward {
  total_sign_day: number;
  reward: {
    icon: string;
    name: string;
    cnt: number;
  };
}

export type TrailblazerStatsProps = {
  noteData: NoteData;
  forgottenHallData: ForgottenHallData;
  recordData: RecordData;
};


export interface HsrAccountData {
    "uid": string,
    "nickname": string,
    "level": number,
    "world_level": number,
    "friend_count": number,
    "avatar": {
      "id": string,
      "name": string,
      "icon": string
    },
    "signature": string,
    "is_display": boolean,
    "space_info": {
      "memory_data": {
        "level": number,
        "chaos_id"?: number | null,
        "chaos_level": number,
        "chaos_star_count": number
      },
      "universe_level": number,
      "avatar_count": number,
      "light_cone_count": number,
      "relic_count": number,
      "achievement_count": number,
      "book_count": number,
      "music_count": number
    }
};
