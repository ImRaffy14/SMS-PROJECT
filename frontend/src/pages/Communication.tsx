"use client"

import { useState } from "react"
import { MessageSquare, Search, Filter, MoreVertical, Edit, Trash2, Eye, Bell, Loader2 } from "lucide-react"

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useQuery } from "@tanstack/react-query"
import { getAnnouncements } from "@/api/announcement"
import { Announcement } from "@/types"
import FullPageLoader from "@/components/FullpageLoader"
import {
  useCreateAnnouncement,
  useEditAnnouncement,
  useDeleteAnnouncement
} from "@/hooks/useCommunication"
import { ConfirmationModal } from "@/components/ConfirmationModal"



const messages = [
  {
    id: 1,
    sender: "John Smith",
    senderRole: "Teacher",
    recipient: "Emma Johnson's Parent",
    subject: "Regarding Academic Performance",
    message: "I wanted to discuss Emma's recent performance in Mathematics. She's been doing exceptionally well.",
    status: "Read",
    sentAt: "2023-10-25 10:30 AM",
  },
  {
    id: 2,
    sender: "Michael Brown",
    senderRole: "Parent",
    recipient: "Science Teacher",
    subject: "Science Project Query",
    message: "I have a question regarding the upcoming science project. Could you please provide more details?",
    status: "Unread",
    sentAt: "2023-10-26 09:15 AM",
  },
  {
    id: 3,
    sender: "Principal Wilson",
    senderRole: "Admin",
    recipient: "All Teachers",
    subject: "Staff Meeting",
    message: "Reminder: We have a staff meeting scheduled for tomorrow at 3:30 PM in the conference room.",
    status: "Read",
    sentAt: "2023-10-24 02:45 PM",
  },
  {
    id: 4,
    sender: "Olivia Davis",
    senderRole: "Teacher",
    recipient: "William Wilson's Parent",
    subject: "Behavior Concern",
    message: "I would like to discuss William's behavior in class. Could we schedule a meeting?",
    status: "Unread",
    sentAt: "2023-10-26 11:20 AM",
  },
  {
    id: 5,
    sender: "Admin Office",
    senderRole: "Admin",
    recipient: "All Parents",
    subject: "Fee Structure Update",
    message: "Please note that there has been a slight revision in the fee structure for the next academic year.",
    status: "Read",
    sentAt: "2023-10-23 01:30 PM",
  },
  {
    id: 6,
    sender: "Sarah Johnson",
    senderRole: "Teacher",
    recipient: "David Miller's Parent",
    subject: "Academic Excellence",
    message: "I'm pleased to inform you that David has been selected for the Academic Excellence Award this semester.",
    status: "Read",
    sentAt: "2023-10-21 03:45 PM",
  },
  {
    id: 7,
    sender: "Robert Thompson",
    senderRole: "Parent",
    recipient: "Class Teacher",
    subject: "Leave Application",
    message: "My child will be absent from school for three days due to a family function. Please grant leave.",
    status: "Unread",
    sentAt: "2023-10-27 08:30 AM",
  },
  {
    id: 8,
    sender: "Library Department",
    senderRole: "Admin",
    recipient: "All Students",
    subject: "New Books Available",
    message: "We have added 50 new books to our library collection. Students are encouraged to check them out.",
    status: "Read",
    sentAt: "2023-10-22 11:00 AM",
  },
]

