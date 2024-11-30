"use client"; 
import React,  { useState } from 'react'
import { CiBellOn, CiUser } from "react-icons/ci";
import { FaStar } from 'react-icons/fa'; 

function Dashboard() {

    const [activeVolunteers, setActiveVolunteers] = useState(1);
    const [totalVolunteers, setTotalVolunteers] = useState(2);
    const [volunteerName, setVolunteerName] = useState('');
  
    const handleAddVolunteer = () => {
      // Add the new volunteer to your backend or database
      // Assuming you're updating the state for demonstration:
      setActiveVolunteers(activeVolunteers + 1);
      setTotalVolunteers(totalVolunteers + 1);
      setVolunteerName('');
    };

    const ngoOperationsData = {
      title: "NGO Operations",
      description: "Manage crop purchases from farmers",
      metrics: [
          {
              label: "Active NGOs",
              value: 2
          },
          {
              label: "Pending Crop Purchases",
              value: 5
          }
      ],
      actionButton: {
          label: "Initiate Crop Purchase"
      }
  };

  const farmerMarketplaceData = {
    title: "Farmer Marketplace",
    description: "Connect farmers with NGOs for crop sales",
    metrics: [
        {
            label: "Registered Farmers",
            value: 2
        },
        {
            label: "Available Crop Listings",
            value: 23
        }
    ],
    actionButton: {
        label: "View Crop Listings"
    }
};
const restaurantPartnershipsData = {
  title: "Restaurant Partnerships",
  description: "Manage food donations from restaurants",
  metrics: [
      {
          label: "Partner Restaurants",
          value: 2
      },
      {
          label: "Pending Food Pickups",
          value: 8
      }
  ],
  actionButton: {
      label: "Schedule Pickup"
  }
};

const realTimeFoodTrackingData = {
  title: "Real-Time Food Tracking",
  description: "Monitor ongoing food deliveries",
  headers: ["From", "To", "Status", "Action"],
  deliveries: [
      {
          from: "Tasty Bites",
          to: "Food for All",
          status: "in transit",
          action: "Update status"
      },
      {
          from: "Green Acres",
          to: "Spice Garden",
          status: "preparing",
          action: "Update status"
      }
  ]
};

const statusOptions = [
  "Preparing",
  "In Transit",
  "Delivered"
];
const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };


    const feedbackData = [
      {
          name: "Tasty Bites",
          rating: 5,
          feedback: "Great food!"
      },
      {
          name: "Spice Garden",
          rating: 5,
          feedback: "Excellent service and quality"
      }
  ];
  const emergencyAlerts = [
    {
        id: 1,
        title: "Food Shortage",
        message: "Urgent need for non-perishable items",
        status: "active" // or "resolved"
    },
    // ... more alerts
];

  const [alerts, setAlerts] = useState(emergencyAlerts);
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertMessage, setNewAlertMessage] = useState('');

  const handleResolveAlert = (id) => {
      const updatedAlerts = alerts.filter(alert => alert.id !== id);
      setAlerts(updatedAlerts);
  };

  const handleCreateAlert = () => {
      const newAlert = {
          id: Date.now(), // Generate a unique ID
          title: newAlertTitle,
          message: newAlertMessage,
          status: "active"
      };
      setAlerts([...alerts, newAlert]);
      setNewAlertTitle('');
      setNewAlertMessage('');
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Food Shortage');

  const options = [
    'Food Shortage',
    'Urgent Delivery',
    'Other'
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
    <div className="bg-white shadow-md py-4 px-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-5">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 mr-2"
          placeholder="Search..."
        />
        <button>
          <CiBellOn size={30} className="text-gray-800" />
        </button>
        <button className="">
          <CiUser size={30} className="text-gray-800" />
        </button>
      </div>
    </div>
  </div>

    <div className='mr-20 ml-24'>
      <div className="bg-white shadow-md p-4 m-3 border rounded-md">  {/* Added padding */}
        <h2 className="text-4xl font-bold">Volunteer Management</h2>
        <p>Manage food delivery volunteers</p>

        <div className="mt-4 text-2xl flex font-bold justify-between mb-2">
          <p>Active Volunteers</p>
          <p className="font-bold">{activeVolunteers}</p>
        </div>
        <hr />
        <div className="mt-4 text-2xl flex font-bold justify-between mb-2">
          <p>Total Volunteers</p>
          <p className="font-bold">{totalVolunteers}</p>
        </div>

        <div className="mb-4 mt-3">
          <label htmlFor="volunteerName">Add New Volunteer</label>
          <div className='flex gap-3'>
          <input
            type="text"
            id="volunteerName"
            value={volunteerName}
            onChange={(e) => setVolunteerName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full bg-gray-100"
          />
          <button
            onClick={handleAddVolunteer}
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
          </div>
        </div>
      </div>


      <div className="bg-white shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold">{ngoOperationsData.title}</h2>
            <p>{ngoOperationsData.description}</p>

            {ngoOperationsData.metrics.map((metric, index) => (
              <div>
                <div key={index} className="mt-4 text-2xl flex font-bold justify-between mb-2">
                    <p>{metric.label}</p>
                    <p className="font-bold">{metric.value}</p>
                </div>
                <hr />
                </div>
            ))}

            <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-3"
            >
                {ngoOperationsData.actionButton.label}
            </button>
        </div>

        <div className="bg-white shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold">{farmerMarketplaceData.title}</h2>
            <p>{farmerMarketplaceData.description}</p>

            <div className="mt-4">
                {farmerMarketplaceData.metrics.map((metric, index) => (
                  <div>
                    <div key={index} className="flex justify-between mb-2">
                        <p className="text-2xl font-bold">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>

            <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-3"
            >
                <a href={farmerMarketplaceData.actionButton.link}>
                    {farmerMarketplaceData.actionButton.label}
                </a>
            </button>
        </div>
          
        <div className="bg-white shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold">{restaurantPartnershipsData.title}</h2>
            <p>{restaurantPartnershipsData.description}</p>

            <div className="mt-4">
                {restaurantPartnershipsData.metrics.map((metric, index) => (
                  <div>
                    <div key={index} className="flex justify-between mb-2">
                        <p className="text-2xl font-bold">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                    <hr />
                    </div>
                ))}
            </div>

            <button
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-3"
            >
                {restaurantPartnershipsData.actionButton.label}
            </button>
        </div>

        <div className="bg-white shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold">{realTimeFoodTrackingData.title}</h2>
            <p>{realTimeFoodTrackingData.description}</p>

            <table className="table-auto w-full">
                <thead>
                <tr>
                  {realTimeFoodTrackingData.headers.map((header, index) => (
                    <th key={index} className="px-4 py-2 table-auto th.justify-start">
                      {header}
                    </th>
                  ))}
                </tr>
                </thead>
                <tbody>
                    {realTimeFoodTrackingData.deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{delivery.from}</td>
                            <td className="border px-4 py-2">{delivery.to}</td>
                            <td className="border px-4 py-2">{delivery.status}</td>
                            <td className="border px-4 py-2">
                                <select
                                    value={selectedStatus === index ? delivery.status : selectedStatus} // Set value based on selected index
                                    onChange={(event) => handleStatusChange(event, index)}
                                >
                                    {statusOptions.map((status, index) => (
                                        <option key={index} value={status}>{status}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="bg-white shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold">Recipient Feedback</h2>
            <p>Recent feedback from old age homes and orphanages</p>
            <div className='mt-5'>
            {feedbackData.map((feedback, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-bold">{feedback.name}</h3>
                    <div className="flex items-center mb-2">
                        {[...Array(feedback.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500 mr-1" /> // Use FaStar icon
                        ))}
                    </div>
                    <p>{feedback.feedback}</p>
                    <hr />
                </div>
            ))}
            </div>
        </div>

        <div className="bg-red-50 shadow-md p-4 m-3 border rounded-md">
            <h2 className="text-4xl font-bold text-red-500">Emergency Alerts</h2>
            <p>Manage and respond to urgent situations</p>
              <div className='bg-white p-3 rounded-md mt-5'>
            {alerts.map((alert, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-bold">{alert.title}</h3>
                    <p>{alert.message}</p>
                    <button
                        className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border mt-4"
                        onClick={() => handleResolveAlert(alert.id)}
                    >
                        Resolve
                    </button>
                </div>
            ))}
            </div>
            <div>
            <div className="cursor-pointer border-b border-gray-300 p-2 w-full" onClick={toggleDropdown}>
                  {selectedOption} <span className="ml-2">&#9660;</span>
                </div>
                {isOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
    
                <textarea
                    placeholder="Alert message"
                    value={newAlertMessage}
                    onChange={(e) => setNewAlertMessage(e.target.value)}
                />
                <button
                    className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-md mt-3"
                    onClick={handleCreateAlert}
                >
                    Create New Alert
                </button>
            </div>
        </div>
        </div>
      </div>
  )
}

export default Dashboard