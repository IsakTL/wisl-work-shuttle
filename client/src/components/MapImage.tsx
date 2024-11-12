// const lat = sequelize.data.lat ? 12.123123: 0; // Use fetch

/* Can't use dotenv in this folder without importing from something in '../../server'.
How do I access environmental variables established in another directory?Should this itself be in the back end, at least partially? */
import { useState, useEffect } from 'react';
// import dotenv from 'dotenv';
// require('dotenv').config(path: __dirname);

const MapImage = () => {
    const [mapSrc, setMapSrc] = useState('');
    // Must instead use .env global variables for mapBoxKey, maybe also base url? That seems like it'd be in server/src/routes

    // Must instead use private variables from sequelize, pulled from database
    const
    pickupLon = -93.26785,
    pickupLat = 44.98439,
    // dropoffLon = -93.08844,
    // dropoffLat = 44.94,
    token = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN,
    tempToken = 'pk.eyJ1IjoiaXNha3RsIiwiYSI6ImNtMzRzb28wZTAzYzEyam9zYzk0c2gzZjQifQ.Ogf2AltV9Yv5sCjAbF_wkg';
    console.log(token); // Undefined, import broken

	/* DO NOT use no-cors
    "Access to fetch at 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/-93.26785,44.98439,15.25,0/400x400?access_token=undefined' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled."
    */

    const getImage = async () => {
        const mapImage = await fetch (`https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${pickupLon},${pickupLat},15.25,0/400x400?access_token=${tempToken}`);
        // console.log(mapImage);
        // const mapURL = await mapImage.json();
        console.log(mapImage);

        // Change mapSrc url
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