export default function CommunicationModule() {
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false)
  const [isViewAnnouncementOpen, setIsViewAnnouncementOpen] = useState(false)
  const [isEditAnnouncementOpen, setIsEditAnnouncementOpen] = useState(false)
  const [isComposeMessageOpen, setIsComposeMessageOpen] = useState(false)
  const [isViewMessageOpen, setIsViewMessageOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAudience, setSelectedAudience] = useState("All")
  const [activeTab, setActiveTab] = useState("announcements")
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  // Pagination state
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1)
  const itemsPerPage = 5

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    audience: "All",
    status: "Draft",
  })

  const [newMessage, setNewMessage] = useState({
    recipient: "",
    subject: "",
    message: "",
  })

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useQuery<Announcement[], Error>({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
    staleTime: 60000,
    gcTime: 300000,
  })

  const audienceOptions = ["All", "Students", "Parents", "Teachers", "Staff"]

  const filteredAnnouncements: Announcement[] = announcements?.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAudience =
      selectedAudience === "All" || announcement.audience === selectedAudience
    return matchesSearch && matchesAudience
  }) ?? []
  


  // Pagination logic for announcements
  const indexOfLastAnnouncement = currentAnnouncementPage * itemsPerPage
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - itemsPerPage
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement)
  const totalAnnouncementPages = Math.ceil(filteredAnnouncements.length / itemsPerPage)


  const resetAnnouncementForm = () => {
    setNewAnnouncement({
      title: "",
      message: "",
      audience: "All",
      status: "Draft",
    })
  }

  const resetMessageForm = () => {
    setNewMessage({
      recipient: "",
      subject: "",
      message: "",
    })
  }

  const openViewAnnouncementModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setIsViewAnnouncementOpen(true)
  }

  const openEditAnnouncementModal = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setNewAnnouncement({
      title: announcement.title,
      message: announcement.message,
      audience: announcement.audience,
      status: announcement.status,
    })
    setIsEditAnnouncementOpen(true)
  }

  const { mutate: createAnnouncement } = useCreateAnnouncement()

  const handleAddAnnouncement = (announcement: Announcement) => {
    createAnnouncement(announcement, {
      onSuccess: () => {
        setIsAddAnnouncementOpen(false)
        resetAnnouncementForm()
        refetch()
      },
      onError: (error) => {
        console.error("Error creating announcement:", error)
      }
    })
  }

  const { mutate: editAnnouncement, isPending: isEditing } = useEditAnnouncement()

  const handleEditAnnouncement = (announcement: Announcement) => {
    editAnnouncement({data: announcement, id: selectedAnnouncement?.id}, {
      onSuccess: () => {
        setIsEditAnnouncementOpen(false)
        resetAnnouncementForm()
        refetch()
      },
      onError: (error) => {
        console.error("Error editing announcement:", error)
      },
    })
  }

    const openConfirmationModal = (announcement: Announcement) => {
      setSelectedAnnouncement(announcement);
      setIsConfirmationModalOpen(true);
    };
  const { mutate: deleteAnnouncement, isPending: isDeleting } = useDeleteAnnouncement()

  const handleDeleteAnnouncement = () => {
    if(!selectedAnnouncement) return

    console.log(selectedAnnouncement)
    deleteAnnouncement(selectedAnnouncement.id, {
      onSuccess: () => {
        setIsConfirmationModalOpen(false)
        refetch()
      },
      onError: (error) => {
        console.error("Error deleting announcement:", error)
      },
    })
  }

  if (isLoading) {
    return <FullPageLoader message="Loading announcements..." showLogo={true} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Communication Module</h2>
        <div className="flex gap-2">
          <Button className="gap-2" onClick={() => setIsAddAnnouncementOpen(true)}>
            <Bell size={16} />
            New Announcement
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="announcements" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className=" w-full ">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search announcements..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentAnnouncementPage(1) // Reset to first page on search
                    }}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-start gap-2">
                      <Filter size={16} />
                      Audience: {selectedAudience}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {audienceOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => {
                          setSelectedAudience(option)
                          setCurrentAnnouncementPage(1) // Reset to first page on filter change
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
                    setSelectedAudience("All")
                    setCurrentAnnouncementPage(1) // Reset to first page on filter reset
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Announcements Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>{filteredAnnouncements.length} announcements found</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell>
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[250px]">{announcement.message}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{announcement.audience}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            announcement.status === "Published"
                              ? "default"
                              : announcement.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{announcement.createdAt || "—"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openViewAnnouncementModal(announcement)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => openEditAnnouncementModal(announcement)}>
                              <Edit size={16} />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600" onClick={() => openConfirmationModal(announcement)}>
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
                Showing {Math.min((currentAnnouncementPage - 1) * itemsPerPage + 1, filteredAnnouncements.length)} to{" "}
                {Math.min(currentAnnouncementPage * itemsPerPage, filteredAnnouncements.length)} of{" "}
                {filteredAnnouncements.length} announcements
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentAnnouncementPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentAnnouncementPage === 1}
                >
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentAnnouncementPage} of {totalAnnouncementPages || 1}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentAnnouncementPage((prev) => Math.min(prev + 1, totalAnnouncementPages))}
                  disabled={currentAnnouncementPage === totalAnnouncementPages || totalAnnouncementPages === 0}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Announcement Modal */}
      <Dialog
        open={isAddAnnouncementOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetAnnouncementForm()
          }
          setIsAddAnnouncementOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>Create a new announcement to be published.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAddAnnouncement({
                ...newAnnouncement,
                id: selectedAnnouncement?.id || 0,
                createdAt: selectedAnnouncement?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Announcement Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="e.g., End of Term Exams"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  placeholder="Enter announcement message"
                  required
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">
                  Target Audience <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newAnnouncement.audience}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, audience: value })}
                  required
                >
                  <SelectTrigger id="audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newAnnouncement.status}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, status: value })}
                  required
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Publish Now</SelectItem>
                    <SelectItem value="Scheduled">Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newAnnouncement.status === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">
                    Schedule For <span className="text-red-500">*</span>
                  </Label>
                  <Input id="scheduledFor" type="datetime-local" required={newAnnouncement.status === "Scheduled"} />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddAnnouncementOpen(false)
                  resetAnnouncementForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">
                {newAnnouncement.status === "Draft"
                  ? "Save as Draft"
                  : newAnnouncement.status === "Published"
                    ? "Publish"
                    : "Schedule"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Announcement Modal */}
      <Dialog
        open={isViewAnnouncementOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAnnouncement(null)
          }
          setIsViewAnnouncementOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Announcement Details</DialogTitle>
            <DialogDescription>View announcement information.</DialogDescription>
          </DialogHeader>

          {selectedAnnouncement && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">Title</Label>
                <p className="font-medium">{selectedAnnouncement.title}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Message</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedAnnouncement.message}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Target Audience</Label>
                <p>
                  <Badge variant="outline">{selectedAnnouncement.audience}</Badge>
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Status</Label>
                <p>
                  <Badge
                    variant={
                      selectedAnnouncement.status === "Published"
                        ? "default"
                        : selectedAnnouncement.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedAnnouncement.status}
                  </Badge>
                </p>
              </div>

              {selectedAnnouncement.publishedAt && (
                <div className="grid gap-2">
                  <Label className="text-gray-500">Published At</Label>
                  <p>{selectedAnnouncement.publishedAt}</p>
                </div>
              )}

              <div className="grid gap-2">
                <Label className="text-gray-500">Author</Label>
                <p>{selectedAnnouncement.author}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewAnnouncementOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewAnnouncementOpen(false)
                openEditAnnouncementModal(selectedAnnouncement)
              }}
            >
              Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Announcement Modal */}
      <Dialog
        open={isEditAnnouncementOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedAnnouncement(null)
            resetAnnouncementForm()
          }
          setIsEditAnnouncementOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>Update the announcement details.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleEditAnnouncement({
                ...newAnnouncement,
                id: selectedAnnouncement?.id || 0,
                createdAt: selectedAnnouncement?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              })
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">
                  Announcement Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="e.g., End of Term Exams"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="edit-message"
                  value={newAnnouncement.message}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
                  placeholder="Enter announcement message"
                  required
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-audience">
                  Target Audience <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newAnnouncement.audience}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, audience: value })}
                  required
                >
                  <SelectTrigger id="edit-audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newAnnouncement.status}
                  onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, status: value })}
                  required
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newAnnouncement.status === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-scheduledFor">
                    Schedule For <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-scheduledFor"
                    type="datetime-local"
                    required={newAnnouncement.status === "Scheduled"}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditAnnouncementOpen(false)
                  resetAnnouncementForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={isEditing} type="submit">
                {isEditing && <Loader2 className="animate-spin" size={16} />}
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Compose Message Modal */}
      <Dialog
        open={isComposeMessageOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetMessageForm()
          }
          setIsComposeMessageOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to students, parents, or staff.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsComposeMessageOpen(false)
              resetMessageForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">
                  Recipient <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newMessage.recipient}
                  onValueChange={(value) => setNewMessage({ ...newMessage, recipient: value })}
                  required
                >
                  <SelectTrigger id="recipient">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-students">All Students</SelectItem>
                    <SelectItem value="all-parents">All Parents</SelectItem>
                    <SelectItem value="all-teachers">All Teachers</SelectItem>
                    <SelectItem value="all-staff">All Staff</SelectItem>
                    <SelectItem value="individual">Select Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newMessage.recipient === "individual" && (
                <div className="space-y-2">
                  <Label htmlFor="individual-recipient">
                    Individual Recipient <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="individual-recipient"
                    placeholder="Search for a recipient..."
                    required={newMessage.recipient === "individual"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="subject">
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                  placeholder="e.g., Regarding Academic Performance"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message-content">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message-content"
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  placeholder="Enter your message here..."
                  required
                  rows={6}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsComposeMessageOpen(false)
                  resetMessageForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Message Modal */}
      <Dialog
        open={isViewMessageOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedMessage(null)
          }
          setIsViewMessageOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>View message information.</DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedMessage.sender.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedMessage.sender}</div>
                  <div className="text-sm text-gray-500">{selectedMessage.senderRole}</div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Recipient</Label>
                <p>{selectedMessage.recipient}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Subject</Label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Message</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedMessage.message}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Sent At</Label>
                <p>{selectedMessage.sentAt}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Status</Label>
                <p>
                  <Badge variant={selectedMessage.status === "Read" ? "secondary" : "default"}>
                    {selectedMessage.status}
                  </Badge>
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewMessageOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setIsViewMessageOpen(false)}>Reply</Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleDeleteAnnouncement}
        itemName={selectedAnnouncement?.email}
        isLoading={isDeleting}
        title="Delete User"
        description="Are you sure you want to delete this announcement?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  )
}
