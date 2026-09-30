import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { ShieldAlert, Fingerprint, Lock } from 'lucide-react';

export default function Login() {
  const [step, setStep] = useState(1);
  const [officerId, setOfficerId] = useState('');
  const [code, setCode] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (officerId.length > 3) setStep(2);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      login(code);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-card border border-surface-outline overflow-hidden">
        <div className="bg-navy p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-teal-tint" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-white tracking-wide">SAHAYAK</h1>
          <p className="text-teal-tint font-sans mt-2">Personnel Wellbeing Portal</p>
        </div>
        
        <div className="p-8">
          {step === 1 ? (
            <form onSubmit={handleNext} className="space-y-6">
              <div>
                <label className="block text-sm font-sans font-semibold text-slate-dark mb-2">Officer Service ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Fingerprint className="h-5 w-5 text-slate" />
                  </div>
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-surface-outline rounded-md font-sans focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-all h-10"
                    placeholder="Enter ID (e.g. WO-204)"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-teal text-white font-sans font-semibold py-2 px-4 rounded-md hover:bg-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal h-10"
              >
                Continue securely
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-sans font-semibold text-slate-dark mb-2">2FA Security Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-surface-outline rounded-md font-sans tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent h-10"
                    placeholder="000000"
                    required
                  />
                </div>
                <p className="text-xs text-slate mt-2 text-center">Enter any 6-digit code for this prototype.</p>
              </div>
              <button
                type="submit"
                className="w-full bg-teal text-white font-sans font-semibold py-2 px-4 rounded-md hover:bg-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal h-10"
              >
                Verify & Login
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-slate-dark font-sans font-semibold py-2 px-4 rounded-md border border-navy hover:bg-porcelain transition-colors h-10"
              >
                Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
