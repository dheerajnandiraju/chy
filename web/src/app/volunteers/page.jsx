"use client";

import React, { useState } from "react";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([
    { id: 1, name: "John Doe", role: "Coordinator", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Volunteer", status: "Inactive" },
    { id: 3, name: "Alice Johnson", role: "Organizer", status: "Active" },
    // Add more volunteers as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle search/filter
  const filteredVolunteers = volunteers.filter((volunteer) =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex ml-16 md:ml-64 mt-16 p-4">
      {/* Sidebar should be outside this main content div */}
      <div className="flex-1 pl-16"> {/* Adding padding-left to avoid overlap with sidebar */}
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Volunteers</h1>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search Volunteers"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <button className="ml-4 bg-black text-white p-2 rounded-md hover:bg-gray-700">
              Add Volunteer
            </button>
          </div>

          {/* Volunteer Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{volunteer.name}</td>
                    <td className="px-6 py-3">{volunteer.role}</td>
                    <td className="px-6 py-3">{volunteer.status}</td>
                    <td className="px-6 py-3">
                      <button className="bg-black text-white py-1 px-4 rounded-md hover:bg-green-600">
                        Edit
                      </button>
                      <button className="ml-2 bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerPage;
