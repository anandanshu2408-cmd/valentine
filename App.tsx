import React, { useState, useEffect, useRef } from 'react';
import { AppState } from './types';
import { AUDIO_SRC, FINAL_MESSAGE, QUESTIONS, WHATSAPP_NUMBER, VALENTINE_WISH } from './constants';
import HeartPhotoGallery from './components/HeartPhotoGallery';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.START);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isNoFloating, setIsNoFloating] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startExperience = () => {
    setState(AppState.WISH);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked, waiting for interaction", e));
      setIsPlaying(true);
    }
  };

  const proceedToQuiz = () => {
    setState(AppState.QUIZ);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeQuiz = () => {
    setState(AppState.FINAL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalYes = () => {
    const text = encodeURIComponent(FINAL_MESSAGE);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank');
  };

  const moveNoButton = () => {
    const btnWidth = 120;
    const btnHeight = 48;
    const maxX = window.innerWidth - btnWidth;
    const maxY = window.innerHeight - btnHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    setIsNoFloating(true);
    setNoButtonPos({ x: newX, y: newY });
  };

  const lastQuestion = QUESTIONS[QUESTIONS.length - 1].text;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-x-hidden">
      {/* Background Particles/Effects */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="absolute text-red-500/40 select-none pointer-events-none"
            style={{
              fontSize: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: -Math.random() * 20 + 's'
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} src={AUDIO_SRC} loop />

      {/* Main Content Area */}
      <div className="z-10 w-full flex flex-col items-center">
        {state === AppState.START && (
          <div className="text-center space-y-8 max-w-xl animate-fade-in py-12">
            <h1 className="text-5xl md:text-7xl font-romantic text-red-500 mb-4 drop-shadow-2xl">
              For My Queen
            </h1>
            <div className="my-12 scale-110">
              <HeartPhotoGallery />
            </div>
            <p className="text-lg md:text-xl text-red-200 font-serif italic mb-8 opacity-80 leading-relaxed px-4">
              A private experience designed specifically for your eyes only. Are you ready?
            </p>
            <button 
              onClick={startExperience}
              className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            >
              Open Your Heart
            </button>
          </div>
        )}

        {state === AppState.WISH && (
          <div className="max-w-3xl text-center space-y-8 animate-fade-in py-12 px-4 flex flex-col items-center">
             <div className="scale-75 md:scale-90 mb-4">
               <HeartPhotoGallery />
            </div>
            <div className="bg-red-950/30 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-red-500/20 shadow-2xl relative overflow-hidden group">
               {/* Animated Pulse Overlay */}
               <div className="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none"></div>
               
               <h2 className="text-3xl md:text-5xl font-romantic text-red-500 mb-8 drop-shadow-lg">
                 Happy Valentine's Day
               </h2>
               
               <div className="text-base md:text-xl font-serif italic text-red-50 leading-loose text-left whitespace-pre-line mb-10 transition-all duration-1000">
                 {VALENTINE_WISH}
               </div>

               <button 
                onClick={proceedToQuiz}
                className="group relative px-14 py-4 bg-transparent border-2 border-red-600 text-red-100 font-bold rounded-full text-lg transition-all overflow-hidden hover:text-white"
              >
                <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Continue to our Shadows</span>
              </button>
            </div>
          </div>
        )}

        {state === AppState.QUIZ && (
          <div className="w-full flex flex-col items-center py-8">
            <div className="mb-12 scale-90">
               <HeartPhotoGallery />
            </div>
            <Quiz onComplete={completeQuiz} />
          </div>
        )}

        {state === AppState.FINAL && (
          <div className="max-w-3xl text-center space-y-12 animate-fade-in py-12 px-2">
            <div className="scale-75 md:scale-90">
               <HeartPhotoGallery />
            </div>
            
            <div className="bg-red-950/20 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-red-600/20 shadow-[0_0_80px_rgba(153,27,27,0.3)]">
              <h2 className="text-4xl md:text-6xl font-romantic text-red-500 mb-10 drop-shadow-lg text-center">
                My Eternal Valentine
              </h2>
              <div className="text-lg md:text-2xl font-serif italic text-red-50 leading-loose text-left whitespace-pre-line px-2 md:px-6 mb-12">
                {FINAL_MESSAGE}
              </div>

              {/* Final Seal / Question 10 repeated */}
              <div className="mt-16 pt-12 border-t border-red-600/20">
                <p className="text-red-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase opacity-70 mb-8">
                  The Ultimate Commitment
                </p>
                <h3 className="text-xl md:text-2xl font-serif italic text-red-100 mb-10 px-4">
                  "{lastQuestion}"
                </h3>
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  <button
                    onClick={handleFinalYes}
                    className="px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full transition-all transform hover:scale-110 active:scale-95 shadow-[0_10px_40px_rgba(220,38,38,0.5)] z-10"
                  >
                    YES, I AM YOURS
                  </button>
                  <button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    style={isNoFloating ? { 
                      position: 'fixed', 
                      left: `${noButtonPos.x}px`, 
                      top: `${noButtonPos.y}px`,
                      zIndex: 9999,
                      transition: 'all 0.15s ease-out'
                    } : { position: 'relative' }}
                    className={`px-12 py-4 border-2 border-red-800 text-red-800 font-bold rounded-full transition-all ${isNoFloating ? 'bg-zinc-900 shadow-2xl' : ''}`}
                  >
                    NO
                  </button>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-16">
                 <div className="h-px w-16 md:w-24 bg-red-600/30 self-center"></div>
                 <span className="text-red-600 text-2xl animate-pulse">❤️‍🔥</span>
                 <div className="h-px w-16 md:w-24 bg-red-600/30 self-center"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Audio Control */}
      {state !== AppState.START && (
        <button 
          onClick={() => {
            if (audioRef.current) {
              if (isPlaying) audioRef.current.pause();
              else audioRef.current.play();
              setIsPlaying(!isPlaying);
            }
          }}
          className="fixed bottom-6 right-6 p-4 bg-red-950/80 border border-red-600/50 rounded-full z-50 text-red-500 hover:text-red-400 transition-colors shadow-lg"
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
      )}
    </div>
  );
};

export default App;
