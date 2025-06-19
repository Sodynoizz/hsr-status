"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Star, Zap, RefreshCw, Gift } from "lucide-react";

const Index = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

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
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
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
              animationDuration: `${2 + Math.random() * 2}s`,
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
              {/* Status Icon */}
              <div className="mb-6 relative">
                <div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
                    isOnline
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30"
                      : "bg-gradient-to-br from-gray-500 to-slate-600 shadow-lg shadow-gray-500/20"
                  }`}
                >
                  {isOnline ? (
                    <Wifi className="w-10 h-10 text-white animate-pulse" />
                  ) : (
                    <WifiOff className="w-10 h-10 text-white" />
                  )}
                </div>

                {/* Pulsing ring animation when online */}
                {isOnline && (
                  <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-green-400 animate-ping opacity-30" />
                )}
              </div>

              {/* Game Title */}
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Honkai: Star Rail
                </h1>
                <div className="flex items-center justify-center gap-2 text-slate-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">Trailblazer Status</span>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <div className="mb-6 flex items-center justify-center gap-3">
                  <Badge
                    variant={isOnline ? "default" : "secondary"}
                    className={`text-base px-4 py-2 ${
                      isOnline
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-600 hover:bg-gray-700 text-gray-200"
                    }`}
                  >
                    {isOnline ? (
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Online & Exploring
                      </div>
                    ) : (
                      "Offline"
                    )}
                  </Badge>
                  
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    size="sm"
                    className="bg-slate-700/50 hover:bg-slate-600/50 border-slate-600 text-slate-300 hover:text-white"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Status Description */}
              <p className="text-slate-300 mb-6 text-sm">
                {isOnline
                  ? "Currently aboard the Astral Express, traversing the cosmos and uncovering the mysteries of the universe."
                  : "The Trailblazer is currently resting. Check back later for cosmic adventures!"}
              </p>


              {/* Last Update */}
              <p className="text-xs text-slate-400">
                Last updated: {formatTime(lastUpdate)}
              </p>
            </CardContent>
          </Card>

          {/* Additional Info Card */}
          <Card className="mt-4 bg-slate-800/40 backdrop-blur-md border-slate-700/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Trailblaze Level</span>
                <span className="text-yellow-400 font-semibold">70</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300 mt-2">
                <span>Current World</span>
                <span className="text-purple-400">Amphoreus</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
