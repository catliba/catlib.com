import React, { useState, useEffect } from 'react'
import '../css/page-flip.css'
import { Link } from 'react-router-dom'
import FlipPage from '../pngs/page-flip.png'

export default function PageFlip() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    useEffect(() => {
        setIsNavOpen(true);
    }, []);

    return (
        <div className='nav'>
            {isNavOpen ? 
                (<button className="nav-toggle" onClick={toggleNav}>
                    <img src={FlipPage} alt="."/>
                </button>)
                :
                (<ul className="nav-menu">
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
                    <button onClick={toggleNav}>
                            <img src={FlipPage} alt="."/>
                    </button>
                </ul>)
            }
        </div>
    )
}