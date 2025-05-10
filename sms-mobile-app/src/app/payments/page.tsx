"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"

const payments = [
  {
    id: 1,
    description: "Tuition Fee - Term 1",
    amount: 250.00,
    dueDate: "2023-11-15",
    status: "Pending",
  },
  {
    id: 2,
    description: "Library Fine",
    amount: 5.00,
    dueDate: "2023-11-10",
    status: "Overdue",
  },
  {
    id: 3,
    description: "Sports Fee",
    amount: 30.00,
    dueDate: "2023-12-01",
    status: "Paid",
  },
]

export default function PaymentsPage() {

  return (
    <div className="pb-16">
      <PageHeader 
        title="Payments" 
        description="Fee payments and transactions"
      />

      <div className="px-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Due</span>
                <span className="font-medium">$255.00</span>
              </div>
              <div className="flex justify-between">
                <span>Overdue</span>
                <span className="font-medium text-red-500">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Upcoming</span>
                <span className="font-medium">$250.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Due {payment.dueDate}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">${payment.amount.toFixed(2)}</p>
                  {payment.status === "Paid" ? (
                    <Badge variant="secondary">Paid</Badge>
                  ) : payment.status === "Overdue" ? (
                    <Badge variant="destructive">Overdue</Badge>
                  ) : (
                    <Button size="sm">Pay Now</Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <MobileNav />
    </div>
  )
}