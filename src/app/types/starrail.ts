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

export type TrailblazerStatsProps = {
  noteData: NoteData;
  forgottenHallData: ForgottenHallData;
};
