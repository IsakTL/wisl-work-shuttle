import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShiftPage: React.FC = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/login');
    }

    fetchShifts();
  }, [navigate]);

  const fetchShifts = async () => {
    const shiftData = await getShiftsFromAPI();
    setShifts(shiftData);
  };

  // Render the Shift Page component
  return (
    <div>
      <h1>Shifts</h1>
      {/* Render the shift data */}
    </div>
  );
};

export default ShiftPage;
