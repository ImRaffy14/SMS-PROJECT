"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const subjects = [
  {
    id: "1",
    name: "Mathematics",
    grade: "A",
    percentage: 92,
    assignments: [
      { name: "Algebra Test", grade: "A", score: "45/50" },
      { name: "Geometry Quiz", grade: "B+", score: "38/40" }
    ]
  },
  {
    id: "2",
    name: "Science",
    grade: "B+",
    percentage: 87,
    assignments: [
      { name: "Chemistry Lab", grade: "A", score: "48/50" },
      { name: "Physics Test", grade: "B", score: "35/40" }
    ]
  },
  {
    id: "3",
    name: "English",
    grade: "A-",
    percentage: 90,
    assignments: [
      { name: "Essay", grade: "A-", score: "42/50" },
      { name: "Reading Test", grade: "A", score: "48/50" }
    ]
  }
]

export function GradeList() {
  return (
    <ScrollArea className="h-[calc(100vh-9rem)]">
      <div className="space-y-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>GPA</span>
                <span className="font-medium">3.7</span>
              </div>
              <div className="flex justify-between">
                <span>Rank</span>
                <span className="font-medium">15/120</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {subjects.map(subject => (
          <Card key={subject.id}>
            <CardHeader>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{subject.grade}</p>
                  <p className="text-sm text-muted-foreground">{subject.percentage}%</p>
                </div>
                <Progress value={subject.percentage} className="w-[60%] h-3" />
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
    </ScrollArea>
  )
}