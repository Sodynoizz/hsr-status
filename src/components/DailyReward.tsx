import { HoyolabReward } from "@/app/types/starrail";
import { Gift, Calendar, Star } from "lucide-react";

interface DailyRewardProps {
  reward: HoyolabReward;
  getCurrentMonth: () => string;
  getTotalDaysInMonth: () => number;
}

const DailyReward = ({ 
  reward,
  getCurrentMonth, 
  getTotalDaysInMonth 
}: DailyRewardProps) => {
  return (
    <div className="bg-slate-900/40 rounded-lg p-3 mb-4 border border-slate-600/30">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Gift className="w-4 h-4 text-yellow-400" />
        <span className="text-sm font-medium text-slate-200">Today's Reward</span>
      </div>
      
      {/* Reward with image */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <img 
          src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=40&h=40&fit=crop&crop=center" 
          alt="Stellar Jade"
          className="w-8 h-8 rounded-full object-cover border border-yellow-400/30"
        />
        <p className="text-yellow-400 font-semibold text-sm">{reward.reward.name} (x{reward.reward.cnt})</p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{getCurrentMonth()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-blue-400" />
          <span>{reward.total_sign_day}/{getTotalDaysInMonth()} days</span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 bg-slate-700 rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${(reward.total_sign_day / getTotalDaysInMonth()) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default DailyReward;