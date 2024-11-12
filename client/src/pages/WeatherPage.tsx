import MapImage from '../components/MapImage.tsx';
import WeatherReport from "../components/Weather"
import NavBar from "../components/NavBar"

export default function WeatherPage() {
    return (
        <>
            <NavBar></NavBar>
            
            
            <div><WeatherReport/></div>
            <MapImage />
            
        </>
    )
}