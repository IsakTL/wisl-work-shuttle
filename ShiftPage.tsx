import React, { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


interface Shift {
    hours: ReactNode;
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    employee: string;
}


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

    return (
        <div>
            {shifts.map((shift) => (
                <div key={shift.id}>
                    {/* Display shift details here */}
                    <p>Shift Date: {shift.date}</p>
                    <p>Shift Hours: {shift.hours}</p>
                </div>
            ))}
        </div>
    );

    async function getShiftsFromAPI(): Promise<Shift[]> {
        const response = await fetch('/api/shifts');
        const data = await response.json();
        return data.shifts;
    }

}

export default ShiftPage;
