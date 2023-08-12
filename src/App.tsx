import { useState } from 'react'
import './css/App.css'
import LogoClick from './pngs/Logo_Click.png'
import LogoHover from './pngs/Logo_Hover.png'
import Logo from './pngs/Logo_Start.png'
import { useNavigate } from 'react-router-dom'

function App() {
  const [logoImage, setLogoImage] = useState(Logo);
  const navigate = useNavigate();
  console.log(/Android|iPhone/i.test(navigator.userAgent))
  const handleHover = () => {
    setLogoImage(LogoHover);
  }
  const handleClick = () => {
    setLogoImage(LogoClick);
    navigate('/aboutcatlib');
  }
  return (
    <div className='app'>
      <div className='logo'>
        <img 
          src={logoImage}
          useMap='#logo-map' 
          alt="Catlib.com" 
        />
        <map name="logo-map">
          <area
            shape='poly' 
            coords="153,499,147,578,157,637,181,683,212,721,252,757,293,775,331,792,377,801,430,808,485,811,542,811,613,804,997,761,1262,735,1333,717,1377,704,1414,682,1446,646,1470,598,1482,550,1482,510,1475,466,1449,400,1410,354,1368,325,1333,295,1284,270,1253,260,1171,60,1120,217,907,238,786,251,383,291,249,173,238,332,194,395,172,422,160,451"
            onMouseOver={handleHover}
            onMouseLeave={() => setLogoImage(Logo)}
            onClick={handleClick}
            onTouchStart={handleClick}
          />
        </map>
        {(/Android|iPhone/i.test(navigator.userAgent)) ? (
            <button className="phone-button" onTouchStart={handleClick}>Click me!</button>
        ):(<div></div>)}
      </div>
    </div>
  )
}

export default App
