"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Truck, Users } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const FoodTrackingPage = () => {
  const [deliveries, setDeliveries] = useState([
    { id: 1, restaurant: "Tasty Bites", destination: "Community Center", status: 20, volunteers: 3 },
    { id: 2, restaurant: "Spice Garden", destination: "Homeless Shelter", status: 60, volunteers: 2 },
    { id: 3, restaurant: "Sushi Express", destination: "Food Bank", status: 80, volunteers: 4 },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setDeliveries(prevDeliveries =>
        prevDeliveries.map(delivery => ({
          ...delivery,
          status: Math.min(delivery.status + Math.floor(Math.random() * 10), 100)
        }))
      )
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Food Delivery Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((delivery) => (
          <Card key={delivery.id}>
            <CardHeader>
              <CardTitle>{delivery.restaurant} to {delivery.destination}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={delivery.status} className="w-full" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status: {delivery.status}%</span>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm text-gray-500">{delivery.volunteers} volunteers</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Truck className="w-6 h-6 mr-2" />
                  <span className="text-lg font-semibold">
                    {delivery.status < 100 ? "In Transit" : "Delivered"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

export default FoodTrackingPage