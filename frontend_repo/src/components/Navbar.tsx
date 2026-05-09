import { useState } from 'react';
import { useCasino } from '../context/CasinoContext';

import { User, LogOut, Trophy, BarChart3, DollarSign, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Leaderboard } from './Leaderboard';

export const Navbar = ({ onOpenReport, onGoToLobby }: { onOpenReport: () => void; onGoToLobby: () => void }) => {
  const { user, logout } = useCasino();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (!user) return null;

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel elevation-1"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 32px',
          margin: '24px 32px',
          position: 'sticky',
          top: '24px',
          zIndex: 100,
          borderRadius: '16px'
        }}
      >
        <div 
          onClick={onGoToLobby}
          className="title-font neon-text-cyan" 
          style={{ fontSize: '2.5rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
           <span style={{ color: 'var(--text-primary)', textShadow: 'none' }}>NEON</span> VEGAS
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          


          <button
            onClick={() => setShowLeaderboard(true)}
            className="neon-button magenta"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '1rem'
            }}
          >
            <Trophy size={18} />
            RANKS
          </button>

          <button
            onClick={onOpenReport}
            className="neon-button gold"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '1rem'
            }}
          >
            <BarChart3 size={18} />
            REPORTS
          </button>

          <button
            onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
            className="neon-button purple"
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '1rem',
              backgroundImage: 'linear-gradient(90deg, rgba(155, 93, 229, 0.2), transparent)',
              border: '1px solid var(--neon-purple)',
              boxShadow: '0 0 15px rgba(155, 93, 229, 0.4)'
            }}
          >
            <Bot size={18} />
            CYBERBOT UPLINK
          </button>

          <div className="flex-center" style={{ gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--neon-cyan)', boxShadow: 'inset 0 2px 10px rgba(0,245,212,0.1)' }}>
            <User size={18} color="var(--neon-cyan)" />
            <span style={{ fontWeight: 600, letterSpacing: '1px' }}>{user.username}</span>
          </div>

          <div className="flex-center" style={{ gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--neon-gold)', boxShadow: 'inset 0 2px 10px rgba(255,190,11,0.1)' }}>
            <DollarSign size={18} color="var(--neon-gold)" />
            <span className="neon-text-gold" style={{ fontWeight: 800, fontSize: '1.1rem' }}>
              {user.balance.toLocaleString()}
            </span>
          </div>

          <button 
            onClick={logout}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              transition: 'all 0.2s',
            }}
            title="Logout"
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--neon-magenta)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <LogOut size={24} />
          </button>
        </div>
      </motion.nav>

      <Leaderboard isOpen={showLeaderboard} onClose={() => setShowLeaderboard(false)} />
    </>
  );
};
