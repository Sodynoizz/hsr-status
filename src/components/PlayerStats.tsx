import { User, Trophy, SquareUserRound, Gamepad2 } from "lucide-react";

interface PlayerData {
  level: number;
  world_level: number;
  space_info: {
    achievement_count: number;
    avatar_count: number;
  };
}

interface PlayerStatsProps {
  playerData: PlayerData;
}

const PlayerStats = ({ playerData }: PlayerStatsProps) => {
  return (
    <div className="flex-1">
      <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-600/30">
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-blue-400" />
              <span className="text-slate-300 text-xs">Level</span>
            </div>
            <span className="text-white font-semibold">{playerData.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Gamepad2 className="w-3 h-3 text-purple-400" />
              <span className="text-slate-300 text-xs">World</span>
            </div>
            <span className="text-white font-semibold">{playerData.world_level}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Trophy className="w-3 h-3 text-yellow-400" />
              <span className="text-slate-300 text-xs truncate-4">Achievem.</span>
            </div>
            <span className="text-white font-semibold">{playerData.space_info.achievement_count}</span>
          </div>
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <SquareUserRound className="w-3 h-3 text-green-400" />
              <span className="text-slate-300 text-xs">Characters</span>
            </div>
            <span className="text-white font-semibold">{playerData.space_info.avatar_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;