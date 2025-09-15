import { useState } from "react";
import supabase from '../config/supabaseClient';

interface LogSessionProps {
  onSessionAdded: (session: any) => void;
  onCancel: () => void;
}

export default function LogSession({ onSessionAdded, onCancel }: LogSessionProps) {
    const [location, setLocation] = useState('')
    const [buyin, setBuyin] = useState('')
    const [cashout, setCashout] = useState('')
    const [hour, setHour] = useState<number>(0)
    const [formError, setFormError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setIsSubmitting(true)
        setFormError(null)

        try {
            const { data, error } = await supabase
                .from('sesh')
                .insert([{
                    location: location,
                    in: parseFloat(buyin),
                    out: parseFloat(cashout),
                    hours: hour
                }])
                .select()

            if (error) {
                setFormError('Failed to save session')
                console.error(error)
            } else if (data && data[0]) {
                onSessionAdded(data[0])
                // Reset form
                setLocation('')
                setBuyin('')
                setCashout('')
            }
        } catch (err) {
            setFormError('Failed to save session')
            console.error(err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="log-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="location">Location:</label>
                <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Casino, Home Game, Online"
                />

                <label htmlFor="buyin">Buy-in ($):</label>
                <input
                    type="number"
                    id="buyin"
                    value={buyin}
                    onChange={(e) => setBuyin(e.target.value)}
                    placeholder="0"
                    step="0.01"
                />

                <label htmlFor="cashout">Cash-out ($):</label>
                <input
                    type="number"
                    id="cashout"
                    value={cashout}
                    onChange={(e) => setCashout(e.target.value)}
                    placeholder="0"
                    step="0.01"
                />

                <label htmlFor="hours">Hours Played:</label>
                <input
                    type="number"
                    id="hours"
                    value={hour}
                    onChange={(e) => setHour(parseFloat(e.target.value))}
                    placeholder="0"
                    step="0.01"
                />

                <div className="form-actions">
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Log Session'}
                    </button>
                </div>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )

}