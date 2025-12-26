
import React, { useState } from 'react';
import { Channel } from '../types';

interface ChannelCardProps {
  channel: Channel;
  isActive: boolean;
  onSelect: (channel: Channel) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isActive, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative flex-none group w-full">
      <button
        onClick={() => onSelect(channel)}
        className={`relative w-full aspect-video rounded-sm overflow-hidden shadow-xl card-transition bg-[#1a1a1a] border border-white/5 ${
          isActive ? 'ring-1 ring-red-600 ring-offset-2 ring-offset-[#141414]' : ''
        }`}
      >
        {/* Konten Card */}
        <div className={`absolute inset-0 flex items-center justify-center p-4 ${channel.color} bg-opacity-5 transition-all duration-500 group-hover:bg-opacity-10`}>
          {!imgError ? (
            <img 
              src={channel.logo} 
              alt={channel.name} 
              onError={() => setImgError(true)}
              className="max-w-[65%] max-h-[65%] object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-2xl font-netflix italic tracking-tighter text-zinc-400 group-hover:text-white transition-colors">
                {channel.name}
              </span>
              <div className="w-6 h-0.5 bg-red-600 mt-1 rounded-full opacity-30 group-hover:opacity-100"></div>
            </div>
          )}
        </div>

        {/* Info Saat Hover Overlay Minimalis */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-2.5 text-left">
           <h4 className="font-bold text-[10px] text-white tracking-wide truncate">{channel.name} HD</h4>
        </div>
      </button>

      {/* Indikator Active - Garis bawah kecil */}
      {isActive && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4">
            <div className="h-0.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
        </div>
      )}
    </div>
  );
};

export default ChannelCard;
