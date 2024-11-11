import MapImage from '../components/MapImage.tsx';
import WeatherReport from "../components/Weather"
import NavBar from "../components/NavBar"
import './weatherPage.css'

export default function WeatherPage() {
    return (
        <>
            <NavBar></NavBar>
            <h1>Welcome</h1>
            <div>
            <WeatherReport/>
            </div>
            <MapImage />
            
        </>
    )
}