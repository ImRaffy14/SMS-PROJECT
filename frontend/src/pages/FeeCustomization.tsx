"use client"

import { useState } from "react"
import {
  Search,
  MoreVertical,
  Trash2,
  Eye,
  Plus,
  BookOpenText,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { useQuery } from "@tanstack/react-query"
import { getGradingSystem } from "@/api/gradingSystem"
import { GradingSystem } from "@/types"
import { useCreateGradingSystem, useDeleteGradingSystem } from "@/hooks/useGradingSystem"
import FullPageLoader from "@/components/FullpageLoader"


export default function SchoolConfiguration() {
  const [isAddGradingOpen, setIsAddGradingOpen] = useState(false)
  const [isViewGradingOpen, setIsViewGradingOpen] = useState(false)
  const [selectedGrading, setSelectedGrading] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  
  const { data: gradingSystems, isLoading: isGradingLoading, refetch } = useQuery<GradingSystem[], Error>({
    queryKey: ["gradingSystems"],
    queryFn: getGradingSystem,
    staleTime: 60000,
    gcTime: 300000,
  })


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [newGrading, setNewGrading] = useState({
    name: "",
    type: "Letter Grades",
    scale: "",
    passingGrade: "",
    description: "",
    isDefault: false,
  })

  const gradingTypeOptions = ["Letter Grades", "Numeric", "Competency"]

  const filteredGrading: GradingSystem[] = gradingSystems?.filter((grading) => {
    return grading.name.toLowerCase().includes(searchTerm.toLowerCase())
  }) ?? []


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentGrading = filteredGrading.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil( filteredGrading.length / itemsPerPage )

  console.log("Filtered Grading Systems:", filteredGrading)
  console.log("Current Grading Systems:", currentGrading)
  console.log("Current Page:", currentPage)
  console.log("Total Pages:", totalPages)
  console.log("indexOfLastItem:", indexOfLastItem)
  console.log("indexOfFirstItem:", indexOfFirstItem)
  

  const resetGradingForm = () => {
    setNewGrading({
      name: "",
      type: "Letter Grades",
      scale: "",
      passingGrade: "",
      description: "",
      isDefault: false,
    })
  }

  const openViewGradingModal = (grading: any) => {
    setSelectedGrading(grading)
    setIsViewGradingOpen(true)
  }
  
  const openDeleteGrading = (grading: any) => {
    setSelectedGrading(grading)
    setIsConfirmationModalOpen(true)
  }

  const { mutate: createGradingSystem, isPending: isCreating } = useCreateGradingSystem()
  const handleCreateGrading = () => {
    createGradingSystem(newGrading), {
      onSuccess: () => {
        refetch()
        setIsAddGradingOpen(false)
        resetGradingForm()
      },
      onError: (error: Error) => {
        console.error("Create Grading System Error:", error)
      },
    }
  }


  const { mutate: deleteGradingSystem, isPending: isDeleting } = useDeleteGradingSystem()

  const handleDeleteGrading = () => {
    if (!selectedGrading) return
    
    deleteGradingSystem(selectedGrading.id), {
      onSuccess: () => {
        refetch()
        setSelectedGrading(null)
      },
      onError: (error: Error) => {
        console.error("Delete Grading System Error:", error)
      }
    }
  }

  if (isGradingLoading) {
    return <FullPageLoader message="Loading announcements..." showLogo={true} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">School Configuration</h2>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => {
            setIsAddGradingOpen(true)
          }}>
            <Plus size={16} />
            Add Grading System
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="grading">
        <TabsList className="w-full">
          <TabsTrigger value="grading">
            <BookOpenText className="mr-2 h-4 w-4" />
            Grading Systems
          </TabsTrigger>
        </TabsList>

        {/* Grading Systems Tab */}
        <TabsContent value="grading" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter grading systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search grading systems..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </div>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchTerm("")
                    setCurrentPage(1)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Grading Systems Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Grading Systems</CardTitle>
                  <CardDescription>{filteredGrading.length} grading systems configured</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>System Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Scale</TableHead>
                    <TableHead>Passing Grade</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentGrading.map((grading) => (
                    <TableRow key={grading.id}>
                      <TableCell>
                        <div className="font-medium">{grading.name}</div>
                      </TableCell>
                      <TableCell>{grading.type}</TableCell>
                      <TableCell>{grading.scale}</TableCell>
                      <TableCell>{grading.passingGrade}</TableCell>
                      <TableCell>
                        {grading.isDefault ? (
                          <Badge variant="default">Default</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openViewGradingModal(grading)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600" onClick={() => openDeleteGrading(grading)}>
                              <Trash2 size={16} />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredGrading.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredGrading.length)} of {filteredGrading.length} systems
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>


      {/* Add Grading System Modal */}
      <Dialog
        open={isAddGradingOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetGradingForm()
          }
          setIsAddGradingOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Grading System</DialogTitle>
            <DialogDescription>Create a new grading system for student evaluation.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsAddGradingOpen(false)
              handleCreateGrading()
              resetGradingForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="grading-name">
                  System Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="grading-name"
                  value={newGrading.name}
                  onChange={(e) => setNewGrading({ ...newGrading, name: e.target.value })}
                  placeholder="e.g., Standard Grading"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grading-type">
                  Grading Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newGrading.type}
                  onValueChange={(value) => setNewGrading({ ...newGrading, type: value })}
                  required
                >
                  <SelectTrigger id="grading-type">
                    <SelectValue placeholder="Select grading type" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradingTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="grading-scale">
                  Grading Scale <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="grading-scale"
                  value={newGrading.scale}
                  onChange={(e) => setNewGrading({ ...newGrading, scale: e.target.value })}
                  placeholder={
                    newGrading.type === "Letter Grades" 
                      ? "e.g., A, B, C, D, F" 
                      : newGrading.type === "Numeric" 
                        ? "e.g., 0-100" 
                        : "e.g., Emerging, Developing, Proficient"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passing-grade">
                  Passing Grade <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="passing-grade"
                  value={newGrading.passingGrade}
                  onChange={(e) => setNewGrading({ ...newGrading, passingGrade: e.target.value })}
                  placeholder={
                    newGrading.type === "Letter Grades" 
                      ? "e.g., D" 
                      : newGrading.type === "Numeric" 
                        ? "e.g., 40" 
                        : "e.g., Developing"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grading-description">Description</Label>
                <Input
                  id="grading-description"
                  value={newGrading.description}
                  onChange={(e) => setNewGrading({ ...newGrading, description: e.target.value })}
                  placeholder="Brief description of the grading system"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="default-grading"
                  checked={newGrading.isDefault}
                  onCheckedChange={(checked) => setNewGrading({ ...newGrading, isDefault: checked })}
                />
                <Label htmlFor="default-grading">Set as default grading system</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddGradingOpen(false)
                  resetGradingForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Add Grading System</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Grading System Modal */}
      <Dialog
        open={isViewGradingOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGrading(null)
          }
          setIsViewGradingOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grading System Details</DialogTitle>
            <DialogDescription>View grading system information.</DialogDescription>
          </DialogHeader>

          {selectedGrading && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">System Name</Label>
                <p className="font-medium">{selectedGrading.name}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Type</Label>
                <p>{selectedGrading.type}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Grading Scale</Label>
                <p>{selectedGrading.scale}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Passing Grade</Label>
                <p>{selectedGrading.passingGrade}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Description</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedGrading.description}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Default System</Label>
                <p>
                  {selectedGrading.isDefault ? (
                    <Badge variant="default">Default</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewGradingOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal for Deletion */}
      <ConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteGrading}
        itemName={selectedGrading?.name}
        isLoading={isDeleting}
        title="Delete grading"
        description="Are you sure you want to delete this grading?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}