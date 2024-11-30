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
  farmerName: z.string().min(2, {
    message: "Farmer name must be at least 2 characters.",
  }),
  product: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  quantity: z.number().positive({
    message: "Quantity must be a positive number.",
  }),
  unit: z.string().min(1, {
    message: "Unit is required.",
  }),
  msp: z.number().positive({
    message: "MSP must be a positive number.",
  }),
  status: z.enum(["Available", "Sold", "Withdrawn"]),
})

const FarmerPage = () => {
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      farmerName: "John Doe",
      product: "Wheat",
      quantity: 1000,
      unit: "kg",
      msp: 20.50,
      status: "Available",
    },
    {
      id: 2,
      farmerName: "Jane Smith",
      product: "Rice",
      quantity: 1500,
      unit: "kg",
      msp: 25.75,
      status: "Sold",
    },
    {
      id: 3,
      farmerName: "Bob Johnson",
      product: "Corn",
      quantity: 800,
      unit: "kg",
      msp: 18.25,
      status: "Available",
    },
    // Add more farmers as needed
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortColumn, setSortColumn] = useState("farmerName")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFarmer, setEditingFarmer] = useState(null)

  const itemsPerPage = 5

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmerName: "",
      product: "",
      quantity: 0,
      unit: "kg",
      msp: 0,
      status: "Available",
    },
  })

  const filteredFarmers = farmers
    .filter(
      (farmer) =>
        (farmer.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
         farmer.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === "All" || farmer.status === statusFilter)
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const paginatedFarmers = filteredFarmers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage)

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAddEdit = (data) => {
    if (editingFarmer) {
      setFarmers(
        farmers.map((f) =>
          f.id === editingFarmer.id ? { ...f, ...data } : f
        )
      )
    } else {
      setFarmers([...farmers, { id: Date.now(), ...data }])
    }
    setIsDialogOpen(false)
    setEditingFarmer(null)
    form.reset()
  }

  const handleDelete = (id) => {
    setFarmers(farmers.filter((f) => f.id !== id))
  }

  const openEditDialog = (farmer) => {
    setEditingFarmer(farmer)
    form.reset(farmer)
    setIsDialogOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Farmers' Products</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search Farmers or Products"
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
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Withdrawn">Withdrawn</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingFarmer(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Farmer Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingFarmer ? "Edit Farmer Product" : "Add Farmer Product"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddEdit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="farmerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <FormControl>
                        <Input placeholder="Wheat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="kg">kg</SelectItem>
                          <SelectItem value="ton">ton</SelectItem>
                          <SelectItem value="quintal">quintal</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="msp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MSP (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="20.50" {...field} onChange={e => field.onChange(+e.target.value)} />
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
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                          <SelectItem value="Withdrawn">Withdrawn</SelectItem>
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
              <TableHead onClick={() => handleSort("farmerName")} className="cursor-pointer">
                Farmer Name {sortColumn === "farmerName" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("product")} className="cursor-pointer">
                Product {sortColumn === "product" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("quantity")} className="cursor-pointer">
                Quantity {sortColumn === "quantity" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("msp")} className="cursor-pointer">
                MSP (₹) {sortColumn === "msp" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                Status {sortColumn === "status" && (sortDirection === "asc" ? "▲" : "▼")}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFarmers.map((farmer) => (
              <TableRow key={farmer.id}>
                <TableCell>{farmer.farmerName}</TableCell>
                <TableCell>{farmer.product}</TableCell>
                <TableCell>{farmer.quantity} {farmer.unit}</TableCell>
                <TableCell>{farmer.msp.toFixed(2)}</TableCell>
                <TableCell>{farmer.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => openEditDialog(farmer)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(farmer.id)}
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

export default FarmerPage