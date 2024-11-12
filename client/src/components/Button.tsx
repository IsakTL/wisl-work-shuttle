// API test button
type ButtonProps = {
    onResults: (data: any) => void;
};

const ApiSearchButton: React.FC<ButtonProps> = ({ onResults }) => {
    const handleClick = async () => {
        const data = await searchAPI();
        onResults(data);
    };

    const
    pickupLon = -93.26785,
    pickupLat = 44.98439,
    dropoffLon = -93.08844,
    dropoffLat = 44.94, //Should pull from Sequelize
    tempToken = 'pk.eyJ1IjoiaXNha3RsIiwiYSI6ImNtMzRzb28wZTAzYzEyam9zYzk0c2gzZjQifQ.Ogf2AltV9Yv5sCjAbF_wkg'; //To be removed upon successfully implementing env variables

    const searchAPI = async () => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${pickupLon},${pickupLat};${dropoffLon},${dropoffLat}?geometries=polyline&access_token=${tempToken}`
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Invalid API response, check the network tab');
            }
            console.log(data)
            return data;
        } catch (err) {
            console.error('An error occurred:', err);
            return [];
        }
    };

    return (
        <button onClick={handleClick}>
            Search API
        </button>
    );
};

export default ApiSearchButton;