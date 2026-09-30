import React, { useState, useEffect } from 'react'
import CommanderDashboard from './components/CommanderDashboard'
import WelfareDashboard from './components/WelfareDashboard'
import SplitFlapText from './components/SplitFlapText'
import { ShieldCheck, Cross, Menu, LogOut, Lock } from 'lucide-react'

function App() {
  const [user, setUser] = useState(null) // null, 'commander', or 'welfare'
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (cleanUsername === 'commander' && password === 'password123') {
      startAuthentication('commander');
    } else if (cleanUsername === 'welfare' && password === 'password123') {
      startAuthentication('welfare');
    } else {
      setLoginError('Invalid credentials. Try commander/password123 or welfare/password123');
    }
  };

  const startAuthentication = (role) => {
    setLoginError('');
    setIsAuthenticating(true);
    // Simulate a network delay that perfectly matches the animation cycle
    setTimeout(() => {
      setIsAuthenticating(false);
      setUser(role);
    }, 4500); // 4.5 seconds to allow full cycle
  };

  const handleLogout = () => {
    fetch('http://localhost:8001/api/auth/logout', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(null);
          setUsername('');
          setPassword('');
        }
      })
      .catch(err => {
        // Fallback local logout if backend fails
        setUser(null);
      });
  };

  if (isAuthenticating) {
    return (
      <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <div className="flex flex-col items-center gap-6">
          <ShieldCheck size={64} className="text-primary" />
          <SplitFlapText
            words={['SECURE UPLINK ESTABLISHED', 'VERIFYING CLEARANCE LEVEL', 'DECRYPTING WELFARE DATA']}
            flipDuration={0.08}
            stagger={0.04}
            cycleDelay={1500}
            charset="alphanumeric"
            flipsPerChar={8}
            tileColor="var(--surface)"
            textColor="var(--primary)"
            tileRadius={8}
            gap={6}
            fontSize={42}
            loop={false}
            padTo={25}
          />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-container flex items-center justify-center" style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <div className="card flex flex-col gap-4" style={{ width: '400px', maxWidth: '100%', padding: '2rem' }}>
          <div className="flex flex-col items-center mb-4">
            <ShieldCheck size={48} className="text-primary mb-2" />
            <h2 className="text-center">WELLGUARD</h2>
            <p className="text-muted text-center text-sm">Force Readiness & Welfare System</p>
          </div>

          {loginError && (
            <div className="p-3 text-sm text-danger" style={{ background: 'var(--danger-bg)', borderRadius: '8px', borderLeft: '4px solid var(--danger)' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white' }}
                placeholder="commander or welfare"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-muted">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'white' }}
                placeholder="password123"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2 flex items-center justify-center gap-2">
              <Lock size={16} /> Secure Login
            </button>
          </form>

          <div className="mt-4 p-3 text-xs text-muted" style={{ background: 'var(--surface-hover)', borderRadius: '8px' }}>
            <p><strong>Demo Credentials:</strong></p>
            <p>Commander: <code>commander</code> / <code>password123</code></p>
            <p>Welfare Officer: <code>welfare</code> / <code>password123</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck size={32} className="text-primary" />
          <div>
            <h3 style={{lineHeight: 1.2}}>WELLGUARD</h3>
            <span className="text-muted text-sm">Force Readiness</span>
          </div>
        </div>

        <div className="text-muted text-sm font-semibold mb-2 mt-4 uppercase tracking-wider">
          Active Role
        </div>
        
        {user === 'commander' && (
          <div className="nav-item active mb-2">
            <Menu size={18} />
            Commander View
          </div>
        )}
        
        {user === 'welfare' && (
          <div className="nav-item active mb-2">
            <Cross size={18} />
            Welfare Officer View
          </div>
        )}

        <div style={{marginTop: 'auto'}} className="flex flex-col gap-4">
          <div className="p-3 flex flex-col gap-2" style={{background: 'var(--surface-hover)', borderRadius: '8px', fontSize: '0.8rem'}}>
            <strong className="text-primary">Privacy Architecture</strong>
            <p className="text-muted">
              Role-based access is active. {user === 'commander' ? 'Commanders only see aggregated unit data.' : 'Welfare officers see actionable AI alerts.'}
            </p>
          </div>
          <button className="btn btn-outline text-danger w-full" style={{justifyContent: 'center', borderColor: 'var(--border)'}} onClick={handleLogout}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Dashboard Area */}
      <main className="main-content">
        {user === 'commander' ? <CommanderDashboard /> : <WelfareDashboard />}
      </main>
    </div>
  )
}

export default App
