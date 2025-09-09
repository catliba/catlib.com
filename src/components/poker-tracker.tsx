import { Link } from 'react-router-dom';
import '../css/poker-tracker.css';

// idea: when  clicking into screen splash page gives two cards that represent a possible poker hand randomly


export default function PokerTracker() {
  return (
    <div className="poker">
      <Link to={"/aboutcatlib"} className='back'>← Back</Link>

      <div className="totals">
        <div><span>PNL</span><strong></strong></div>
        <div><span>Hourly</span><strong></strong></div>
        <div><span>Total Hours</span><strong></strong></div>
      </div>

      <div className="deck table">
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
        </table>
      </div>
    </div>
  );
}