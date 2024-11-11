// const lat = sequelize.data.lat ? 12.123123: 0; // Use fetch
// require('dotenv').config();

/* Can't use dotenv in this folder without importing from something in '../../server'.
How do I access environmental variables established in another directory?Should this itself be in the back end, at least partially? */
import { useState, useEffect } from 'react';

const MapImage = () => {
    const [mapSrc, setMapSrc] = useState('');
    // Must instead use .env global variables for mapBoxKey, maybe also base url? That seems like it'd be in server/src/routes

    // Must instead use private variables from sequelize, pulled from database
    const
    pickupLon = -93.26785,
    pickupLat = 44.98439;
    // const dropoffLat = 0,
    // dropoffLon = 0;


    /* setMapSrc to be used to change mapSrc url */


    const getImage = async () => {
        const mapImage = await fetch (`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${pickupLon},${pickupLat},15.25,0/400x400?access_token=${import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN}`);
        // console.log(mapImage);
        // const mapURL = await mapImage.json();
        console.log(mapImage);
        setMapSrc(mapImage.url);
    }

    useEffect(()=> {getImage()}, []);

    return (
        <div>
            <img src={mapSrc} alt="" />    
        </div>
    )
}

export default MapImage;