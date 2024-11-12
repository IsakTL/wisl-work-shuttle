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
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  useEffect(() => {
    setEmployees(MOCK_EMPLOYEES);
  }, []);

  const calculateProgress = (): number => {
    let steps = 0;
    let completed = 0;
    
    steps++;
    if (selectedEmployee) completed++;
    
    steps++;
    if (selectedDate) completed++;
    
    steps++;
    if (selectedShiftType) completed++;
    
    if (selectedShiftType === 'no-shift') {
      steps++;
      if (noShiftReason.trim()) completed++;
    }
    
    return (completed / steps) * 100;
  };

  const logAction = (action: string) => {
    setActionHistory(prev => [action, ...prev.slice(0, 4)]);
  };

  const handleShiftSelect = (shiftType: ShiftType) => {
    setSelectedShiftType(shiftType);
    logAction(`Selected ${shiftType} shift`);
    if (shiftType !== 'no-shift') {
      setNoShiftReason('');
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    logAction(`Selected date: ${date}`);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employee || null);
    if (employee) {
      logAction(`Selected employee: ${employee.name}`);
    }
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Shift data submitted:', shiftData);
        navigate('/weather', { state: { shiftData } });
      } catch (error) {
        console.error('Error submitting shift:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClearData = () => {
    setSelectedShiftType(null);
    setSelectedDate('');
    setSelectedEmployee(null);
    setSearchTerm('');
    setNoShiftReason('');
    logAction('Cleared all form data');
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
          className="mb-4 text-gray-600 hover:text-gray-800 flex items-center transition-colors duration-150"
        >
          <span className="mr-2">←</span> Back
        </button>

        <h1 className="text-3xl font-bold mb-8 text-gray-800">Select Your Shift</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Form Progress</h2>
            {actionHistory.length > 0 && (
              <span className="text-sm text-blue-600 font-medium">
                Last action: {actionHistory[0]}
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-600">
                {Math.round(calculateProgress())}% Complete
              </span>
              <span className="text-gray-500">
                {selectedShiftType === 'no-shift' ? '4' : '3'} Steps Total
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Actions</h2>
          {actionHistory.length > 0 ? (
            <div className="space-y-2">
              {actionHistory.map((action, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border-l-4 transition-colors duration-150
                    ${index === 0 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
                    <span className={`text-sm ${index === 0 ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
                      {action}
                    </span>
                  </div>
                  {index === 0 && (
                    <span className="text-xs text-gray-500 mt-1 ml-5">
                      Just now
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-500">No actions recorded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Your recent actions will appear here
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Select Employee</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => handleEmployeeSelect(employee.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-b last:border-b-0 flex justify-between items-center transition-colors duration-150
                    ${selectedEmployee?.id === employee.id ? 'bg-blue-50' : ''}`}
                >
                  <div>
                    <p className="font-medium text-gray-800">{employee.name}</p>
                    <p className="text-sm text-gray-500">ID: {employee.employeeId}</p>
                  </div>
                  <input
                    type="radio"
                    name="employee"
                    checked={selectedEmployee?.id === employee.id}
                    onChange={() => handleEmployeeSelect(employee.id)}
                    className="ml-4 h-4 w-4 text-blue-600"
                  />
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="p-4 text-gray-500 text-center">
                  No employees found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Original Date Selection */}
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
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Morning Shift */}
          <div
            className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer border-2 transition-all duration-150
              ${selectedShiftType === 'morning' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => handleShiftSelect('morning')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">Morning Shift</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Shift Hours: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.startTime)} - {formatTime(SHIFT_CONSTRAINTS.morning.endTime)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Pickup Window: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.pickupTimeRange.start)} - {formatTime(SHIFT_CONSTRAINTS.morning.pickupTimeRange.end)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Drop-off Time: </span>
                    {formatTime(SHIFT_CONSTRAINTS.morning.dropoffTime)}
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="shiftType"
                checked={selectedShiftType === 'morning'}
                onChange={() => handleShiftSelect('morning')}
                className="h-4 w-4 text-blue-600"
              />
            </div>
          </div>

          {/* Evening Shift */}
          <div
            className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer border-2 transition-all duration-150
              ${selectedShiftType === 'evening' ? 'border-purple-500 ring-2 ring-purple-200' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => handleShiftSelect('evening')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-600 mb-4">Evening Shift</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Shift Hours: </span>
                    {formatTime(SHIFT_CONSTRAINTS.evening.startTime)} - {formatTime(SHIFT_CONSTRAINTS.evening.endTime)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-800">Drop-off Time: </span>
                    {formatTime(SHIFT_CONSTRAINTS.evening.dropoffTime)}
                  </p>
                </div>
              </div>
              <input
                type="radio"
                name="shiftType"
                checked={selectedShiftType === 'evening'}
                onChange={() => handleShiftSelect('evening')}
                className="h-4 w-4 text-purple-600"
              />
            </div>
          </div>

          {/* No Shift Option */}
          <div
            className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer border-2 transition-all duration-150
              ${selectedShiftType === 'no-shift' ? 'border-red-500 ring-2 ring-red-200' : 'border-transparent hover:border-gray-200'}`}
            onClick={() => handleShiftSelect('no-shift')}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-600 mb-4">No Shift</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">Select this option if you do not want to take any shift for the selected date.</p>
                  {selectedShiftType === 'no-shift' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason (Required)
                      </label>
                      <textarea
                        value={noShiftReason}
                        onChange={(e) => setNoShiftReason(e.target.value)}
                        placeholder="Please provide a reason..."
                        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                className="h-4 w-4 text-red-600"
              />
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedEmployee && selectedShiftType && selectedDate && (
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Selection</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Employee</p>
                <p className="text-lg font-medium text-gray-800">{selectedEmployee.name}</p>
                <p className="text-sm text-gray-500">{selectedEmployee.employeeId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Selected Date</p>
                <p className="text-lg font-medium text-gray-800">{selectedDate}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Selection</p>
                <p className="text-lg font-medium text-gray-800 capitalize">
                  {selectedShiftType === 'no-shift' ? 'No Shift' : `${selectedShiftType} Shift`}
                </p>
                {selectedShiftType === 'no-shift' && noShiftReason && (
                  <p className="text-sm text-gray-500 mt-2">Reason: {noShiftReason}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-8">
          <button
            onClick={handleClearData}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-150 font-medium"
          >
            Clear All Data
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={`px-8 py-3 rounded-md transition-all duration-150 font-medium flex items-center gap-2
              ${isSubmitDisabled 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow'}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Submitting...</span>
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