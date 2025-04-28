"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, Download, Eye, FileText, Search, Store, X } from "lucide-react"
import { useRestaurantRequests } from "@/hooks/use-restaurant-requests"
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
import Image from "next/image"

export default function RestaurantRequestsPage() {
  const { toast } = useToast()
  const { restaurantRequests, updateRestaurantStatus } = useRestaurantRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)

  const filteredRequests = restaurantRequests.filter(
    (request) =>
      request.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleApprove = (id: string) => {
    updateRestaurantStatus(id, "approved")
    toast({
      title: "Restaurant Approved",
      description: "The restaurant has been approved successfully.",
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

    updateRestaurantStatus(id, "rejected", rejectionReason)
    setIsRejectDialogOpen(false)
    setRejectionReason("")

    toast({
      title: "Restaurant Rejected",
      description: "The restaurant has been rejected.",
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

  // Restaurant images based on cuisine type
  const getRestaurantImage = (cuisine: string) => {
    const cuisineImageMap: Record<string, string> = {
      "Sri Lankan": "/rest1.jpg",
      Fusion: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=200&auto=format&fit=crop",
      "Indian/Sri Lankan":
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop",
      Seafood: "/rest2.jpg",
      Italian: "/rest3.jpg",
    }

    return (
      cuisineImageMap[cuisine] ||
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop"
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Restaurant Requests</h2>
        <Button variant="outline" className="hover:bg-[#4ade80] hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-600" />
        <Input
          placeholder="Search by restaurant name, owner, or email..."
          className="max-w-sm border-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#4ade80] data-[state=active]:text-white">
            All Requests
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-[#4ade80] data-[state=active]:text-white">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-[#4ade80] data-[state=active]:text-white">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-[#4ade80] data-[state=active]:text-white">
            Rejected
          </TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredRequests.filter((request) => status === "all" || request.status === status).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Store className="h-8 w-8 text-gray-400" />
                  <div className="text-gray-500">No restaurant requests found</div>
                  <div className="text-gray-500">No restaurant requests found</div>
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
                            <div className="flex items-center space-x-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                <Image
                                  src={getRestaurantImage(request.cuisine) || "/placeholder.svg"}
                                  alt={request.restaurantName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="flex items-center text-gray-900">
                                  {request.restaurantName}
                                  <span className="ml-2">{getStatusBadge(request.status)}</span>
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                  Submitted on {new Date(request.submittedAt).toLocaleDateString()} by{" "}
                                  {request.ownerName} ({request.email})
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-4 md:grid-cols-2">
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">Restaurant Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Cuisine:</span>
                                  <span className="text-gray-900">{request.cuisine}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Phone:</span>
                                  <span className="text-gray-900">{request.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Address:</span>
                                  <span className="text-right text-gray-900">{request.address}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 text-sm font-medium text-gray-900">Documents</h4>
                              <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Business Registration
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Food License
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <FileText className="mr-2 h-4 w-4" />
                                  Tax Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" onClick={() => setSelectedRequest(request)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl bg-white">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Restaurant Request Details</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                  Review all information before approving or rejecting this request
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-start space-x-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={getRestaurantImage(selectedRequest?.cuisine || "")} />
                                    <AvatarFallback>
                                      <Store className="h-6 w-6" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {selectedRequest?.restaurantName}
                                    </h3>
                                    <p className="text-sm text-gray-600">{selectedRequest?.cuisine} Cuisine</p>
                                  </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <h4 className="mb-2 font-medium text-gray-900">Owner Information</h4>
                                    <div className="space-y-2 rounded-md border p-3">
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Name:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.ownerName}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Email:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.email}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Phone:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.phone}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="mb-2 font-medium text-gray-900">Restaurant Information</h4>
                                    <div className="space-y-2 rounded-md border p-3">
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Address:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.address}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Cuisine:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.cuisine}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3">
                                        <span className="text-sm text-gray-600">Submitted:</span>
                                        <span className="col-span-2 text-sm text-gray-900">
                                          {selectedRequest?.submittedAt &&
                                            new Date(selectedRequest.submittedAt).toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium text-gray-900">Description</h4>
                                  <div className="rounded-md border p-3">
                                    <p className="text-sm text-gray-900">{selectedRequest?.description}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="mb-2 font-medium text-gray-900">Verification Documents</h4>
                                  <div className="grid gap-2 md:grid-cols-3">
                                    <Button variant="outline" className="justify-start">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Business Registration
                                    </Button>
                                    <Button variant="outline" className="justify-start">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Food License
                                    </Button>
                                    <Button variant="outline" className="justify-start">
                                      <FileText className="mr-2 h-4 w-4" />
                                      Tax Certificate
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
                                <DialogContent className="bg-white">
                                  <DialogHeader>
                                    <DialogTitle className="text-gray-900">Reject Restaurant Request</DialogTitle>
                                    <DialogDescription className="text-gray-600">
                                      Please provide a reason for rejecting this restaurant request.
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
                                        className="min-h-[100px] border-gray-300"
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
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
