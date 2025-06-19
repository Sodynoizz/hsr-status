import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Clock, Star, Trophy, Award } from "lucide-react";

import { getElementColor, getRarityColor } from "@/app/utils/getColor";
import { TrailblazerStatsProps } from "@/app/types/starrail";

const TrailblazerStats = (
  { noteData, forgottenHallData, recordData }: TrailblazerStatsProps
) => {
  return (
    <Card className="mt-4 bg-slate-800/40 backdrop-blur-md border-slate-700/50">
      <CardContent className="p-4">
        <Tabs defaultValue="note" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
            <TabsTrigger value="note" className="text-xs">
              <Battery className="w-3 h-3 mr-1" />
              Note
            </TabsTrigger>
            <TabsTrigger value="forgotten-hall" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Forgotten Hall
            </TabsTrigger>
            <TabsTrigger value="record" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Record
            </TabsTrigger>
          </TabsList>

          <TabsContent value="note" className="mt-3 space-y-3">
            {/* Stamina Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Current Stamina</span>
                <span className="text-blue-400">{noteData.current_stamina}/{noteData.max_stamina}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Recovery Time</span>
                <span className="text-green-400">{noteData.stamina_recover_time}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Reserve Stamina</span>
                <span className="text-purple-400">{noteData.current_reserve_stamina}</span>
              </div>
            </div>

            {/* Expeditions Section */}
            <div className="border-t border-slate-600 pt-2">
              <div className="flex justify-between text-xs text-slate-300 mb-2">
                <span>Expeditions</span>
                <span className="text-yellow-400">{noteData.accepted_epedition_num}/{noteData.total_expedition_num}</span>
              </div>
              <div className="space-y-1">
                {noteData.expeditions.map((expedition, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={expedition.item_url} alt="" className="w-4 h-4 rounded" />
                      <span className="text-slate-300 truncate max-w-32">{expedition.name}</span>
                    </div>
                    <span className={`text-xs ${expedition.status === 'Finished' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {expedition.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Stats */}
            <div className="border-t border-slate-600 pt-2 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Simulated Universe</span>
                <span className="text-purple-400">{noteData.current_rogue_score}/{noteData.max_rogue_score}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Weekly Cocoon</span>
                <span className="text-blue-400">{noteData.weekly_cocoon_cnt}/{noteData.weekly_cocoon_limit}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Tournament Weekly</span>
                <span className="text-yellow-400">{noteData.rogue_tourn_weekly_cur}/{noteData.rogue_tourn_weekly_max}</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forgotten-hall" className="mt-3 space-y-3">
            {/* Overview Section */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Total Stars</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400">{forgottenHallData.star_num}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Max Floor</span>
                <span className="text-purple-400">{forgottenHallData.max_floor}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Battles</span>
                <span className="text-green-400">{forgottenHallData.battle_num}</span>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="border-t border-slate-600 pt-2 space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Schedule</span>
                <span className="text-blue-400">{forgottenHallData.schedule_id}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Period</span>
                <span className="text-slate-400 text-right">
                  {forgottenHallData.begin_time.month}/{forgottenHallData.begin_time.day} - {forgottenHallData.end_time.month}/{forgottenHallData.end_time.day}
                </span>
              </div>
            </div>

            {/* Floor Details */}
            <div className="border-t border-slate-600 pt-2">
              <div className="text-xs text-slate-300 mb-2">Floor Progress</div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {forgottenHallData.all_floor_detail.slice(0, 6).map((floor, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 truncate max-w-28">{floor.name}</span>
                    <div className="flex items-center gap-2">
                      {floor.is_fast && <Clock className="w-3 h-3 text-green-400" />}
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-yellow-400">{floor.star_num}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

           <TabsContent value="record" className="mt-3 space-y-3">
            {/* General Stats */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Active Days</span>
                <span className="text-blue-400">{recordData.stats.active_days}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Characters</span>
                <span className="text-purple-400">{recordData.stats.avatar_num}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Achievements</span>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400">{recordData.stats.achievement_num}</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Treasure Chests</span>
                <span className="text-green-400">{recordData.stats.chest_num}</span>
              </div>
            </div>

            {/* Current Status */}
            <div className="border-t border-slate-600 pt-2 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Abyss Progress</span>
                <span className="text-red-400 text-right text-xs">{recordData.stats.abyss_process}</span>
              </div>
            </div>

            {/* Avatar Collection */}
            <div className="border-t border-slate-600 pt-2">
              <div className="text-xs text-slate-300 mb-2">Recent Characters</div>
              <div className="grid grid-cols-3 gap-2">
                {recordData.avatar_list.slice(0, recordData.avatar_list.length).map((avatar, index) => (
                  <div key={index} className={`relative bg-slate-700/50 rounded p-2 border-2 
                  ${ avatar.rarity === 5 ? "border-yellow-400" : "border-purple-400" }`}>
                    <img src={avatar.icon} alt={avatar.name} className="w-8 h-8 mx-auto rounded" />
                    <div className="text-center mt-1">
                      <div className={`text-xs truncate ${ avatar.rarity === 5 ? "text-yellow-400" : "text-purple-400"}`}>{avatar.name}</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="text-xs text-slate-400">Lv.{avatar.level}</span>
                        <span className={`text-xs text-slate-400 }`}>E{avatar.rank}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TrailblazerStats;