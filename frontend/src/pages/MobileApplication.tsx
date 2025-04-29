"use client"

import { useState } from "react"
import { Bell, Download, QrCode, Eye, Edit, Trash2, MoreVertical, Search, Filter } from "lucide-react"

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

// Mock data
const notifications = [
  {
    id: 1,
    title: "Exam Schedule",
    message: "Final exams will begin on November 15th. Please check the portal for detailed schedule.",
    type: "Academic",
    status: "Scheduled",
    scheduledFor: "2023-11-01 08:00 AM",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    message: "This is a reminder that the second semester fees are due by October 30th.",
    type: "Payment",
    status: "Sent",
    scheduledFor: "2023-10-15 09:00 AM",
  },
  {
    id: 3,
    title: "Sports Day",
    message: "Annual sports day will be held on November 5th. All students are required to participate.",
    type: "Event",
    status: "Draft",
    scheduledFor: "",
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    message: "Parent-teacher meeting is scheduled for November 10th. Please book your slot through the app.",
    type: "Meeting",
    status: "Scheduled",
    scheduledFor: "2023-11-05 10:00 AM",
  },
  {
    id: 5,
    title: "Holiday Announcement",
    message: "The school will remain closed on October 25th due to local elections.",
    type: "Announcement",
    status: "Sent",
    scheduledFor: "2023-10-20 08:30 AM",
  },
  {
    id: 6,
    title: "New Course Registration",
    message: "Registration for next semester courses is now open. Please register before November 20th.",
    type: "Academic",
    status: "Draft",
    scheduledFor: "",
  },
  {
    id: 7,
    title: "Library Notice",
    message: "The library will be closed for inventory from October 28th to October 30th.",
    type: "Announcement",
    status: "Scheduled",
    scheduledFor: "2023-10-25 09:00 AM",
  },
  {
    id: 8,
    title: "Career Fair",
    message: "Annual career fair will be held on November 12th. All final year students are encouraged to attend.",
    type: "Event",
    status: "Draft",
    scheduledFor: "",
  },
]

const appStats = [
  { id: 1, metric: "Total Downloads", value: "2,547", change: "+12%", period: "vs last month" },
  { id: 2, metric: "Active Users", value: "1,893", change: "+8%", period: "vs last month" },
  { id: 3, metric: "Push Notification Opens", value: "76%", change: "+5%", period: "vs last month" },
  { id: 4, metric: "Average Session Duration", value: "4m 32s", change: "+15%", period: "vs last month" },
]

