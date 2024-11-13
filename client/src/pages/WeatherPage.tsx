import MapImage from '../components/MapImage.tsx';
import WeatherReport from "../components/Weather"
import NavBar from "../components/NavBar"
import './weather.css'

export default function WeatherPage() {
    return (
        <>
            <NavBar></NavBar>
            <div><WeatherReport/></div>
            <div>Your pickup point:</div>
            <MapImage />
            <a href='https://www.google.com/maps/dir/Des+Moines,+Iowa/Chuck+E.+Cheese,+13364+Montfort+Dr,+Dallas,+TX+75240/@37.1427908,-100.5025357,6z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x87ee99a4c1611ee7:0x710028512691e4b2!2m2!1d-93.6249522!2d41.5868417!1m5!1m1!1s0x864c20e6e390a8f9:0x4cb3ad0af3fe9eba!2m2!1d-96.8107053!2d32.9310412?entry=ttu&g_ep=EgoyMDI0MTEwNi4wIKXMDSoASAFQAw%3D%3D'>Directions</a>
        </>
    )
}