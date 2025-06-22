import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlayerData {
  uid: string;
  nickname: string;
  signature: string;
  avatar: {
    icon: string,
    name: string;
  };
}

interface PlayerProfileProps {
  playerData: PlayerData;
}

const PlayerProfile = ({ playerData }: PlayerProfileProps) => {
  return (
    <div className="flex-1 text-left bg-slate-900/40 rounded-lg p-4 border border-slate-600/30 shadow-lg">
      <div className="flex items-start gap-2 mb-2">
        <img 
          src={`https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/${playerData.avatar.icon}`} 
          alt={playerData.avatar.name}
          className="w-10 h-10 rounded-full object-cover border-2 flex-shrink-0"
        />
        <div className="min-w-0">
          <h2 className="text-white font-semibold text-base truncate">{playerData.nickname}</h2>
          <p className="text-slate-300 font-normal text-xs">UID: {playerData.uid}</p>
        </div>
      </div>
      <p className="text-slate-300 text-xs italic leading-tight mb-3 mt-3">"{playerData.signature}"</p>
    </div>
  );
};

export default PlayerProfile;