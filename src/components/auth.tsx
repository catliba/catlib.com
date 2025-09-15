import { useState } from 'react';
import supabase from '../config/supabaseClient';
import '../css/poker-tracker.css';

interface AuthProps {
  onLogin: (user: any) => void;
  onClose: () => void;
}

export default function Auth({ onLogin, onClose }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('You are not catlib are you...');
      } else if (data.user) {
        onLogin(data.user);
      }
    } catch (err) {
      setError('You are not catlib are you...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-overlay' onClick={onClose}>
        <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-card">
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="auth-header">
                <h2>Catlib Authentication</h2>
                <p>Can I run good for once please</p>
                </div>
                <form onSubmit={handleLogin} className="auth-form">
                <label>
                    Email
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    />
                </label>
                <label>
                    Password
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    />
                </label>
                <button type="submit" disabled={loading} className="primary">
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    </div>
  );
}
