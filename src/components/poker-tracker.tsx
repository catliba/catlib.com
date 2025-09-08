import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/poker-tracker.css';

type GameType = 'cash' | 'tournament';

interface PokerSession {
  id: string;
  date: string; 
  location: string;
  buyIn: number;
  cashOut: number;
  notes?: string;
}

const STORAGE_KEY = 'poker_sessions_v1';

function loadSessions(): PokerSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as PokerSession[];
    return [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: PokerSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export default function PokerTracker() {
  const [sessions, setSessions] = useState<PokerSession[]>(loadSessions());
  const [form, setForm] = useState<Omit<PokerSession, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    location: '',
    buyIn: 0,
    cashOut: 0,
    notes: ''
  });

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  const totals = useMemo(() => {
    const profit = sessions.reduce((sum, s) => sum + (s.cashOut - s.buyIn), 0);
    const invested = sessions.reduce((sum, s) => sum + s.buyIn, 0);
    const roi = invested > 0 ? (profit / invested) * 100 : 0;
    return { profit, invested, roi };
  }, [sessions]);

  const addSession = () => {
    if (!form.location) return;
    const newSession: PokerSession = { id: crypto.randomUUID(), ...form };
    setSessions([newSession, ...sessions]);
    setForm({ ...form, location: '', buyIn: 0, cashOut: 0, notes: '' });
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const currency = (n: number) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="poker">
      <div className="title">
        <Link to={"/aboutcatlib"} className='back'>← Back</Link>
        <h1>Poker Income Tracker</h1>
      </div>

      <div className="totals">
        <div><span>Total Profit</span><strong className={totals.profit >= 0 ? 'pos' : 'neg'}>{currency(totals.profit)}</strong></div>
        <div><span>Total Invested</span><strong>{currency(totals.invested)}</strong></div>
        <div><span>ROI</span><strong className={totals.roi >= 0 ? 'pos' : 'neg'}>{totals.roi.toFixed(1)}%</strong></div>
      </div>

      <div className="card form">
        <div className="row">
          <label>Date
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          </label>
          <label>Location
            <input type="text" placeholder="Casino / Home / Online" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          </label>
        </div>
        <div className="row">
          <label>Buy-in
            <input type="number" inputMode="numeric" value={form.buyIn} onChange={e => setForm({ ...form, buyIn: Number(e.target.value) })} />
          </label>
          <label>Cash-out / Winnings
            <input type="number" inputMode="numeric" value={form.cashOut} onChange={e => setForm({ ...form, cashOut: Number(e.target.value) })} />
          </label>
          <label className="notes">Notes
            <input type="text" placeholder="Brief notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          </label>
          <button className="add" onClick={addSession}>Add Session</button>
        </div>
      </div>

      <div className="card table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Game</th>
              <th>Buy-in</th>
              <th>Cash-out</th>
              <th>Profit</th>
              <th>Notes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id}>
                <td>{s.date}</td>
                <td>{s.location}</td>
                <td>{s.game}</td>
                <td>{currency(s.buyIn)}</td>
                <td>{currency(s.cashOut)}</td>
                <td className={(s.cashOut - s.buyIn) >= 0 ? 'pos' : 'neg'}>{currency(s.cashOut - s.buyIn)}</td>
                <td className="notes-cell" title={s.notes}>{s.notes}</td>
                <td><button className="delete" onClick={() => deleteSession(s.id)}>✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {sessions.length === 0 && <div className="empty">No sessions yet. Add your first one above.</div>}
      </div>
    </div>
  );
}


