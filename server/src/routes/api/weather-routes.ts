import { Router, type Request, type Response } from 'express';

export const weather = async (_req: Request, res: Response) => {
    const secretKey = process.env.WEATHER_API_KEY;
    console.log(secretKey)

    try {
        const response = await fetch(
        `https://api.openweathermap.org?lon=44.94000&lat=-93.08844&appid=${secretKey}`
    );
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Invalid API response, check the network tab');
    }
    console.log(response)
    return res.json(data);
    } catch (err) {
        
        return {error: err};
    }
};
const router = Router();

router.post('/weather', weather);

export default router;