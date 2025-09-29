"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle } from "lucide-react"

const initialOrders = [
  { id: "ORD-1001", customer: "John Doe", total: "$120.00", status: "Pending" },
  { id: "ORD-1002", customer: "Jane Smith", total: "$250.00", status: "Pending" },
  { id: "ORD-1003", customer: "Mike Johnson", total: "$75.00", status: "Pending" },
  { id: "ORD-1004", customer: "John Doe", total: "$120.00", status: "Pending" },
  { id: "ORD-1005", customer: "Jane Smith", total: "$250.00", status: "Pending" },
  { id: "ORD-1006", customer: "Mike Johnson", total: "$75.00", status: "Pending" },
  { id: "ORD-1007", customer: "John Doe", total: "$120.00", status: "Pending" },
  { id: "ORD-1008", customer: "Jane Smith", total: "$250.00", status: "Pending" },
  { id: "ORD-1009", customer: "Mike Johnson", total: "$75.00", status: "Pending" },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: "Completed" } : o
      )
    )
    setOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
      case "Processing":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    // <Card className="">
        <div>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold">Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/40 transition">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  {order.status !== "Completed" && (
                    <Button
                      size="sm"
                      variant="default"
                      className="text-green-600 bg-green-100 hover:text-green-800 hover:bg-green-200 cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order)
                        setOpen(true)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Confirm Completion</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to mark <b>{selectedOrder?.id}</b> as <span className="text-green-600">Completed</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* </Card> */}
      </div>
  )
}
