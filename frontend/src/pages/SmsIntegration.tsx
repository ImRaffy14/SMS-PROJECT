import { useState } from "react"
import { MessageSquare, Search, Filter, MoreVertical, Edit, Trash2, Eye, Plus } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useQuery } from "@tanstack/react-query"
import { getEmail } from "@/api/email"
import { Email } from "@/types"
import FullPageLoader from "@/components/FullpageLoader"
import {
  useCreateEmail,
  useDeleteEmail,
  useEditEmail,
} from "@/hooks/useEmail"
import { ConfirmationModal } from "@/components/ConfirmationModal"


export default function SMSIntegration() {
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false)
  const [isViewTemplateOpen, setIsViewTemplateOpen] = useState(false)
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false)
  const [isSendSMSOpen, setIsSendSMSOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [activeTab, setActiveTab] = useState("templates")
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  // Pagination state
  const [currentTemplatePage, setCurrentTemplatePage] = useState(1)
  const itemsPerPage = 5

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    message: "",
    type: "Attendance",
    status: "Active",
  })

  const { data: smsTemplates, isLoading, refetch } = useQuery<Email[], Error>({
    queryKey: ["emails"],
    queryFn: getEmail,
    staleTime: 60000,
    gcTime: 300000,
  })

  const templateTypes = [
    "All",
    "Attendance",
    "Payment",
    "Academic",
    "Event",
    "Announcement",
    "Financial",
    "Library",
    "Career",
  ]

  const filteredTemplates: Email[] = smsTemplates?.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || template.type === selectedType
    return matchesSearch && matchesType
  }) ?? []

  // Pagination logic for templates
  const indexOfLastTemplate = currentTemplatePage * itemsPerPage
  const indexOfFirstTemplate = indexOfLastTemplate - itemsPerPage
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate)
  const totalTemplatePages = Math.ceil(filteredTemplates.length / itemsPerPage)

  const resetForm = () => {
    setNewTemplate({
      name: "",
      message: "",
      type: "Attendance",
      status: "Active",
    })
  }

  const openViewModal = (template: any) => {
    setSelectedTemplate(template)
    setIsViewTemplateOpen(true)
  }

  const openEditModal = (template: any) => {
    setSelectedTemplate(template)
    setNewTemplate({
      name: template.name,
      message: template.message,
      type: template.type,
      status: template.status,
    })
    setIsEditTemplateOpen(true)
  }

  const { mutate: createEmail } = useCreateEmail()
  const handleAddAnnouncement = async () => {
    createEmail(newTemplate), {
      onSuccess: () => {
        setIsAddTemplateOpen(false)
        resetForm()
        refetch()
      },
      onError: (error: Error) => {
        console.error("Error creating email template:", error)
      },
    }
  }

  const { mutate: editEmail } = useEditEmail()
  const handleEditTemplate = async () => {
    if (!selectedTemplate) return
    editEmail(
      { data: newTemplate, id: selectedTemplate.id },
      {
        onSuccess: () => {
          refetch()
          setIsEditTemplateOpen(false)
          setIsConfirmationModalOpen(false)
          setSelectedTemplate(null)
          resetForm()
        },
        onError: (error: Error) => {
          console.error("Error editing email template:", error)
        },
      }
    )
  }

  
  const openDeleteModal = (template: any) => {
    setSelectedTemplate(template)
    setIsConfirmationModalOpen(true)
  }

  const { mutate: deleteEmail, isPending: isDeleting } = useDeleteEmail()

  const handleDeleteTemplate = async () => {
    if (!selectedTemplate) return
    deleteEmail(selectedTemplate.id, {
      onSuccess: () => {
        setIsConfirmationModalOpen(false)
        refetch()
      },
      onError: (error: Error) => {
        console.error("Error deleting email template:", error)
        setIsConfirmationModalOpen(false)
      },
    })
  }

  if (isLoading) {
    return <FullPageLoader message="Loading email templates..." showLogo={true} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">College Email Integration</h2>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setIsSendSMSOpen(true)}>
            <MessageSquare size={16} />
            Send Email
          </Button>
          <Button className="gap-2" onClick={() => setIsAddTemplateOpen(true)}>
            <Plus size={16} />
            Add Template
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="templates" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter Email templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentTemplatePage(1) // Reset to first page on search
                    }}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <Filter size={16} />
                      Type: {selectedType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {templateTypes.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          setSelectedType(type)
                          setCurrentTemplatePage(1) // Reset to first page on filter change
                        }}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("All")
                    setCurrentTemplatePage(1) // Reset to first page on filter reset
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Templates Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>SMS Templates</CardTitle>
                  <CardDescription>{filteredTemplates.length} templates found</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div className="font-medium">{template.name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openViewModal(template)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => openEditModal(template)}>
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600" onClick={() => openDeleteModal(template)}>
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
                Showing {Math.min((currentTemplatePage - 1) * itemsPerPage + 1, filteredTemplates.length)} to{" "}
                {Math.min(currentTemplatePage * itemsPerPage, filteredTemplates.length)} of {filteredTemplates.length}{" "}
                templates
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTemplatePage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentTemplatePage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentTemplatePage} of {totalTemplatePages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTemplatePage((prev) => Math.min(prev + 1, totalTemplatePages))}
                  disabled={currentTemplatePage === totalTemplatePages || totalTemplatePages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Add Template Modal */}
      <Dialog
        open={isAddTemplateOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTemplate(null)
          }
          setIsAddTemplateOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Email Template</DialogTitle>
            <DialogDescription>Create a new Email template for automated notifications.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAddAnnouncement()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Template Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Attendance Alert"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Template Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newTemplate.type}
                  onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.slice(1).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={newTemplate.message}
                  onChange={(e) => setNewTemplate({ ...newTemplate, message: e.target.value })}
                  placeholder="Enter message content with placeholders like {STUDENT_NAME}, {DATE}, etc."
                  required
                  rows={5}
                />
                <p className="text-sm text-gray-500">
                  Available placeholders: {"{STUDENT_NAME}"}, {"{COURSE_NAME}"}, {"{DATE}"}, {"{AMOUNT}"},{" "}
                  {"{DUE_DATE}"}, {"{GPA}"}, {"{EVENT_NAME}"}, {"{EVENT_DATE}"}, {"{EVENT_TIME}"}, {"{VENUE}"},{" "}
                  {"{REASON}"}, {"{RESUME_DATE}"}, {"{SCHOLARSHIP_NAME}"}, {"{BOOK_TITLE}"}, {"{COMPANY_NAME}"},{" "}
                  {"{DEPARTMENT}"}, {"{DEADLINE}"}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newTemplate.status === "Active"}
                  onCheckedChange={(checked) =>
                    setNewTemplate({ ...newTemplate, status: checked ? "Active" : "Inactive" })
                  }
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddTemplateOpen(false)
                  resetForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Add Template</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Template Modal */}
      <Dialog
        open={isViewTemplateOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTemplate(null)
          }
          setIsViewTemplateOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Template Details</DialogTitle>
            <DialogDescription>View Email template information.</DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">Template Name</Label>
                <p className="font-medium">{selectedTemplate.name}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Type</Label>
                <p>
                  <Badge variant="outline">{selectedTemplate.type}</Badge>
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Status</Label>
                <p>
                  <Badge variant={selectedTemplate.status === "Active" ? "default" : "secondary"}>
                    {selectedTemplate.status}
                  </Badge>
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Message</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedTemplate.message}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Last Sent</Label>
                <p>{selectedTemplate.lastSent}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewTemplateOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewTemplateOpen(false)
                openEditModal(selectedTemplate)
              }}
            >
              Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Template Modal */}
      <Dialog
        open={isEditTemplateOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTemplate(null)
          }
          setIsEditTemplateOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit SMS Template</DialogTitle>
            <DialogDescription>Update the SMS template details.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEditTemplate()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">
                  Template Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="e.g., Attendance Alert"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">
                  Template Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newTemplate.type}
                  onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
                  required
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {templateTypes.slice(1).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="edit-message"
                  value={newTemplate.message}
                  onChange={(e) => setNewTemplate({ ...newTemplate, message: e.target.value })}
                  placeholder="Enter message content with placeholders like {STUDENT_NAME}, {DATE}, etc."
                  required
                  rows={5}
                />
                <p className="text-sm text-gray-500">
                  Available placeholders: {"{STUDENT_NAME}"}, {"{COURSE_NAME}"}, {"{DATE}"}, {"{AMOUNT}"},{" "}
                  {"{DUE_DATE}"}, {"{GPA}"}, {"{EVENT_NAME}"}, {"{EVENT_DATE}"}, {"{EVENT_TIME}"}, {"{VENUE}"},{" "}
                  {"{REASON}"}, {"{RESUME_DATE}"}, {"{SCHOLARSHIP_NAME}"}, {"{BOOK_TITLE}"}, {"{COMPANY_NAME}"},{" "}
                  {"{DEPARTMENT}"}, {"{DEADLINE}"}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-status"
                  checked={newTemplate.status === "Active"}
                  onCheckedChange={(checked) =>
                    setNewTemplate({ ...newTemplate, status: checked ? "Active" : "Inactive" })
                  }
                />
                <Label htmlFor="edit-status">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditTemplateOpen(false)
                  resetForm()
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

      {/* Send SMS Modal */}
      <Dialog
        open={isSendSMSOpen}
        onOpenChange={(open) => {
          setIsSendSMSOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>Send SMS notifications to students or faculty.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsSendSMSOpen(false)
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipients">
                  Recipients <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="all">
                  <SelectTrigger id="recipients">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="department">By Department</SelectItem>
                    <SelectItem value="course">By Course</SelectItem>
                    <SelectItem value="year">By Year</SelectItem>
                    <SelectItem value="individual">Individual Students</SelectItem>
                    <SelectItem value="faculty">Faculty Members</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">
                  SMS Template <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {smsTemplates && smsTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preview">Message Preview</Label>
                <div className="p-3 bg-gray-50 rounded-md text-sm min-h-[100px]">
                  Dear Student, your attendance in [Course Name] has fallen below the required percentage. Please
                  contact your department coordinator.
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule (Optional)</Label>
                <div className="flex gap-2">
                  <Select defaultValue="now">
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="When to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Now</SelectItem>
                      <SelectItem value="later">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="datetime-local" className="flex-1" disabled />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsSendSMSOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Send Email</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

        <ConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteTemplate}
        itemName={selectedTemplate?.name}
        isLoading={isDeleting}
        title="Delete Template"
        description="Are you sure you want to delete this Template?"
        confirmText="Delete"
        cancelText="Cancel"
      />

    </div>
  )
}
