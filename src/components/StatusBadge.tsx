import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, RefreshCw } from "lucide-react";

interface StatusBadgeProps {
  isOnline: boolean;
  onRefresh: () => void;
}

const StatusBadge = ({ isOnline, onRefresh }: StatusBadgeProps) => {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <Badge 
        variant={isOnline ? "default" : "secondary"}
        className={`text-base px-4 py-2 ${
          isOnline 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
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
        onClick={onRefresh}
        variant="outline"
        size="sm"
        className="bg-slate-700/50 hover:bg-slate-600/50 border-slate-600 text-slate-300 hover:text-white"
      >
        <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default StatusBadge;