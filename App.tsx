
import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ChannelCard from './components/ChannelCard';
import { CHANNELS } from './constants';
import { Channel } from './types';
import { getAIRecommendations, getProgramVibe } from './services/geminiService';

const App: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<Channel>(CHANNELS[0]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [channelVibe, setChannelVibe] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    async function initAI() {
      const insights = await getAIRecommendations();
      setAiInsights(insights);
    }
    initAI();
  }, []);

  useEffect(() => {
    setLogoError(false);
    async function fetchVibe() {
      const vibe = await getProgramVibe(activeChannel.name);
      setChannelVibe(vibe || "");
    }
    fetchVibe();
  }, [activeChannel]);

  const activeInsight = useMemo(() => 
    aiInsights.find(i => i.channelId === activeChannel.id)?.insight, 
  [aiInsights, activeChannel]);

  const handleSelect = (c: Channel) => {
    setActiveChannel(c);
    setIsPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden flex flex-col">
      <Header />

      {/* Hero / Player Section */}
      <section className="relative w-full bg-black flex-shrink-0">
        <div className={`video-aspect ${!isPlaying ? 'h-[55vh] md:h-[75vh]' : 'h-auto'}`}>
          {isPlaying ? (
            <div className="absolute inset-0 w-full h-full bg-black flex flex-col">
              <div className="relative w-full h-full">
                <iframe
                  key={activeChannel.id}
                  src={activeChannel.streamUrl}
                  title={activeChannel.name}
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                ></iframe>
                
                {/* Floating Exit Button */}
                <div className="absolute top-20 right-4 md:right-10 z-[60]">
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="group flex items-center space-x-2 bg-black/60 hover:bg-white text-white hover:text-black backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/20 transition-all duration-300 shadow-2xl"
                  >
                    <i className="fa-solid fa-xmark text-xs"></i>
                    <span className="text-[9px] font-black uppercase tracking-widest">Tutup</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className={`w-full h-full transition-all duration-1000 ${activeChannel.color} bg-opacity-10`}>
                <div className="absolute inset-0 hero-vignette"></div>
                <div className="absolute inset-0 hero-bottom-vignette"></div>
                
                {/* Visual Background Text */}
                <div className="h-full flex items-center justify-center opacity-[0.01] select-none font-netflix italic text-[35vw] leading-none pointer-events-none">
                  {activeChannel.name}
                </div>

                {/* Hero Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl pt-10">
                  <div className="flex items-center space-x-2 mb-3">
                       <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                       <span className="uppercase text-[9px] font-black tracking-[4px] text-zinc-400">Siaran Langsung</span>
                  </div>

                  <div className="mb-4">
                      {!logoError ? (
                        <img 
                          src={activeChannel.logo} 
                          alt={activeChannel.name}
                          onError={() => setLogoError(true)}
                          className="max-h-12 md:max-h-20 lg:max-h-28 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,1)]"
                        />
                      ) : (
                        <h1 className="text-4xl md:text-7xl font-netflix italic tracking-tighter text-white drop-shadow-2xl">
                          {activeChannel.name}
                        </h1>
                      )}
                  </div>

                  <p className="text-zinc-400 text-[10px] md:text-base font-medium leading-relaxed drop-shadow-lg max-w-xl mb-6 line-clamp-2 md:line-clamp-3">
                    {channelVibe || activeChannel.description}
                  </p>

                  <div className="flex items-center space-x-2.5">
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="flex items-center space-x-2 px-6 md:px-10 py-2 md:py-3 bg-white text-black rounded-sm font-bold hover:bg-zinc-300 transition-all transform active:scale-95 shadow-xl"
                    >
                      <i className="fa-solid fa-play text-sm md:text-base"></i>
                      <span className="text-xs md:text-base font-black uppercase">Putar</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 md:px-10 py-2 md:py-3 bg-zinc-500/20 backdrop-blur-xl text-white rounded-sm font-bold hover:bg-zinc-500/40 transition-all transform active:scale-95 border border-white/5">
                      <i className="fa-solid fa-circle-info text-sm md:text-base"></i>
                      <span className="text-xs md:text-base font-black uppercase">Informasi</span>
                    </button>
                  </div>

                  {activeInsight && (
                    <div className="mt-6 border-l-2 border-red-600 pl-4 py-1.5 bg-red-600/5 rounded-r max-w-sm">
                      <p className="text-[9px] md:text-[11px] text-zinc-500 font-medium italic">"{activeInsight}"</p>
                    </div>
                  )}
                </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content Dashboard */}
      <main className={`relative z-20 flex-grow bg-[#141414] transition-all duration-700 ${isPlaying ? 'pt-6' : '-mt-10 md:-mt-16 lg:-mt-24'}`}>
        
        {/* Grid Vertikal: TV Lokal */}
        <section className="px-6 md:px-12 lg:px-24 mb-20">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-0.5 h-4 bg-red-600 rounded-full"></div>
            <h2 className="text-xs md:text-lg font-black text-zinc-300 tracking-[3px] uppercase font-netflix">Saluran TV Lokal</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {CHANNELS.map(channel => (
              <ChannelCard 
                key={channel.id}
                channel={channel}
                isActive={activeChannel.id === channel.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-[#141414] py-12 px-6 border-t border-zinc-900/30">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-8">
           <div className="flex space-x-10 text-xl text-zinc-700">
               <i className="fa-brands fa-facebook-f hover:text-white cursor-pointer transition-all"></i>
               <i className="fa-brands fa-instagram hover:text-white cursor-pointer transition-all"></i>
               <i className="fa-brands fa-youtube hover:text-white cursor-pointer transition-all"></i>
           </div>
           
           <div className="text-zinc-600 text-[9px] md:text-[10px] text-center space-y-4 tracking-[3px] font-bold uppercase">
               <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                   <span className="hover:text-white cursor-pointer">Bantuan</span>
                   <span className="hover:text-white cursor-pointer">Privasi</span>
                   <span className="hover:text-white cursor-pointer">Kontak</span>
               </div>
               <p className="opacity-30 tracking-[1px]">&copy; 2024 TV LOKAL PREMIUM. ANTARMUKA ELEGAN.</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;