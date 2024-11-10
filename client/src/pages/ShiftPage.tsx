import NavBar from "../components/NavBar";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  employee: string;
}

export interface ShiftPageProps {}

const getShiftsFromAPI = async (): Promise<Shift[]> => {
  return [];
};

export const ShiftPage: React.FC<ShiftPageProps> = () => {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/');
    }
    fetchShifts();
  }, [navigate]);

  const fetchShifts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getShiftsFromAPI();
      setShifts(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching shifts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <NavBar />
        <div>Loading shifts...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div>Error: {error}</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Shifts</h1>
        
        {/* Display shifts in a table */}
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left">Employee</th>
              <th className="p-2 border text-left">Date</th>
              <th className="p-2 border text-left">Start Time</th>
              <th className="p-2 border text-left">End Time</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td className="p-2 border">{shift.employee}</td>
                <td className="p-2 border">{shift.date}</td>
                <td className="p-2 border">{shift.startTime}</td>
                <td className="p-2 border">{shift.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Display if no shifts are available */}
        {shifts.length === 0 && (
          <p className="text-center mt-4">No shifts available.</p>
        )}
      </div>
    </>
  );
};

export default ShiftPage;