export default function MobileApplication() {
  const [isAddNotificationOpen, setIsAddNotificationOpen] = useState(false)
  const [isViewNotificationOpen, setIsViewNotificationOpen] = useState(false)
  const [isEditNotificationOpen, setIsEditNotificationOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [activeTab, setActiveTab] = useState("notifications")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "Academic",
    status: "Draft",
    scheduledFor: "",
  })

  const notificationTypes = ["All", "Academic", "Payment", "Event", "Meeting", "Announcement"]

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "All" || notification.type === selectedType
    return matchesSearch && matchesType
  })

  // Pagination logic
  const indexOfLastNotification = currentPage * itemsPerPage
  const indexOfFirstNotification = indexOfLastNotification - itemsPerPage
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification)
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage)

  const resetForm = () => {
    setNewNotification({
      title: "",
      message: "",
      type: "Academic",
      status: "Draft",
      scheduledFor: "",
    })
  }

  const openViewModal = (notification: any) => {
    setSelectedNotification(notification)
    setIsViewNotificationOpen(true)
  }

  const openEditModal = (notification: any) => {
    setSelectedNotification(notification)
    setNewNotification({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      status: notification.status,
      scheduledFor: notification.scheduledFor,
    })
    setIsEditNotificationOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Mobile Application</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <QrCode size={16} />
            App QR Code
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Download Links
          </Button>
          <Button className="gap-2" onClick={() => setIsAddNotificationOpen(true)}>
            <Bell size={16} />
            New Notification
          </Button>
        </div>
      </div>

      {/* App Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {appStats.map((stat) => (
          <Card key={stat.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">
                <span className={`font-medium ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>{" "}
                {stat.period}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notifications" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
          <TabsTrigger value="features">App Features</TabsTrigger>
          <TabsTrigger value="settings">App Settings</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter push notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search notifications..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset to first page on search
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
                    {notificationTypes.map((type) => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => {
                          setSelectedType(type)
                          setCurrentPage(1) // Reset to first page on filter change
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
                    setCurrentPage(1) // Reset to first page on filter reset
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Table */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>{filteredNotifications.length} notifications found</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled For</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-[250px]">{notification.message}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{notification.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            notification.status === "Sent"
                              ? "default"
                              : notification.status === "Scheduled"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{notification.scheduledFor || "—"}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => openViewModal(notification)}>
                              <Eye size={16} />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => openEditModal(notification)}>
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
                Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredNotifications.length)} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredNotifications.length)} of {filteredNotifications.length}{" "}
                notifications
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

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Features</CardTitle>
              <CardDescription>Enable or disable features in the mobile application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Grades & Attendance</Label>
                    <p className="text-sm text-gray-500">Allow students to view grades and attendance records</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Fee Payment</Label>
                    <p className="text-sm text-gray-500">Enable online fee payment through the app</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Homework & Assignments</Label>
                    <p className="text-sm text-gray-500">Allow students to view and submit assignments</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">School Calendar</Label>
                    <p className="text-sm text-gray-500">Display school events and holidays</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">In-App Messaging</Label>
                    <p className="text-sm text-gray-500">Allow communication between students, teachers, and parents</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Digital ID Card</Label>
                    <p className="text-sm text-gray-500">Display student ID cards with QR code</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Library Access</Label>
                    <p className="text-sm text-gray-500">Allow students to browse and reserve library books</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Configure general settings for the mobile application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="app-name">App Name</Label>
                  <Input id="app-name" defaultValue="School Connect" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="app-theme">App Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger id="app-theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Enable push notifications for all users</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Offline Mode</Label>
                    <p className="text-sm text-gray-500">Allow users to access certain features offline</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label className="text-base">Biometric Authentication</Label>
                    <p className="text-sm text-gray-500">Allow login using fingerprint or face recognition</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Notification Modal */}
      <Dialog
        open={isAddNotificationOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetForm()
          }
          setIsAddNotificationOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Push Notification</DialogTitle>
            <DialogDescription>Create a new push notification to send to app users.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsAddNotificationOpen(false)
              resetForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Notification Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="e.g., Exam Schedule"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="Enter notification message"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">
                  Notification Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                  required
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newNotification.status}
                  onValueChange={(value) => setNewNotification({ ...newNotification, status: value })}
                  required
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newNotification.status === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledFor">
                    Schedule For <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="scheduledFor"
                    type="datetime-local"
                    value={newNotification.scheduledFor}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduledFor: e.target.value })}
                    required={newNotification.status === "Scheduled"}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddNotificationOpen(false)
                  resetForm()
                }}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">{newNotification.status === "Draft" ? "Save as Draft" : "Schedule"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Notification Modal */}
      <Dialog
        open={isViewNotificationOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNotification(null)
          }
          setIsViewNotificationOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notification Details</DialogTitle>
            <DialogDescription>View push notification information.</DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-500">Title</Label>
                <p className="font-medium">{selectedNotification.title}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Message</Label>
                <p className="p-3 bg-gray-50 rounded-md text-sm">{selectedNotification.message}</p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Type</Label>
                <p>
                  <Badge variant="outline">{selectedNotification.type}</Badge>
                </p>
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-500">Status</Label>
                <p>
                  <Badge
                    variant={
                      selectedNotification.status === "Sent"
                        ? "default"
                        : selectedNotification.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedNotification.status}
                  </Badge>
                </p>
              </div>

              {selectedNotification.scheduledFor && (
                <div className="grid gap-2">
                  <Label className="text-gray-500">Scheduled For</Label>
                  <p>{selectedNotification.scheduledFor}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsViewNotificationOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewNotificationOpen(false)
                openEditModal(selectedNotification)
              }}
            >
              Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Notification Modal */}
      <Dialog
        open={isEditNotificationOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNotification(null)
            resetForm()
          }
          setIsEditNotificationOpen(open)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Push Notification</DialogTitle>
            <DialogDescription>Update the push notification details.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setIsEditNotificationOpen(false)
              resetForm()
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">
                  Notification Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  placeholder="e.g., Exam Schedule"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-message">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="edit-message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  placeholder="Enter notification message"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-type">
                  Notification Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
                  required
                >
                  <SelectTrigger id="edit-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Event">Event</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Announcement">Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newNotification.status}
                  onValueChange={(value) => setNewNotification({ ...newNotification, status: value })}
                  required
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newNotification.status === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="edit-scheduledFor">
                    Schedule For <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-scheduledFor"
                    type="datetime-local"
                    value={newNotification.scheduledFor}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduledFor: e.target.value })}
                    required={newNotification.status === "Scheduled"}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditNotificationOpen(false)
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
    </div>
  )
}
