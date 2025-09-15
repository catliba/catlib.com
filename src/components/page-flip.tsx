import '../css/page-flip.css';
import { Link } from 'react-router-dom';
import FlipPage from '../pngs/page-flip.png';

interface PageFlipProps {
    dir: string;
    message: string
}

export default function PageFlip({ dir, message }: PageFlipProps) {
    return (
        <>
            <div className='nav'>
                <Link to={dir}>
                    <img src={FlipPage} alt="."/>
                </Link>
            </div>
            <div className='helper'>{message}</div>
        </>
    )
}