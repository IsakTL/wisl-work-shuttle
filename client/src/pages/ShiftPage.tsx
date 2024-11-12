import NavBar from "../components/NavBar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: string;
  name: string;
  employeeId: string;
}

type ShiftType = 'morning' | 'evening' | 'no-shift' | null;

const SHIFT_CONSTRAINTS = {
  morning: {
    startTime: '07:00',
    endTime: '16:00',
    dropoffTime: '16:30',
    pickupTimeRange: {
      start: '07:00',
      end: '16:00'
    }
  },
  evening: {
    startTime: '16:00',
    endTime: '01:00',
    dropoffTime: '13:30',
    pickupTimeRange: {
      start: '16:00',
      end: '01:00'
    }
  }
};

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Joshua Woods', employeeId: 'EMP001' },
  { id: '2', name: 'Isak Larsson', employeeId: 'EMP002' },
  { id: '3', name: 'River Stephenson', employeeId: 'EMP003' },
  { id: '4', name: 'Sameer Idris', employeeId: 'EMP004' }
];

const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const ShiftPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedShiftType, setSelectedShiftType] = useState<ShiftType>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [noShiftReason, setNoShiftReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmployees(MOCK_EMPLOYEES);
  }, []);

  const handleShiftSelect = (shiftType: ShiftType) => {
    setSelectedShiftType(shiftType);
    if (shiftType !== 'no-shift') {
      setNoShiftReason('');
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee || null);
  };

  const handleClearData = () => {
    setSelectedShiftType(null);
    setSelectedDate('');
    setSelectedEmployee(null);
    setSearchTerm('');
    setNoShiftReason('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmployee && selectedDate && selectedShiftType) {
      setIsSubmitting(true);
      try {
        const shiftData = {
          type: selectedShiftType,
          date: selectedDate,
          employee: selectedEmployee,
          ...(selectedShiftType === 'no-shift' 
            ? { reason: noShiftReason }
            : { times: SHIFT_CONSTRAINTS[selectedShiftType] }
          )
        };
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('storedShiftData', JSON.stringify(shiftData));
        console.log('Shift data submitted:', shiftData);
        // Change this line from '/confirmation' to '/weather
        navigate('/weather', { state: { shiftData } }); // <-- This is the only line you need to change
      } catch (error) {
        console.error('Error submitting shift:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSubmitDisabled = !selectedEmployee || !selectedDate || !selectedShiftType || 
    (selectedShiftType === 'no-shift' && !noShiftReason.trim()) || isSubmitting;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={handleBack}
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center"
        >
          <span className="mr-2">←</span> Back
        </button>

        <h1 className="text-2xl font-bold mb-6">Select Your Shift</h1>

        {/* Employee Selection */}
        <div id='shiftForm'>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Employee</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            
            <div className="max-h-48 overflow-y-auto border rounded">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee.id)}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 flex justify-between items-center
                    ${selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''}`}
                >
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
                  </div>
                  <input
                    type="radio"
                    name="employee"
                    checked={selectedEmployee?.id === employee.id}
                    onChange={() => handleEmployeeSelect(employee.id)}
                    className="ml-4"
                  />
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="p-3 text-gray-500 text-center">
                  No employees found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Date Selection */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-2">Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Shift Options */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Morning Shift */}
          <div
            className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer border-2 
              ${selectedShiftType === 'morning' ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => handleShiftSelect('morning')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-600">Morning Shift</h3>
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-medium">Shift Hours: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.startTime)} - {formatTime(SHIFT_CONSTRAINTS.morning.endTime)}
                  </p>
                  <p>
                    <span className="font-medium">Pickup Window: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.pickupTimeRange.start)} - {formatTime(SHIFT_CONSTRAINTS.morning.pickupTimeRange.end)}
                  </p>
                  <p>
                    <span className="font-medium">Drop-off Time: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.dropoffTime)}
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="shiftType"
                checked={selectedShiftType === 'morning'}
                onChange={() => handleShiftSelect('morning')}
                className="mt-1"
              />
            </div>
          </div>

          {/* Evening Shift */}
          <div
            className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer border-2 
              ${selectedShiftType === 'evening' ? 'border-purple-500' : 'border-transparent'}`}
            onClick={() => handleShiftSelect('evening')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-600">Evening Shift</h3>
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-medium">Shift Hours: </span>
                    {formatTime(SHIFT_CONSTRAINTS.evening.startTime)} - {formatTime(SHIFT_CONSTRAINTS.evening.endTime)}
                  </p>
                  <p>
                    <span className="font-medium">Drop-off Time: </span>
                    {formatTime(SHIFT_CONSTRAINTS.evening.dropoffTime)}
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="shiftType"
                checked={selectedShiftType === 'evening'}
                onChange={() => handleShiftSelect('evening')}
                className="mt-1"
              />
            </div>
          </div>

          {/* No Shift Option */}
          <div
            className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer border-2 
              ${selectedShiftType === 'no-shift' ? 'border-red-500' : 'border-transparent'}`}
            onClick={() => handleShiftSelect('no-shift')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-600">No Shift</h3>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-600">Select this option if you do not want to take any shift for the selected date.</p>
                  {selectedShiftType === 'no-shift' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reason (Required)
                      </label>
                      <textarea
                        value={noShiftReason}
                        onChange={(e) => setNoShiftReason(e.target.value)}
                        placeholder="Please provide a reason..."
                        className="w-full border rounded-md p-2 text-sm"
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
              <input
                type="radio"
                name="shiftType"
                checked={selectedShiftType === 'no-shift'}
                onChange={() => handleShiftSelect('no-shift')}
                className="mt-1"
              />
            </div>
          </div>
        </div>
        </div>

        {/* Selection Summary */}
        {selectedEmployee && selectedShiftType && selectedDate && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Your Selection</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Employee</p>
                <p className="font-medium">{selectedEmployee.name}</p>
                <p className="text-sm text-gray-500">{selectedEmployee.employeeId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Date</p>
                <p className="font-medium">{selectedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selection</p>
                <p className="font-medium capitalize">
                  {selectedShiftType === 'no-shift' ? 'No Shift' : `${selectedShiftType} Shift`}
                </p>
                {selectedShiftType === 'no-shift' && noShiftReason && (
                  <p className="text-sm text-gray-500 mt-1">Reason: {noShiftReason}</p>
                )}
              </div>
            </div>
          </div>
            
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-8">
          <button
            onClick={handleClearData}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            Clear All Data
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-8 py-3 rounded transition-colors flex items-center gap-2
              ${isSubmitDisabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftPage;