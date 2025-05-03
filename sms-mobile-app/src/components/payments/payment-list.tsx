"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const payments = [
  {
    id: "1",
    description: "Tuition Fee - June 2023",
    amount: 120.50,
    dueDate: new Date("2023-06-15"),
    status: "pending"
  },
  {
    id: "2",
    description: "Library Fine",
    amount: 5.00,
    dueDate: new Date("2023-06-10"),
    status: "overdue"
  },
  {
    id: "3",
    description: "Field Trip Payment",
    amount: 35.00,
    dueDate: new Date("2023-06-20"),
    status: "paid"
  }
]

export function PaymentList() {
  return (
    <ScrollArea className="h-[calc(100vh-9rem)]">
      <div className="space-y-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Due</span>
                <span className="font-medium">$125.50</span>
              </div>
              <div className="flex justify-between">
                <span>Overdue</span>
                <span className="font-medium text-red-500">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Upcoming</span>
                <span className="font-medium">$120.50</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payments.map(payment => (
              <div key={payment.id} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Due {format(payment.dueDate, "MMM d, yyyy")}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  {payment.status === "paid" ? (
                    <Badge variant="secondary">Paid</Badge>
                  ) : payment.status === "overdue" ? (
                    <Badge variant="destructive">Overdue</Badge>
                  ) : (
                    <Button size="sm">Pay</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}