import { Router, type Request, type Response } from 'express';

export const map = async (_req: Request, res: Response) => {
  // const { city } = req.body;
  // console.log(city);
  const secretKey = process.env.MAPBOX_PUBLIC_TOKEN;
  console.log(secretKey);
// const long = '', lat = ''

  try {
    const response = await fetch(
      //add lon/lat
      `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/-74.063599%2C40.729499%3B-74.025443%2C40.780883?alternatives=true&geometries=geojson&overview=full&steps=false&access_token=${secretKey}`
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

router.post('/map', map);

export default router;