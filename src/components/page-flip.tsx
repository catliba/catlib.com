import React, { useState } from 'react'
import '../css/page-flip.css'
import { Link } from 'react-router-dom'

export default function PageFlip() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className='nav'>
            <button className="nav-toggle" onClick={toggleNav}>
                Toggle Navigation
            </button>
            {isNavOpen && (
                <ul className="nav-menu">
                    <li>
                        <Link className="nav-option" to={`/aboutcatlib`}>About Me</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to={`/notes`}>Notes</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to={`/sheets`}>Sheets</Link>
                    </li>
                    <li>
                        <Link className="nav-option" to={`/calendar`}>Calendar</Link>
                    </li>
                </ul>
            )}
        </div>
    )
}