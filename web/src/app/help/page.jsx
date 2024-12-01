"use client"

import React from "react"
import { motion } from "framer-motion"
import { Utensils, Truck, Users, Wheat, MessageSquare, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const HelpPage = () => {
  const sections = [
    {
      title: "Restaurants",
      icon: <Utensils className="w-6 h-6" />,
      content: `
        The Restaurants page allows you to manage participating restaurants in the food donation program.
        - View a list of all registered restaurants
        - Add new restaurants to the system
        - Edit existing restaurant information
        - Filter restaurants by status (Open, Closed, Busy)
        - Search for restaurants by name or cuisine type
      `
    },
    {
      title: "Food Tracking",
      icon: <Truck className="w-6 h-6" />,
      content: `
        The Food Tracking page provides real-time information on ongoing food deliveries.
        - See active deliveries with progress bars
        - View the number of volunteers assigned to each delivery
        - Track the status of deliveries (In Transit or Delivered)
        - Information updates automatically every few seconds
      `
    },
    {
      title: "Volunteer Management",
      icon: <Users className="w-6 h-6" />,
      content: `
        The Volunteer Management page helps you organize and track volunteers.
        - View a list of all registered volunteers
        - Add new volunteers to the system
        - Edit volunteer information and roles
        - Filter volunteers by status (Active, Inactive)
        - Search for volunteers by name or role
      `
    },
    {
      title: "Farmer's Products",
      icon: <Wheat className="w-6 h-6" />,
      content: `
        The Farmer's Products page allows you to manage products offered by local farmers.
        - View a list of all registered farmer products
        - Add new products with details like quantity and Minimum Support Price (MSP)
        - Edit existing product information
        - Filter products by status (Available, Sold, Withdrawn)
        - Search for products by farmer name or product type
      `
    },
    {
      title: "Feedback",
      icon: <MessageSquare className="w-6 h-6" />,
      content: `
        The Feedback page displays user reviews and comments about the service.
        - View all feedback entries with ratings and comments
        - Filter feedback by rating (1 to 5 stars)
        - Search for specific feedback using keywords
        - Feedback is sorted with the most recent entries first
      `
    },
    {
      title: "Emergency Alerts",
      icon: <AlertTriangle className="w-6 h-6" />,
      content: `
        The Emergency Alerts page allows organizations to post and view urgent requests.
        - View all current emergency alerts
        - Post new emergency alerts (for authorized organizations)
        - Alerts are displayed with high visibility for immediate attention
        - Each alert includes the organization name, alert type, and description
      `
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Help Center</h1>
      <p className="text-center mb-8 text-gray-600">
        Welcome to the Help Center. Here you can find information about how to use our food donation and management system.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {sections.map((section, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="hover:no-underline">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {section.icon}
                    <span className="ml-2">{section.title}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <p className="whitespace-pre-line">{section.content}</p>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
        <p className="mb-4">
          If you can't find the information you're looking for, please don't hesitate to contact our support team.
        </p>
        <p className="text-gray-600">
          Email: support@fooddonationsystem.com<br />
          Phone: (123) 456-7890
        </p>
      </div>
    </motion.div>
  )
}

export default HelpPage