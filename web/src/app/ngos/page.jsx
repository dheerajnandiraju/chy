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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  contact: z.string().email({
    message: "Must be a valid email address.",
  }),
  status: z.enum(["Active", "Inactive"]),
})

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
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [sortColumn, setSortColumn] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNgo, setEditingNgo] = useState(null)

  const itemsPerPage = 5

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      contact: "",
      status: "Active",
    },
  })

  const filteredNgos = ngos
    .filter(
      (ngo) =>
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "All" || ngo.status === statusFilter)
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const paginatedNgos = filteredNgos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredNgos.length / itemsPerPage)

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleAddEdit = (data) => {
    if (editingNgo) {
      setNgos(
        ngos.map((n) =>
          n.id === editingNgo.id ? { ...n, ...data } : n
        )
      )
    } else {
      setNgos([...ngos, { id: Date.now(), ...data }])
    }
    setIsDialogOpen(false)
    setEditingNgo(null)
    form.reset()
  }

  const handleDelete = (id) => {
    setNgos(ngos.filter((n) => n.id !== id))
  }

  const openEditDialog = (ngo) => {
    setEditingNgo(ngo)
    form.reset(ngo)
    setIsDialogOpen(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-6">NGOs</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search NGOs"
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
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingNgo(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add NGO
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingNgo ? "Edit NGO" : "Add NGO"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddEdit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Green Earth Foundation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
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
                        <Input placeholder="contact@example.org" {...field} />
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
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
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
              <TableHead onClick={() => handleSort("location")} className="cursor-pointer">
                Location {sortColumn === "location" && (sortDirection === "asc" ? "▲" : "▼")}
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
            {paginatedNgos.map((ngo) => (
              <TableRow key={ngo.id}>
                <TableCell>{ngo.name}</TableCell>
                <TableCell>{ngo.location}</TableCell>
                <TableCell>{ngo.contact}</TableCell>
                <TableCell>{ngo.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => openEditDialog(ngo)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(ngo.id)}
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

export default NgoPage