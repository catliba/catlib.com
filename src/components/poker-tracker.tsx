import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/poker-tracker.css';

// idea: when  clicking into screen splash page gives two cards that represent a possible poker hand randomly
interface PokerSession {
  id: string;
  date: string;
  location: string;
  buyIn: number;
  cashOut: number;
  notes?: string;
}

const STORAGE_KEY = 'poker_sessions_v2';

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
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<PokerSession, 'id'>>({
    date: new Date().toISOString().slice(0, 10),
    location: '',
    buyIn: 0,
    cashOut: 0,
    notes: ''
  });

  useEffect(() => { saveSessions(sessions); }, [sessions]);

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
    setShowModal(false);
    setForm({ ...form, location: '', buyIn: 0, cashOut: 0, notes: '' });
  };

  const deleteSession = (id: string) => setSessions(sessions.filter(s => s.id !== id));

  const currency = (n: number) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="poker">
      <div className="title">
        <Link to={"/aboutcatlib"} className='back'>← Back</Link>
        <h1>Poker Tracker</h1>
        <div className="spacer" />
        <button className="primary" onClick={() => setShowModal(true)}>Add Session</button>
      </div>

      <div className="totals">
        <div><span>PNL</span><strong className={totals.profit >= 0 ? 'pos' : 'neg'}>{currency(totals.profit)}</strong></div>
        <div><span>Hourly</span><strong>{currency(totals.invested)}</strong></div>
        <div><span>Total Hours</span><strong className={totals.roi >= 0 ? 'pos' : 'neg'}>{totals.roi.toFixed(1)}%</strong></div>
      </div>

      <div className="card table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Buy-in</th>
              <th>Cash-out</th>
              <th>Profit</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => (
              <tr key={s.id}>
                <td>{s.date}</td>
                <td>{s.location}</td>
                <td>{currency(s.buyIn)}</td>
                <td>{currency(s.cashOut)}</td>
                <td className={(s.cashOut - s.buyIn) >= 0 ? 'pos' : 'neg'}>{currency(s.cashOut - s.buyIn)}</td>
                <td><button className="delete" onClick={() => deleteSession(s.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {sessions.length === 0 && <div className="empty">No sessions yet. Click "Add Session".</div>}
      </div>

      {showModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Add Session</h2>
              <button className="icon" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <label>Date
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </label>
              <label>Location
                <input type="text" placeholder="Casino / Home / Online" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
              </label>
              <label>Buy-in
                <input type="number" inputMode="numeric" value={form.buyIn} onChange={e => setForm({ ...form, buyIn: Number(e.target.value) })} />
              </label>
              <label>Cash-out / Winnings
                <input type="number" inputMode="numeric" value={form.cashOut} onChange={e => setForm({ ...form, cashOut: Number(e.target.value) })} />
              </label>
              <label>Notes
                <input type="text" placeholder="Brief notes (optional)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </label>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary" onClick={addSession}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}