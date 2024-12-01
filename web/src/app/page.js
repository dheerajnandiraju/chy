"use client"

import React, { useState } from "react"
import { Header } from "@/components/globals/header"
import { FaStar } from "react-icons/fa"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

function Dashboard() {
  const [activeVolunteers, setActiveVolunteers] = useState(1)
  const [totalVolunteers, setTotalVolunteers] = useState(2)
  const [volunteerName, setVolunteerName] = useState("")

  const handleAddVolunteer = () => {
    setActiveVolunteers(activeVolunteers + 1)
    setTotalVolunteers(totalVolunteers + 1)
    setVolunteerName("")
  }

  const ngoOperationsData = {
    title: "NGO Operations",
    description: "Manage crop purchases from farmers",
    metrics: [
      {
        label: "Active NGOs",
        value: 2,
      },
      {
        label: "Pending Crop Purchases",
        value: 5,
      },
    ],
    actionButton: {
      label: "Initiate Crop Purchase",
    },
  }

  const farmerMarketplaceData = {
    title: "Farmer Marketplace",
    description: "Connect farmers with NGOs for crop sales",
    metrics: [
      {
        label: "Registered Farmers",
        value: 2,
      },
      {
        label: "Available Crop Listings",
        value: 23,
      },
    ],
    actionButton: {
      label: "View Crop Listings",
    },
  }

  const restaurantPartnershipsData = {
    title: "Restaurant Partnerships",
    description: "Manage food donations from restaurants",
    metrics: [
      {
        label: "Partner Restaurants",
        value: 2,
      },
      {
        label: "Pending Food Pickups",
        value: 8,
      },
    ],
    actionButton: {
      label: "Schedule Pickup",
    },
  }

  const realTimeFoodTrackingData = {
    title: "Real-Time Food Tracking",
    description: "Monitor ongoing food deliveries",
    headers: ["From", "To", "Status", "Action"],
    deliveries: [
      {
        from: "Tasty Bites",
        to: "Food for All",
        status: "in transit",
        action: "Update status",
      },
      {
        from: "Green Acres",
        to: "Spice Garden",
        status: "preparing",
        action: "Update status",
      },
    ],
  }

  const statusOptions = ["Preparing", "In Transit", "Delivered"]
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0])

  const handleStatusChange = (value) => {
    setSelectedStatus(value)
  }

  const feedbackData = [
    {
      name: "Tasty Bites",
      rating: 5,
      feedback: "Great food!",
    },
    {
      name: "Spice Garden",
      rating: 5,
      feedback: "Excellent service and quality",
    },
  ]

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "Food Shortage",
      message: "Urgent need for non-perishable items",
      status: "active",
    },
  ])

  const [newAlertTitle, setNewAlertTitle] = useState("")
  const [newAlertMessage, setNewAlertMessage] = useState("")

  const handleResolveAlert = (id) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== id)
    setAlerts(updatedAlerts)
  }

  const handleCreateAlert = () => {
    const newAlert = {
      id: Date.now(),
      title: newAlertTitle,
      message: newAlertMessage,
      status: "active",
    }
    setAlerts([...alerts, newAlert])
    setNewAlertTitle("")
    setNewAlertMessage("")
  }

  const alertOptions = ["Food Shortage", "Urgent Delivery", "Other"]

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage food delivery volunteers</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Active Volunteers</span>
                  <span className="font-bold">{activeVolunteers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Volunteers</span>
                  <span className="font-bold">{totalVolunteers}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="volunteerName">Add New Volunteer</Label>
                <Input
                  id="volunteerName"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  placeholder="Enter volunteer name"
                />
                <Button onClick={handleAddVolunteer} className="w-full">
                  Add Volunteer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{ngoOperationsData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{ngoOperationsData.description}</p>
              <div className="space-y-2">
                {ngoOperationsData.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{metric.label}</span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">{ngoOperationsData.actionButton.label}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{farmerMarketplaceData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{farmerMarketplaceData.description}</p>
              <div className="space-y-2">
                {farmerMarketplaceData.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{metric.label}</span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">{farmerMarketplaceData.actionButton.label}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{restaurantPartnershipsData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{restaurantPartnershipsData.description}</p>
              <div className="space-y-2">
                {restaurantPartnershipsData.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{metric.label}</span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">{restaurantPartnershipsData.actionButton.label}</Button>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>{realTimeFoodTrackingData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{realTimeFoodTrackingData.description}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    {realTimeFoodTrackingData.headers.map((header, index) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {realTimeFoodTrackingData.deliveries.map((delivery, index) => (
                    <TableRow key={index}>
                      <TableCell>{delivery.from}</TableCell>
                      <TableCell>{delivery.to}</TableCell>
                      <TableCell>{delivery.status}</TableCell>
                      <TableCell>
                        <Select onValueChange={handleStatusChange} defaultValue={selectedStatus}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recipient Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Recent feedback from old age homes and orphanages</p>
              <div className="space-y-4">
                {feedbackData.map((feedback, index) => (
                  <div key={index} className="border-b pb-2">
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <div className="flex items-center mb-1">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 mr-1" />
                      ))}
                    </div>
                    <p className="text-sm">{feedback.feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full">
            <CardHeader>
              <CardTitle className="text-red-500">Emergency Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Manage and respond to urgent situations</p>
              <div className="space-y-4 mb-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="bg-red-50 p-4 rounded-md">
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <Button variant="outline" onClick={() => handleResolveAlert(alert.id)}>
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="alertType">Alert Type</Label>
                <Select onValueChange={setNewAlertTitle} defaultValue={alertOptions[0]}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select alert type" />
                  </SelectTrigger>
                  <SelectContent>
                    {alertOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label htmlFor="alertMessage">Alert Message</Label>
                <Textarea
                  id="alertMessage"
                  placeholder="Enter alert message"
                  value={newAlertMessage}
                  onChange={(e) => setNewAlertMessage(e.target.value)}
                />
                <Button onClick={handleCreateAlert} className="w-full">
                  Create New Alert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard