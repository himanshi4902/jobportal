import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setSearchedQuery } from '@/redux/jobSlice'

const FilterCard = ({ onFilterChange }) => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    location: '',
    ctc: '',
    jobRole: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(filters)); 
  }, [filters, dispatch]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters); 
  };

  return (
    <div className="max-w-md  rounded-lg">
      <h2 className="text-xl text-[#c5b4ef] font-semibold mb-4">Filter Jobs</h2>
      <form onSubmit={handleFilterSubmit} className="space-y-5">
        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-[#c5b4ef]">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-[#c5b4ef]"
          >
            <option value="" className="text-[#c5b4ef]">Select Location</option>
            <option value="Delhi" className="text-[#c5b4ef]">Delhi</option>
            <option value="Pune" className="text-[#c5b4ef]">Pune</option>
            <option value="Bangalore" className="text-[#c5b4ef]">Bangalore</option>
            <option value="Chennai" className="text-[#c5b4ef]">Chennai</option>
            <option value="Hyderabad" className="text-[#c5b4ef]">Hyderabad</option>
            <option value="Mumbai" className="text-[#c5b4ef]">Mumbai</option>
          </select>
        </div>

        {/* CTC Filter */}
        <div>
          <label htmlFor="ctc" className="block text-sm font-medium text-[#c5b4ef]">
            CTC Offered
          </label>
          <select
            id="ctc"
            name="ctc"
            value={filters.ctc}
            onChange={handleInputChange}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-[#c5b4ef]"
          >
            <option value="" className="text-[#c5b4ef]">Select CTC Range</option>
            <option value="0-5L" className="text-[#c5b4ef]">0-5 Lakhs</option>
            <option value="5-10L" className="text-[#c5b4ef]">5-10 Lakhs</option>
            <option value="10-20L" className="text-[#c5b4ef]">10-20 Lakhs</option>
            <option value="20L+" className="text-[#c5b4ef]">20 Lakhs and above</option>
          </select>
        </div>

        {/* Job Role Filter */}
        <div>
          <label htmlFor="jobRole" className="block text-sm font-medium text-[#c5b4ef]">
            Job Role
          </label>
          <select
            id="jobRole"
            name="jobRole"
            value={filters.jobRole}
            onChange={handleInputChange}
            className="mt-1 block w-full p-1 border border-gray-300 rounded-md text-[#c5b4ef]"
          >
            <option value="" className="text-[#c5b4ef]">Select Job Role</option>
            <option value="Frontend Developer" className="text-[#c5b4ef]">Frontend Developer</option>
            <option value="Backend Developer" className="text-[#c5b4ef]">Backend Developer</option>
            <option value="Full Stack Developer" className="text-[#c5b4ef]">Full Stack Developer</option>
            <option value="UI/UX Designer" className="text-[#c5b4ef]">UI/UX Designer</option>
            <option value="Data Scientist" className="text-[#c5b4ef]">Data Scientist</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#DBD8E3] text-[#5C5470] font-medium rounded-md hover:bg-[#5A28B2] transition-colors duration-200"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterCard;
