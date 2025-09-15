import { Link } from 'react-router-dom';
import '../css/poker-tracker.css';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';
import LogSession from './log-session';
import Auth from './auth';
import PokerCat from '../pngs/pokerstatssplash.png'
import {GiReturnArrow} from 'react-icons/gi'

// idea: when  clicking into screen splash page gives two cards that represent a possible poker hand randomly

type SessionRow = {
  id: string;
  created_at: string;
  location: string;
  in: number;
  out: number;
};

  export default function PokerTracker() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [showLogForm, setShowLogForm] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const fetchSessions = async () => {
      const { data, error } = await supabase
        .from('sesh')
        .select('id, created_at, location, in, out')
        .order('created_at', { ascending: false })
      if (error) {
        setFetchError('Error fetching sessions');
        setSessions([]);
        console.log(error);
        return
      }
      if (data) {
        setSessions(data);
        setFetchError(null);
      }
    };
    fetchSessions();

    // Remove the auth subscription
    return () => subscription.unsubscribe();
  }, []);

  const addNewSession = (newSession: SessionRow) => {
    setSessions([newSession, ...sessions]);
    setShowLogForm(false);
  };

  const handleLogin = (user: any) => {
    setUser(user);
    setShowAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleLogSessionClick = () => {
    if (user) {
      setShowLogForm(true);
    } else {
      setShowAuth(true);
    }
  };

  const totals = {
    profit: sessions.reduce((sum, s) => sum + (s.out - s.in), 0),
    invested: sessions.reduce((sum, s) => sum + s.in, 0),
  };

  const currency = (n: number) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="poker">
      <div className="title">
      <div className="return">
          <Link to={"/life"} className='symbol'>
            <GiReturnArrow />
          </Link>
      </div>
        <h1>Poker Tracker v1</h1>
        <img src={PokerCat} alt="SplashArt" className="pokercat" />
        <div className="spacer" />
        <div className="auth-controls">
          {user ? (
            <>
              <span className="user-info">Welcome, {user.email}</span>
              <button className="secondary" onClick={handleLogout}>Logout</button>
              <button className="primary" onClick={handleLogSessionClick}>Log Session</button>
            </>
          ) : (
            <button className="primary" onClick={handleLogSessionClick}>Log Session</button>
          )}
        </div>
      </div>

      {fetchError && (
        <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', margin: '16px 0' }}>
          Error: {fetchError}
        </div>
      )}

      <div className="totals">
        <div><span>PNL</span><strong className={totals.profit >= 0 ? 'pos' : 'neg'}>{currency(totals.profit)}</strong></div>
        <div><span>Total Invested</span><strong>{currency(totals.invested)}</strong></div>
        <div>page still a wip</div>
      </div>

      <div className="deck table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>In</th>
              <th>Out</th>
              <th>Profit</th>
              <th></th>
            </tr>
          </thead>
            <tbody>
              {sessions && sessions.map((session: SessionRow) => (
                <tr key={session.id}>
                  <td>{new Date(session.created_at).toLocaleDateString("en-US")}</td>
                  <td>{session.location}</td>
                  <td>{currency(session.in)}</td>
                  <td>{currency(session.out)}</td>
                  <td className={(session.out - session.in) >= 0 ? 'pos' : 'neg'}>
                    {currency(session.out - session.in)}
                  </td>
                  <td>
                    {user && (
                      <button className="delete" onClick={async () => {
                        if (confirm('Delete this session?')) {
                          const { error } = await supabase
                            .from('sesh')
                            .delete()
                            .eq('id', session.id);
                          if (!error) {
                            setSessions(sessions.filter(s => s.id !== session.id));
                          }
                        }
                      }}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sessions.length === 0 && <div className="empty">No sessions logged.</div>}
        </div>

        {showLogForm && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-card">
              <div className="modal-header">
                <h2>Log New Session</h2>
                <button className="icon" onClick={() => setShowLogForm(false)}>✕</button>
              </div>
              <div className="modal-body">
                <LogSession onSessionAdded={addNewSession} onCancel={() => setShowLogForm(false)} />
              </div>
            </div>
          </div>
        )}

        {showAuth && (
          <Auth onLogin={handleLogin} onClose={() => setShowAuth(false)} />
        )}
      </div>
    );
}