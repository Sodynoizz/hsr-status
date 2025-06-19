"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import StatusIcon from "@/components/StatusIcon";
import StatusBadge from "@/components/StatusBadge";
import GameTitle from "@/components/GameTitle";
import TrailblazerStats from "@/components/TrailblazerStats";

import { formatTime } from "@/app/utils/formatTime";
import { NoteData, ForgottenHallData } from "@/app/types/starrail";

const Index = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const [noteData, setNoteData] = useState<NoteData>({
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
  });
  const [forgottenHallData, setForgottenHallData] = useState<ForgottenHallData>({
    star_num: 0,
    max_floor: "",
    battle_num: 0,
    schedule_id: "",
    begin_time: { month: 0, day: 0 },
    end_time: { month: 0, day: 0 },
    all_floor_detail: []
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/hsr");
      const data = response.data;

      setNoteData(data.noteData);
      setForgottenHallData(data.forgottenHallData);
    }

    fetchUser()
  })

  useEffect(() => {
    const updateStatus = async () => {
      const response = await axios.get("/api/tracker");
      const data = response.data;

      setIsOnline(data.isPlayingHSR);
      setLastUpdate(new Date());
    };

    updateStatus();

    const interval = setInterval(updateStatus, 30000); 
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Main Status Card */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 shadow-2xl">
            <CardContent className="p-8 text-center">
              <StatusIcon isOnline={isOnline} />
              
              <GameTitle />

              <StatusBadge isOnline={isOnline} onRefresh={handleRefresh} />

              {/* Status Description */}
              <p className="text-slate-300 mb-6 text-sm">
                {isOnline 
                  ? "Currently aboard the Astral Express, traversing the cosmos and uncovering the mysteries of the universe." 
                  : "The Trailblazer is currently resting. Check back later for cosmic adventures!"
                }
              </p>

              {/* Last Update */}
              <p className="text-xs text-slate-400">
                Last updated: {formatTime(lastUpdate)}
              </p>
            </CardContent>
          </Card>

          <TrailblazerStats noteData={noteData} forgottenHallData={forgottenHallData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
