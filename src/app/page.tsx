"use client";

import { useState, useEffect } from "react";

import useStarRailStore from "@/app/hooks/starrail";
import { fetchData } from "@/app/utils/fetch";
import { formatTime, getCurrentMonth, getTotalDaysInMonth } from "@/app/utils/formatTime";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusIcon from "@/components/StatusIcon";
import StatusBadge from "@/components/StatusBadge";
import GameTitle from "@/components/GameTitle";
import TrailblazerStats from "@/components/TrailblazerStats";
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

  useEffect(() => {
    handleCheckIn();
    fetchUser();
    updateStatus();
    fetchHoyolabReward();

    const checkInInterval = setInterval(handleCheckIn, 43200000);
    
    return () => clearInterval(checkInInterval);
  }, []);

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
                  ? "ขณะนี้ผู้เล่นกำลังออนไลน์อยู่ กรุณารอสักครู่" 
                  : "ตอนนี้ผู้เล่นกำลังออฟไลน์อยู่ สามารถเข้าเล่นเกมได้เลยคับ"
                }
              </p>
              
              <div className="bg-slate-900/40 rounded-lg p-3 mb-4 border border-slate-600/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-4 h-4 text-yellow-400" />
                  <span className="text-base font-medium text-slate-200">HoYoLAB Today's Reward</span>
                </div>
                 <div className="flex items-center justify-center gap-2 mb-3">
                  <img 
                    src={rewardData.reward.icon} 
                    alt="Stellar Jade"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-yellow-400 font-normal text-sm">{rewardData.reward.name} (x{rewardData.reward.cnt})</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{getCurrentMonth()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-blue-400" />
                    <span>{rewardData.total_sign_day}/{getTotalDaysInMonth()} days</span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-2 bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(rewardData.total_sign_day / getTotalDaysInMonth()) * 100}%` }}
                  />
                </div>
              </div>

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
