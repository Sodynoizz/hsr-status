"use client";

import { useState, useEffect } from "react";

import useStarRailStore from "@/app/hooks/useStarRailStore";
import useStarRailAccount from "@/app/hooks/useStarRailAccount";
import { fetchData } from "@/app/utils/fetch";
import { formatTime, getCurrentMonth, getTotalDaysInMonth } from "@/app/utils/formatTime";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusIcon from "@/components/StatusIcon";
import StatusBadge from "@/components/StatusBadge";
import GameTitle from "@/components/GameTitle";
import TrailblazerStats from "@/components/TrailblazerStats";
import PlayerProfile from "@/components/PlayerProfile";
import PlayerStats from "@/components/PlayerStats";
import DailyReward from "@/components/DailyReward";
import StarField from "@/components/StarField";
import { Gift, Calendar, Star } from "lucide-react";

const Index = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const {
    noteData, setNoteData,
    forgottenHallData, setForgottenHallData,
    recordData, setRecordData,
    rewardData, setRewardData
  } = useStarRailStore();
  const { accountData, setAccountData } = useStarRailAccount();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCheckIn = async () => {
    const data = await fetchData("/api/hoyolab/claim");
    setIsCheckedIn(data.code === -5003);   
    
    return
  };

  const updateStatus = async () => {
    const data = await fetchData("/api/tracker");

    setIsOnline(data.isPlayingHSR as boolean);
    setLastUpdate(new Date());

    return;
  };

  const fetchUser = async () => {
    const data = await fetchData("/api/hsr");

    setNoteData(data.noteData);
    setForgottenHallData(data.forgottenHallData);
    setRecordData(data.recordData);

    return
  }

  const fetchHoyolabReward = async () => {
    const data = await fetchData("/api/hoyolab/reward");
    setRewardData(data);

    return
  }

  const fetchAccountData = async () => {
    const data = await fetchData("/api/hoyolab/hsr-account");
    setAccountData(data);

    return
  }

  useEffect(() => {
    handleCheckIn();
    fetchAccountData();
    fetchUser();
    updateStatus();
    fetchHoyolabReward();

    const checkInInterval = setInterval(handleCheckIn, 43200000);
    
    return () => clearInterval(checkInInterval);
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <StarField />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Main Status Card */}
          <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 shadow-2xl">
            <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center gap-4">
                <StatusIcon isOnline={isOnline} />
                <div className="text-white text-lg font-bold mb-5">Honkai: Star Rail</div>
              </div>

              <div className="flex gap-4 mb-3">
                <PlayerProfile playerData={accountData} />
                <PlayerStats playerData={accountData} />
              </div>

              {/* <StatusBadge isOnline={isOnline} onRefresh={handleRefresh} />

            */}
             <DailyReward 
                reward={rewardData}
                getCurrentMonth={getCurrentMonth}
                getTotalDaysInMonth={getTotalDaysInMonth}
              />

              <Button 
                onClick={handleCheckIn}
                disabled={isCheckedIn}
                  className={`w-full mb-3 h-9 transition-all duration-300 ${
                  isCheckedIn 
                    ? 'bg-gray-500 hover:bg-gray-500 text-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white'
                }`}
              >
                {isCheckedIn ? "Checked In ✓" : "Check-in HoyoLab"}
              </Button>
              {/* Last Update */}
              <p className="text-xs text-slate-400">
                Last updated: {formatTime(lastUpdate)}
              </p>
            </CardContent>
          </Card>

          <TrailblazerStats noteData={noteData} forgottenHallData={forgottenHallData} recordData={recordData}/>
        </div>
      </div>
    </div>
  );
};

export default Index;
