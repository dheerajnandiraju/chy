"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Plus } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  organization: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  alertType: z.string().min(2, {
    message: "Alert type must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

const EmergencyAlertsPage = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, organization: "Sunshine Orphanage", alertType: "Food Shortage", description: "We are running low on food supplies and need urgent assistance.", date: "2023-06-01" },
    { id: 2, organization: "Golden Years Home", alertType: "Medical Supplies", description: "In need of basic medical supplies for our elderly residents.", date: "2023-06-02" },
    // Add more alerts as needed
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization: "",
      alertType: "",
      description: "",
    },
  })

  const handleAddAlert = (data) => {
    setAlerts([
      { id: Date.now(), ...data, date: new Date().toISOString().split('T')[0] },
      ...alerts
    ])
    setIsDialogOpen(false)
    form.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Emergency Alerts</h1>

      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Post Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post Emergency Alert</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddAlert)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sunshine Orphanage" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alertType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alert Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Food Shortage" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the emergency situation..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Post Alert</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <Card key={alert.id} className="border-red-500">
            <CardHeader>
              <CardTitle className="flex items-center text-red-500">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {alert.alertType}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">{alert.organization}</p>
              <p className="text-gray-700 mb-2">{alert.description}</p>
              <p className="text-sm text-gray-500">Posted on: {alert.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

export default EmergencyAlertsPage