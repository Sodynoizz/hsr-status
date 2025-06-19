import { Star } from "lucide-react";

const GameTitle = () => {
  return (
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
  );
};

export default GameTitle;
