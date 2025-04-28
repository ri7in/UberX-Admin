"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Bike, Check, Clock, Download, Eye, FileText, Search, X } from "lucide-react"
import { useRiderRequests } from "@/hooks/use-rider-requests"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function RiderRequestsPage() {
  const { toast } = useToast()
  const { riderRequests, updateRiderStatus } = useRiderRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  const filteredRequests = riderRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.phone.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleApprove = (id: string) => {
    updateRiderStatus(id, "approved")
    toast({
      title: "Rider Approved",
      description: "The rider has been approved successfully.",
    })
  }

  const handleReject = (id: string) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }

    updateRiderStatus(id, "rejected", rejectionReason)
    setIsRejectDialogOpen(false)
    setRejectionReason("")

    toast({
      title: "Rider Rejected",
      description: "The rider has been rejected.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <Check className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <X className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Unknown
          </Badge>
        )
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Rider Requests</h2>
        <Button variant="outline" className="hover:bg-[#4ade80] hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground text-gray-600" />
        <Input
          placeholder="Search by name, email, or phone..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredRequests.filter((request) => status === "all" || request.status === status).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Bike className="h-8 w-8 text-muted-foreground text-gray-600" />
                  <div className="text-muted-foreground text-gray-600">No rider requests found</div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredRequests
                  .filter((request) => status === "all" || request.status === status)
                  .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                  .map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
                            <div>
                              <CardTitle className="flex items-center text-gray-900">
                                {request.name}
                                <span className="ml-2">{getStatusBadge(request.status)}</span>
                              </CardTitle>
                              <CardDescription className="text-gray-600">
                                Submitted on {new Date(request.submittedAt).toLocaleDateString()} • {request.email} •{" "}
                                {request.phone}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">Rider Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground text-gray-600">Vehicle Type:</span>
                                  <span className="text-gray-900">{request.vehicleType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground text-gray-600">Vehicle Number:</span>
                                  <span className="text-gray-900">{request.vehicleNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground text-gray-600">Address:</span>
                                  <span className="text-right text-gray-900">{request.address}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">Documents</h4>
                              <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start text-gray-900">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Driver's License
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-gray-900">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Vehicle Registration
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start text-gray-900">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Insurance Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedRequest(request)}
                                className="text-gray-900"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Rider Request Details</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                  Review all information before approving or rejecting this request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-start space-x-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                                    <AvatarFallback>
                                      <Bike className="h-6 w-6" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900">{selectedRequest?.name}</h3>
                                    <p className="text-sm text-muted-foreground text-gray-600">
                                      {selectedRequest?.vehicleType} Driver
                                    </p>
                                  </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <h4 className="mb-2 font-medium text-gray-900">Personal Information</h4>
                                    <div className="space-y-2 rounded-md border p-3">
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Email:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.email}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Phone:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.phone}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Address:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.address}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="mb-2 font-medium text-gray-900">Vehicle Information</h4>
                                    <div className="space-y-2 rounded-md border p-3">
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Type:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.vehicleType}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Number:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.vehicleNumber}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-muted-foreground text-gray-600">Submitted:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.submittedAt &&
                                            new Date(selectedRequest.submittedAt).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium text-gray-900">Experience</h4>
                                  <div className="rounded-md border p-3">
                                    <p className="text-sm text-gray-900">{selectedRequest?.experience}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium text-gray-900">Verification Documents</h4>
                                  <div className="grid gap-2 md:grid-cols-3">
                                    <Button variant="outline" className="justify-start text-gray-900">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Driver's License
                                    </Button>
                                    <Button variant="outline" className="justify-start text-gray-900">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Vehicle Registration
                                    </Button>
                                    <Button variant="outline" className="justify-start text-gray-900">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Insurance Certificate
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {request.status === "pending" && (
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => handleApprove(request.id)}
                                className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="border-red-200 bg-red-100 text-red-800 hover:bg-red-200"
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900">Reject Rider Request</DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Please provide a reason for rejecting this rider request.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="reason" className="text-gray-900">
                                        Reason for rejection
                                      </Label>
                                      <Textarea
                                        id="reason"
                                        placeholder="Please explain why this request is being rejected..."
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() => setIsRejectDialogOpen(false)}
                                      className="text-gray-900"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={() => handleReject(request.id)}
                                      className="bg-red-500 text-white hover:bg-red-600"
                                    >
                                      Confirm Rejection
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
