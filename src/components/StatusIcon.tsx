import { Wifi, WifiOff } from "lucide-react";

interface StatusIconProps {
  isOnline: boolean;
}

const StatusIcon = ({ isOnline }: StatusIconProps) => {
  return (
    <div className="mb-6 relative">
      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-500 ${
        isOnline 
          ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/30' 
          : 'bg-gradient-to-br from-gray-500 to-slate-600 shadow-lg shadow-gray-500/20'
      }`}>
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
  );
};

export default StatusIcon;