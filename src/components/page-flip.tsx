import { useState } from 'react';
import '../css/page-flip.css';
import { Link } from 'react-router-dom';
import FlipPage from '../pngs/page-flip.png';
import CatLink from '../pngs/link-cat.png';
import PencilLink from '../pngs/link-pencil.png'
//import PdfLink from '../pngs/link-notes.png'
//import NotesLink from '../pngs/link-pdf.png'

/* For future
                    <li>
                        <Link className="nav-option delay-2" to={`/notes`}><img className="link-button" src={PdfLink}/></Link>
                    </li>
                    <li>
                        <Link className="nav-option delay-3" to={`/sheets`}><img className="link-button" src={NotesLink}/></Link>
                    </li>
*/
export default function PageFlip() {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <div className='nav'>
            {isNavOpen ? 
                (<button className="nav-toggle" onClick={toggleNav}>
                    <img src={FlipPage} alt="."/>
                </button>)
                :
                (<ul className="nav-menu">
                    <li>
                        <Link className="nav-option delay-1" to={`/aboutcatlib`}><img className="link-button" src={CatLink}/></Link>
                    </li>
                    <li>
                       <Link className="nav-option delay-4" to={`/calendar`}><img className="link-button" src={PencilLink}/></Link>
                    </li>
                    <button className="nav-toggle" onClick={toggleNav}>
                            <img src={FlipPage} alt="."/>
                    </button>
                </ul>)
            }
        </div>
    )
}