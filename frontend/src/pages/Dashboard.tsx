import {
  Users,
  MessageSquare,
  Smartphone,
  Database,
  Mail,
  Bell,
  GraduationCap,
  FileText,
  CheckCircle2,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

  const navigate = useNavigate()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">School Management Dashboard</h1>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+5.2%</span> from last semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">App Downloads</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,547</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium">-2.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Quick Access */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => navigate('/users')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Manage users, roles and permissions</div>
          </CardContent>
        </Card>
        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => navigate('/smsInteg')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Announcement</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Manage SMS templates and notifications</div>
          </CardContent>
        </Card>
        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => navigate('/feeCustomization')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Few Customization</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Customize fields, grading and reports</div>
          </CardContent>
        </Card>
        <Card
          className="hover:bg-accent/50 cursor-pointer transition-colors"
          onClick={() => navigate('/communication')}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Manage announcements and messages</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* Left Column - 4/7 width */}
        <div className="md:col-span-4 space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Student Enrollment Trends</CardTitle>
              <CardDescription>Monthly enrollment data for the current academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-2">
                {/* Simulated chart bars */}
                <div className="bg-primary/90 w-full h-[60%] rounded-md"></div>
                <div className="bg-primary/80 w-full h-[70%] rounded-md"></div>
                <div className="bg-primary/70 w-full h-[65%] rounded-md"></div>
                <div className="bg-primary/60 w-full h-[80%] rounded-md"></div>
                <div className="bg-primary/50 w-full h-[85%] rounded-md"></div>
                <div className="bg-primary/40 w-full h-[75%] rounded-md"></div>
                <div className="bg-primary/30 w-full h-[90%] rounded-md"></div>
                <div className="bg-primary/20 w-full h-[95%] rounded-md"></div>
                <div className="bg-primary/10 w-full h-[85%] rounded-md"></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Average grades by department</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-medium">Science Department</span>
                  </div>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <Progress value={87} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-medium">Mathematics Department</span>
                  </div>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-medium">Language Arts Department</span>
                  </div>
                  <span className="text-sm font-medium">91%</span>
                </div>
                <Progress value={91} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm font-medium">Social Studies Department</span>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 3/7 width */}
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">New student registered</p>
                  <p className="text-xs text-muted-foreground">Emma Johnson was added to Grade 10</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Announcement published</p>
                  <p className="text-xs text-muted-foreground">End of Term Exams schedule published</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Report template updated</p>
                  <p className="text-xs text-muted-foreground">Standard Report Card template was modified</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Bulk SMS sent</p>
                  <p className="text-xs text-muted-foreground">Fee Payment Reminder sent to 245 recipients</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View all activities
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                    <span className="text-xs font-bold">15</span>
                    <span className="text-xs">Nov</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End of Term Exams</p>
                    <p className="text-xs text-muted-foreground">All Grades</p>
                  </div>
                </div>
                <Badge>Academic</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                    <span className="text-xs font-bold">17</span>
                    <span className="text-xs">Nov</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Parent-Teacher Meeting</p>
                    <p className="text-xs text-muted-foreground">Elementary Department</p>
                  </div>
                </div>
                <Badge variant="outline">Meeting</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                    <span className="text-xs font-bold">20</span>
                    <span className="text-xs">Nov</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Annual Sports Day</p>
                    <p className="text-xs text-muted-foreground">All Departments</p>
                  </div>
                </div>
                <Badge variant="secondary">Event</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View calendar
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
