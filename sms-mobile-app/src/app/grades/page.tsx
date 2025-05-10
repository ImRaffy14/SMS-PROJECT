"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    grade: "A",
    progress: 85,
    assignments: [
      { name: "Algebra Test", score: "45/50", grade: "A" },
      { name: "Geometry Quiz", score: "38/40", grade: "A-" },
    ],
  },
  {
    id: 2,
    name: "Science",
    grade: "B+",
    progress: 78,
    assignments: [
      { name: "Chemistry Lab", score: "48/50", grade: "A" },
      { name: "Physics Test", score: "35/40", grade: "B+" },
    ],
  },
]

export default function GradesPage() {

  return (
    <div className="pb-16">
      <PageHeader 
        title="Grades" 
        description="Your academic performance"
      />

      <div className="px-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>GPA</span>
              <span className="font-medium">3.7</span>
            </div>
            <div className="flex justify-between">
              <span>Rank</span>
              <span className="font-medium">15/120</span>
            </div>
          </CardContent>
        </Card>

        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{subject.grade}</p>
                  <p className="text-sm text-muted-foreground">{subject.progress}%</p>
                </div>
                <Progress value={subject.progress} className="w-[60%] h-3" />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subject.assignments.map((assignment, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{assignment.name}</TableCell>
                      <TableCell>{assignment.grade}</TableCell>
                      <TableCell className="text-right">{assignment.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      <MobileNav />
    </div>
  )
}