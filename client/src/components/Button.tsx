// API test button
type ButtonProps = {
    onResults: (data: any) => void;
};

const ApiSearchButton: React.FC<ButtonProps> = ({ onResults }) => {
    const handleClick = async () => {
        const data = await searchAPI();
        onResults(data);
    };

    const searchAPI = async () => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/cycling/-84.518641,39.134270;-84.512023,39.102779?geometries=geojson&access_token=${process.env.VITE_}`
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