"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  cuisine: z.string().min(2, {
    message: "Cuisine type must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  contact: z.string().min(10, {
    message: "Contact number must be at least 10 characters.",
  }),
  status: z.enum(["Open", "Closed", "Busy"]),
})

const RestaurantPage = () => {
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Tasty Bites",
      cuisine: "Italian",
      address: "123 Main St, City",
      contact: "123-456-7890",
      status: "Open",
    },
    {
      id: 2,
      name: "Spice Garden",
      cuisine: "Indian",
      address: "456 Oak Ave, Town",
      contact: "987-654-3210",
      status: "Busy",
    },
    {
      id: 3,
      name: "Sushi Express",
      cuisine: "Japanese",
      address: "789 Pine Rd, Village",
      contact: "456-789-0123",
      status: "Closed",
    },
    // Add more restaurants as needed
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRestaurant, setEditingRestaurant] = useState(null)

  const itemsPerPage = 5

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cuisine: "",
      address: "",
      contact: "",
      status: "Open",
    },
  })

  const filteredRestaurants = restaurants
    .filter(
      (restaurant) =>
        (restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "All" || restaurant.status === statusFilter)
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const paginatedRestaurants = filteredRestaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage)

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAddEdit = (data) => {
    if (editingRestaurant) {
      setRestaurants(
        restaurants.map((r) =>
          r.id === editingRestaurant.id ? { ...r, ...data } : r
        )
      )
    } else {
      setRestaurants([...restaurants, { id: Date.now(), ...data }])
    }
    setIsDialogOpen(false)
    setEditingRestaurant(null)
    form.reset()
  }

  const handleDelete = (id) => {
    setRestaurants(restaurants.filter((r) => r.id !== id))
  }

  const openEditDialog = (restaurant) => {
    setEditingRestaurant(restaurant)
    form.reset(restaurant)
    setIsDialogOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Restaurants</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search Restaurants or Cuisines"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="Busy">Busy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingRestaurant(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingRestaurant ? "Edit Restaurant" : "Add Restaurant"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddEdit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Tasty Bites" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cuisine</FormLabel>
                      <FormControl>
                        <Input placeholder="Italian" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="123-456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                          <SelectItem value="Busy">Busy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                Name {sortColumn === "name" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("cuisine")} className="cursor-pointer">
                Cuisine {sortColumn === "cuisine" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("address")} className="cursor-pointer">
                Address {sortColumn === "address" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("contact")} className="cursor-pointer">
                Contact {sortColumn === "contact" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                Status {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRestaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.cuisine}</TableCell>
                <TableCell>{restaurant.address}</TableCell>
                <TableCell>{restaurant.contact}</TableCell>
                <TableCell>{restaurant.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => openEditDialog(restaurant)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(restaurant.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  )
}

export default RestaurantPage