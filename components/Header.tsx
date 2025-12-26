
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'}`}>
      <div className="flex items-center space-x-12">
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-2xl md:text-3xl font-netflix tracking-tight text-red-600 italic uppercase">
            TV<span className="text-white ml-2">LOKAL</span>
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-6 text-[13px] font-semibold text-zinc-300">
          <a href="#" className="text-white hover:text-red-500 transition-colors">Beranda</a>
          <a href="#" className="hover:text-red-500 transition-colors">Acara TV</a>
          <a href="#" className="hover:text-red-500 transition-colors">Film</a>
          <a href="#" className="hover:text-red-500 transition-colors">Terbaru</a>
          <a href="#" className="hover:text-red-500 transition-colors">Daftar Saya</a>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-[10px] md:text-[12px] font-bold text-white hover:text-red-500 transition-colors tracking-[2px] uppercase">
            Selamat Menonton
        </button>
      </div>
    </nav>
  );
};

export default Header;
