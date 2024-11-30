"use client";

import React, { useState } from "react";

const NgoPage = () => {
  const [ngos, setNgos] = useState([
    {
      id: 1,
      name: "Green Earth Foundation",
      location: "New York",
      contact: "contact@greenearth.org",
      status: "Active",
    },
    {
      id: 2,
      name: "Health for All",
      location: "Los Angeles",
      contact: "info@healthforall.org",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Educate Children",
      location: "San Francisco",
      contact: "support@educatechildren.org",
      status: "Active",
    },
    // Add more NGOs as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle search/filter
  const filteredNgos = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex ml-16 md:ml-64 mt-16 p-4">
      {/* Wrapper div to ensure fitting */}
      <div className="flex flex-col p-4 bg-white shadow-lg rounded-lg">

        <h1 className="text-3xl font-bold text-center mb-6">NGOs</h1>

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search NGOs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <button className="ml-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            Add NGO
          </button>
        </div>

        {/* NGO Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse max-w-full ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Contact</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNgos.map((ngo) => (
                <tr key={ngo.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{ngo.name}</td>
                  <td className="px-4 py-3">{ngo.location}</td>
                  <td className="px-4 py-3">{ngo.contact}</td>
                  <td className="px-4 py-3">{ngo.status}</td>
                  <td className="px-4 py-3">
                    <button className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="ml-2 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600">
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
  );
};

export default NgoPage;
