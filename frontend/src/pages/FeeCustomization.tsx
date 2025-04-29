"use client"

import { useState } from "react"
import {
  DollarSign,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Plus,
  CreditCard,
  Receipt,
  Percent,
  Clock,
  FileText,
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data
const feeStructures = [
  {
    id: 1,
    name: "Tuition Fee",
    amount: 5000,
    frequency: "Semester",
    class: "All Classes",
    installments: true,
    discountEligible: true,
  },
  {
    id: 2,
    name: "Library Fee",
    amount: 1000,
    frequency: "Annual",
    class: "All Classes",
    installments: false,
    discountEligible: false,
  },
  {
    id: 3,
    name: "Computer Lab Fee",
    amount: 1500,
    frequency: "Semester",
    class: "High School",
    installments: false,
    discountEligible: true,
  },
  {
    id: 4,
    name: "Sports Fee",
    amount: 800,
    frequency: "Annual",
    class: "All Classes",
    installments: false,
    discountEligible: true,
  },
  {
    id: 5,
    name: "Science Lab Fee",
    amount: 1200,
    frequency: "Semester",
    class: "High School",
    installments: false,
    discountEligible: false,
  },
  {
    id: 6,
    name: "Development Fee",
    amount: 2000,
    frequency: "Annual",
    class: "All Classes",
    installments: true,
    discountEligible: true,
  },
  {
    id: 7,
    name: "Examination Fee",
    amount: 1500,
    frequency: "Semester",
    class: "All Classes",
    installments: false,
    discountEligible: false,
  },
  {
    id: 8,
    name: "Transportation Fee",
    amount: 3000,
    frequency: "Monthly",
    class: "All Classes",
    installments: true,
    discountEligible: true,
  },
]

const discounts = [
  {
    id: 1,
    name: "Sibling Discount",
    type: "Percentage",
    value: 10,
    applicableFees: "All Fees",
    criteria: "For families with more than one child enrolled",
  },
  {
    id: 2,
    name: "Merit Scholarship",
    type: "Percentage",
    value: 25,
    applicableFees: "Tuition Fee",
    criteria: "For students with >90% marks in previous academic year",
  },
  {
    id: 3,
    name: "Early Payment Discount",
    type: "Fixed",
    value: 500,
    applicableFees: "Tuition Fee",
    criteria: "For payments made before the due date",
  },
  {
    id: 4,
    name: "Sports Excellence",
    type: "Percentage",
    value: 15,
    applicableFees: "All Fees",
    criteria: "For students representing school in state/national level sports",
  },
  {
    id: 5,
    name: "Financial Aid",
    type: "Percentage",
    value: 50,
    applicableFees: "All Fees",
    criteria: "Based on family income and financial need assessment",
  },
  {
    id: 6,
    name: "Staff Children Discount",
    type: "Percentage",
    value: 75,
    applicableFees: "All Fees",
    criteria: "For children of school staff members",
  },
  {
    id: 7,
    name: "Academic Excellence",
    type: "Fixed",
    value: 2000,
    applicableFees: "Tuition Fee",
    criteria: "For students with consistent academic excellence",
  },
]

export default function FeeCustomization() {
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false)
  const [isViewFeeOpen, setIsViewFeeOpen] = useState(false)
  const [isEditFeeOpen, setIsEditFeeOpen] = useState(false)
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false)
  const [isViewDiscountOpen, setIsViewDiscountOpen] = useState(false)
  const [isEditDiscountOpen, setIsEditDiscountOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState<any>(null)
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("All")
  const [activeTab, setActiveTab] = useState("fees")

  // Pagination state
  const [currentFeePage, setCurrentFeePage] = useState(1)
  const [currentDiscountPage, setCurrentDiscountPage] = useState(1)
  const itemsPerPage = 5

  const [newFee, setNewFee] = useState({
    name: "",
    amount: 0,
    frequency: "Semester",
    class: "All Classes",
    installments: false,
    discountEligible: false,
  })

  const [newDiscount, setNewDiscount] = useState({
    name: "",
    type: "Percentage",
    value: 0,
    applicableFees: "All Fees",
    criteria: "",
  })

  const classOptions = ["All", "All Classes", "Primary", "Middle School", "High School"]
  const frequencyOptions = ["Annual", "Semester", "Monthly", "One-time"]

  const filteredFees = feeStructures.filter((fee) => {
    const matchesSearch = fee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "All" || fee.class === selectedClass
    return matchesSearch && matchesClass
  })

  const filteredDiscounts = discounts.filter((discount) => {
    return discount.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Pagination logic for fees
  const indexOfLastFee = currentFeePage * itemsPerPage
  const indexOfFirstFee = indexOfLastFee - itemsPerPage
  const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee)
  const totalFeePages = Math.ceil(filteredFees.length / itemsPerPage)

  // Pagination logic for discounts
  const indexOfLastDiscount = currentDiscountPage * itemsPerPage
  const indexOfFirstDiscount = indexOfLastDiscount - itemsPerPage
  const currentDiscounts = filteredDiscounts.slice(indexOfFirstDiscount, indexOfLastDiscount)
  const totalDiscountPages = Math.ceil(filteredDiscounts.length / itemsPerPage)

  const resetFeeForm = () => {
    setNewFee({
      name: "",
      amount: 0,
      frequency: "Semester",
      class: "All Classes",
      installments: false,
      discountEligible: false,
    })
  }

  const resetDiscountForm = () => {
    setNewDiscount({
      name: "",
      type: "Percentage",
      value: 0,
      applicableFees: "All Fees",
      criteria: "",
    })
  }

  const openViewFeeModal = (fee: any) => {
    setSelectedFee(fee)
    setIsViewFeeOpen(true)
  }

  const openEditFeeModal = (fee: any) => {
    setSelectedFee(fee)
    setNewFee({
      name: fee.name,
      amount: fee.amount,
      frequency: fee.frequency,
      class: fee.class,
      installments: fee.installments,
      discountEligible: fee.discountEligible,
    })
    setIsEditFeeOpen(true)
  }

  const openViewDiscountModal = (discount: any) => {
    setSelectedDiscount(discount)
    setIsViewDiscountOpen(true)
  }

  const openEditDiscountModal = (discount: any) => {
    setSelectedDiscount(discount)
    setNewDiscount({
      name: discount.name,
      type: discount.type,
      value: discount.value,
      applicableFees: discount.applicableFees,
      criteria: discount.criteria,
    })
    setIsEditDiscountOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Fee Customization</h2>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setIsAddFeeOpen(true)}>
            <Plus size={16} />
            Add Fee Structure
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDiscountOpen(true)}>
            <Percent size={16} />
            Add Discount
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fees" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fees">Fee Structures</TabsTrigger>
          <TabsTrigger value="discounts">Discounts & Scholarships</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter fee structures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search fee structures..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentFeePage(1) // Reset to first page on search
                    }}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <Filter size={16} />
                      Class: {selectedClass}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {classOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => {
                          setSelectedClass(option)
                          setCurrentFeePage(1) // Reset to first page on filter change
                        }}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedClass("All")
                    setCurrentFeePage(1) // Reset to first page on filter reset
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fees Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Fee Structures</CardTitle>
                  <CardDescription>{filteredFees.length} fee structures found</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fee Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Installments</TableHead>
                    <TableHead>Discount Eligible</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentFees.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>
                        <div className="font-medium">{fee.name}</div>
                      </TableCell>
                      <TableCell>${fee.amount}</TableCell>
                      <TableCell>{fee.frequency}</TableCell>
                      <TableCell>{fee.class}</TableCell>
                      <TableCell>
                        {fee.installments ? (
                          <Badge variant="outline">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {fee.discountEligible ? (
                          <Badge variant="outline">Yes</Badge>
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
                            <DropdownMenuItem className="gap-2" onClick={() => openViewFeeModal(fee)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => openEditFeeModal(fee)}>
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
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
                Showing {Math.min((currentFeePage - 1) * itemsPerPage + 1, filteredFees.length)} to{" "}
                {Math.min(currentFeePage * itemsPerPage, filteredFees.length)} of {filteredFees.length} fee structures
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentFeePage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentFeePage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentFeePage} of {totalFeePages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentFeePage((prev) => Math.min(prev + 1, totalFeePages))}
                  disabled={currentFeePage === totalFeePages || totalFeePages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Discounts Tab */}
        <TabsContent value="discounts" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter discounts and scholarships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search discounts..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentDiscountPage(1) // Reset to first page on search
                    }}
                  />
                </div>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchTerm("")
                    setCurrentDiscountPage(1) // Reset to first page on filter reset
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Discounts Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Discounts & Scholarships</CardTitle>
                  <CardDescription>{filteredDiscounts.length} discounts found</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Applicable Fees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDiscounts.map((discount) => (
                    <TableRow key={discount.id}>
                      <TableCell>
                        <div className="font-medium">{discount.name}</div>
                      </TableCell>
                      <TableCell>{discount.type}</TableCell>
                      <TableCell>
                        {discount.type === "Percentage" ? `${discount.value}%` : `$${discount.value}`}
                      </TableCell>
                      <TableCell>{discount.applicableFees}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openViewDiscountModal(discount)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => openEditDiscountModal(discount)}>
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
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
                Showing {Math.min((currentDiscountPage - 1) * itemsPerPage + 1, filteredDiscounts.length)} to{" "}
                {Math.min(currentDiscountPage * itemsPerPage, filteredDiscounts.length)} of {filteredDiscounts.length}{" "}
                discounts
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDiscountPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentDiscountPage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentDiscountPage} of {totalDiscountPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDiscountPage((prev) => Math.min(prev + 1, totalDiscountPages))}
                  disabled={currentDiscountPage === totalDiscountPages || totalDiscountPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Reports</CardTitle>
              <CardDescription>Generate and view fee-related reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Receipt size={18} />
                      Fee Collection Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">View total fee collection by class, period, or fee type</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock size={18} />
                      Outstanding Dues Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">View list of students with pending fee payments</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Percent size={18} />
                      Discount Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">View total discounts applied by discount type</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CreditCard size={18} />
                      Payment Method Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">View fee collection by payment method</p>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText size={18} />
                      Custom Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">Generate custom reports with selected parameters</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Fee Modal */}
      <Dialog
        open={isAddFeeOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetFeeForm()
          }
          setIsAddFeeOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Fee Structure</DialogTitle>
            <DialogDescription>Create a new fee structure for students.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsAddFeeOpen(false)
              resetFeeForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Fee Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={newFee.name}
                  onChange={(e) => setNewFee({ ...newFee, name: e.target.value })}
                  placeholder="e.g., Tuition Fee"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">
                  Amount <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    value={newFee.amount || ""}
                    onChange={(e) => setNewFee({ ...newFee, amount: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                    className="pl-9"
                    required
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">
                  Frequency <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newFee.frequency}
                  onValueChange={(value) => setNewFee({ ...newFee, frequency: value })}
                  required
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">
                  Applicable Class <span className="text-red-500">*</span>
                </Label>
                <Select value={newFee.class} onValueChange={(value) => setNewFee({ ...newFee, class: value })} required>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.slice(1).map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="installments"
                  checked={newFee.installments}
                  onCheckedChange={(checked) => setNewFee({ ...newFee, installments: checked })}
                />
                <Label htmlFor="installments">Allow payment in installments</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="discountEligible"
                  checked={newFee.discountEligible}
                  onCheckedChange={(checked) => setNewFee({ ...newFee, discountEligible: checked })}
                />
                <Label htmlFor="discountEligible">Eligible for discounts</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddFeeOpen(false)
                  resetFeeForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Add Fee Structure</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Fee Modal */}
      <Dialog
        open={isViewFeeOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedFee(null)
          }
          setIsViewFeeOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Fee Structure Details</DialogTitle>
            <DialogDescription>View fee structure information.</DialogDescription>
          </DialogHeader>

          {selectedFee && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">Fee Name</Label>
                <p className="font-medium">{selectedFee.name}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Amount</Label>
                <p className="font-medium">${selectedFee.amount}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Frequency</Label>
                <p>{selectedFee.frequency}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Applicable Class</Label>
                <p>{selectedFee.class}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Installments Allowed</Label>
                <p>
                  {selectedFee.installments ? (
                    <Badge variant="outline">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Discount Eligible</Label>
                <p>
                  {selectedFee.discountEligible ? (
                    <Badge variant="outline">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewFeeOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewFeeOpen(false)
                openEditFeeModal(selectedFee)
              }}
            >
              Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Discount Modal */}
      <Dialog
        open={isAddDiscountOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetDiscountForm()
          }
          setIsAddDiscountOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Discount</DialogTitle>
            <DialogDescription>Create a new discount or scholarship.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsAddDiscountOpen(false)
              resetDiscountForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="discount-name">
                  Discount Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="discount-name"
                  value={newDiscount.name}
                  onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                  placeholder="e.g., Sibling Discount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-type">
                  Discount Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={newDiscount.type}
                  onValueChange={(value) => setNewDiscount({ ...newDiscount, type: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Percentage" id="percentage" />
                    <Label htmlFor="percentage">Percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Fixed" id="fixed" />
                    <Label htmlFor="fixed">Fixed Amount</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount-value">
                  Value <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  {newDiscount.type === "Percentage" ? (
                    <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  ) : (
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  )}
                  <Input
                    id="discount-value"
                    type="number"
                    value={newDiscount.value || ""}
                    onChange={(e) => setNewDiscount({ ...newDiscount, value: Number.parseFloat(e.target.value) })}
                    placeholder="0"
                    className="pl-9"
                    required
                    min={0}
                    max={newDiscount.type === "Percentage" ? 100 : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicable-fees">
                  Applicable Fees <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newDiscount.applicableFees}
                  onValueChange={(value) => setNewDiscount({ ...newDiscount, applicableFees: value })}
                  required
                >
                  <SelectTrigger id="applicable-fees">
                    <SelectValue placeholder="Select applicable fees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Fees">All Fees</SelectItem>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Library Fee">Library Fee</SelectItem>
                    <SelectItem value="Computer Lab Fee">Computer Lab Fee</SelectItem>
                    <SelectItem value="Sports Fee">Sports Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="criteria">
                  Eligibility Criteria <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="criteria"
                  value={newDiscount.criteria}
                  onChange={(e) => setNewDiscount({ ...newDiscount, criteria: e.target.value })}
                  placeholder="e.g., For families with more than one child enrolled"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDiscountOpen(false)
                  resetDiscountForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Add Discount</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Discount Modal */}
      <Dialog
        open={isViewDiscountOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDiscount(null)
          }
          setIsViewDiscountOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Discount Details</DialogTitle>
            <DialogDescription>View discount information.</DialogDescription>
          </DialogHeader>

          {selectedDiscount && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">Discount Name</Label>
                <p className="font-medium">{selectedDiscount.name}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Type</Label>
                <p>{selectedDiscount.type}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Value</Label>
                <p className="font-medium">
                  {selectedDiscount.type === "Percentage" ? `${selectedDiscount.value}%` : `$${selectedDiscount.value}`}
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Applicable Fees</Label>
                <p>{selectedDiscount.applicableFees}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Eligibility Criteria</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedDiscount.criteria}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewDiscountOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDiscountOpen(false)
                openEditDiscountModal(selectedDiscount)
              }}
            >
              Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Discount Modal */}
      <Dialog
        open={isEditDiscountOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedDiscount(null)
            resetDiscountForm()
          }
          setIsEditDiscountOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Discount</DialogTitle>
            <DialogDescription>Update the discount details.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsEditDiscountOpen(false)
              resetDiscountForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-discount-name">
                  Discount Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-discount-name"
                  value={newDiscount.name}
                  onChange={(e) => setNewDiscount({ ...newDiscount, name: e.target.value })}
                  placeholder="e.g., Sibling Discount"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-discount-type">
                  Discount Type <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={newDiscount.type}
                  onValueChange={(value) => setNewDiscount({ ...newDiscount, type: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Percentage" id="edit-percentage" />
                    <Label htmlFor="edit-percentage">Percentage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Fixed" id="edit-fixed" />
                    <Label htmlFor="edit-fixed">Fixed Amount</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-discount-value">
                  Value <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  {newDiscount.type === "Percentage" ? (
                    <Percent className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  ) : (
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  )}
                  <Input
                    id="edit-discount-value"
                    type="number"
                    value={newDiscount.value || ""}
                    onChange={(e) => setNewDiscount({ ...newDiscount, value: Number.parseFloat(e.target.value) })}
                    placeholder="0"
                    className="pl-9"
                    required
                    min={0}
                    max={newDiscount.type === "Percentage" ? 100 : undefined}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-applicable-fees">
                  Applicable Fees <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newDiscount.applicableFees}
                  onValueChange={(value) => setNewDiscount({ ...newDiscount, applicableFees: value })}
                  required
                >
                  <SelectTrigger id="edit-applicable-fees">
                    <SelectValue placeholder="Select applicable fees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Fees">All Fees</SelectItem>
                    <SelectItem value="Tuition Fee">Tuition Fee</SelectItem>
                    <SelectItem value="Library Fee">Library Fee</SelectItem>
                    <SelectItem value="Computer Lab Fee">Computer Lab Fee</SelectItem>
                    <SelectItem value="Sports Fee">Sports Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-criteria">
                  Eligibility Criteria <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-criteria"
                  value={newDiscount.criteria}
                  onChange={(e) => setNewDiscount({ ...newDiscount, criteria: e.target.value })}
                  placeholder="e.g., For families with more than one child enrolled"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDiscountOpen(false)
                  resetDiscountForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
