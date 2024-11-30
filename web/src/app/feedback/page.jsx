"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Star, Search } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: "John Doe", rating: 5, comment: "Excellent service and delicious food!", date: "2023-06-01" },
    { id: 2, user: "Jane Smith", rating: 4, comment: "Great experience overall, but delivery was a bit late.", date: "2023-06-02" },
    { id: 3, user: "Bob Johnson", rating: 3, comment: "Food was okay, could be better.", date: "2023-06-03" },
    // Add more feedback entries as needed
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("All")

  const filteredFeedbacks = feedbacks
    .filter(
      (feedback) =>
        feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (ratingFilter === "All" || feedback.rating === parseInt(ratingFilter))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">User Feedback</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search feedback"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select
            value={ratingFilter}
            onValueChange={(value) => setRatingFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{feedback.user}</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-2">{feedback.comment}</p>
              <p className="text-sm text-gray-500">{feedback.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

export default FeedbackPage