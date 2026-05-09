import { GameCard } from '../components/GameCard';
import { motion } from 'framer-motion';
import { useCasino } from '../context/CasinoContext';
import { useEffect, useState, useCallback, useRef } from 'react';

import { AmbientMotes } from '../components/AmbientMotes';

export const Lobby = ({ onSelectGame }: { onSelectGame: (id: string) => void }) => {
  const { history } = useCasino();
  const [isMuted, setIsMuted] = useState(false);

  // Wrap onSelectGame: proceed
  const handleSelectGame = useCallback((id: string) => {
    onSelectGame(id);
  }, [onSelectGame]);



  // ── Lobby audio: create once, pause/play on mute toggle ──
  const lobbyAudioRef = useRef<HTMLAudioElement | null>(null);

  // A helper to safely attempt playback
  const attemptPlay = useCallback(() => {
    if (lobbyAudioRef.current && !isMuted) {
      lobbyAudioRef.current.play().catch(e => {
        console.warn("Lobby audio blocked, will retry on interaction:", e);
      });
    }
  }, [isMuted]);

  useEffect(() => {
    const audio = new Audio('/the_mountain-casino-158087.mp3');
    audio.loop = true;
    audio.volume = 0.5; // Slightly lower for atmosphere
    lobbyAudioRef.current = audio;

    attemptPlay();

    // Listen for any click to try and resume (backup for strict browsers)
    const handleInteraction = () => {
      if (audio.paused && !isMuted) attemptPlay();
      window.removeEventListener('mousedown', handleInteraction);
    };
    window.addEventListener('mousedown', handleInteraction);

    return () => {
      audio.pause();
      audio.src = '';
      lobbyAudioRef.current = null;
      window.removeEventListener('mousedown', handleInteraction);
    };
  }, [attemptPlay]);

  useEffect(() => {
    const audio = lobbyAudioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.pause();
    } else {
      attemptPlay();
    }
  }, [isMuted, attemptPlay]);

  const games = [
    { id: 'leduc_vis', title: 'RL VISUALIZER', description: 'Watch: AI Agent VS Aggressive Bot', color: '#00f5d4', img: '/poker.png' }
  ];

  return (
    <>
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>

        {/* ── High-Fidelity HDR Background ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
          background: '#020002'
        }}>
          {/* Main Background Image */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/Gemini_Generated_Image_893jlh893jlh893j.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.2) contrast(1.1) brightness(1.0)', // Restored
            transform: 'scale(1.01)',
          }} />

          {/* Global Glow Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, transparent 20%, rgba(2,0,5,0.7) 100%)',
            mixBlendMode: 'multiply'
          }} />

          {/* Enhanced Sparkles/3D Motes */}
          <AmbientMotes count={180} />

          {/* Deep Vignette Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at center, transparent -10%, rgba(0,0,0,0.95) 105%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 1, padding: '20px 20px 60px', maxWidth: '1200px', margin: '0 auto' }}>

          {/* Simplified Header matching image */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <motion.h1
              className="cinzel-font"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '4.5rem',
                color: '#ffffff',
                letterSpacing: '8px',
                textShadow: '0 0 30px rgba(255,255,255,0.2)',
                fontWeight: 400
              }}
            >
              THE VIP LOUNGE
            </motion.h1>

            <motion.h2
              className="dancing-font"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                color: 'var(--neon-gold)',
                fontSize: '2.2rem',
                marginTop: '-10px',
                textShadow: '0 0 15px var(--neon-gold)',
                fontWeight: 400
              }}
            >
              Elegance. Exclusivity. Fortune.
            </motion.h2>
          </div>

          {/* Game grid - 3 columns, making them smaller to show background */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {games.map((game, index) => (
              <div key={game.id} style={{
                position: 'relative'
              }}>
                {/* High-Intensity Neon Frame for ALL cards now */}
                <div style={{
                  position: 'absolute', inset: '-8px',
                  borderRadius: '20px',
                  padding: '4px',
                  background: `linear-gradient(90deg, ${game.color}, var(--neon-magenta), ${game.color})`,
                  backgroundSize: '300% 300%',
                  animation: 'neonSweep 4s linear infinite',
                  filter: 'blur(8px) brightness(1.2)',
                  opacity: 0.5,
                  zIndex: 0
                }} />
                <GameCard
                  title={game.title}
                  description={game.description}
                  imageColor={game.color}
                  imgUrl={game.img}
                  onClick={() => handleSelectGame(game.id)}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>

          {/* ── Transaction Archive Log ── */}
          <div style={{ marginTop: '80px', width: '100%', maxWidth: '1000px', margin: '80px auto 0' }}>
            <div className="orbitron-font" style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', letterSpacing: '8px', marginBottom: '32px', borderLeft: '4px solid var(--neon-cyan)', paddingLeft: '15px' }}>
              TRANSACTION ARCHIVE // RECENT OPERATIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {history.slice(0, 7).map((h, i) => {
                const gameColor =
                  h.game === 'Slotopia' ? 'var(--neon-magenta)' :
                    h.game === 'Roulette' ? 'var(--neon-gold)' :
                      h.game === 'Blackjack' ? 'var(--neon-cyan)' :
                        h.game === 'Poker' ? 'var(--neon-purple)' :
                          'var(--neon-blue)';

                const isWin = h.outcome === 'WIN';
                const isPush = h.outcome === 'PUSH';

                return (
                  <motion.div
                    key={`log-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-panel"
                    style={{
                      padding: '20px 32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: `3px solid ${gameColor}`,
                      background: 'rgba(5, 5, 10, 0.85)', // Much darker, more opaque to prevent 'camouflage'
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: `0 4px 15px rgba(0,0,0,0.4), inset 5px 0 15px -5px ${gameColor}44`,
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                      <div className="orbitron-font" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', width: '70px' }}>
                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="title-font" style={{ fontSize: '1.2rem', color: gameColor, textShadow: `0 0 10px ${gameColor}aa`, letterSpacing: '2px' }}>
                        {h.game.toUpperCase()}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: isWin ? 'var(--neon-cyan)' : isPush ? 'var(--neon-gold)' : '#ff4466',
                        letterSpacing: '3px',
                        textShadow: !isWin && !isPush ? '0 0 10px rgba(255, 68, 102, 0.4)' : 'none'
                      }}>
                        {h.outcome}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginBottom: '4px' }}>BET</div>
                        <div style={{ fontSize: '1rem', color: '#fff', fontWeight: 600 }}>${h.bet}</div>
                      </div>
                      <div style={{ textAlign: 'right', minWidth: '120px' }}>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', marginBottom: '4px' }}>NET RESULT</div>
                        <div className="orbitron-font" style={{
                          fontSize: '1.3rem',
                          fontWeight: 900,
                          color: isWin ? 'var(--neon-cyan)' : isPush ? 'var(--neon-gold)' : '#ff4466',
                          textShadow: `0 0 15px ${isWin ? 'rgba(0,245,212,0.4)' : isPush ? 'rgba(255,190,11,0.4)' : 'rgba(255, 68, 102, 0.4)'}`
                        }}>
                          {isWin ? '+' : ''}{h.net < 0 ? `-` : ''}${Math.abs(h.net)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <style>{`
          @keyframes neonSweep {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        </div>
      </div>

      {/* ── Mute/Unmute Toggle (Localized) ── */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 100,
          background: 'rgba(0,0,0,0.5)', border: '1px solid var(--neon-gold)',
          borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--neon-gold)', boxShadow: '0 0 18px rgba(255,190,11,0.3)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s',
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>{isMuted ? '🔇' : '🔊'}</span>
      </button>
    </>
  );
};
