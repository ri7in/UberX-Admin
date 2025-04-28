"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, Clock, Search, Truck, X } from "lucide-react"
import { useOrders } from "@/hooks/use-orders"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function OrdersPage() {
  const { toast } = useToast()
  const { orders, updateOrderStatus } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [visibleOrders, setVisibleOrders] = useState(orders)

  const filteredOrders = visibleOrders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  useEffect(() => {
    setVisibleOrders(orders)
  }, [orders])

  const handleStatusChange = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status)

    // If moving to completed and we're not on the completed tab, remove from current view
    if (status === "completed" && activeTab !== "completed") {
      setVisibleOrders((prev) => prev.filter((order) => order.id !== orderId))
    }

    toast({
      title: "Order Updated",
      description: `Order #${orderId} has been marked as ${status}`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "preparing":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <Check className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "preparing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by ID, customer name, or items..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs
        defaultValue="all"
        className="space-y-4"
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value)
          setVisibleOrders(orders) // Reset visible orders when changing tabs
        }}
      >
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {["all", "pending", "preparing", "completed", "cancelled"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {filteredOrders.filter((order) => status === "all" || order.status === status).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="text-muted-foreground">No orders found</div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                <AnimatePresence>
                  {filteredOrders
                    .filter((order) => status === "all" || order.status === status)
                    .sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())
                    .map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300">
                          <CardHeader className="pb-2">
                            <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
                              <div className="flex items-center">
                                {order.customer.avatar && (
                                  <div className="relative h-8 w-8 overflow-hidden rounded-full mr-2">
                                    <Image
                                      src={order.customer.avatar || "/placeholder.svg"}
                                      alt={order.customer.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <CardTitle className="flex items-center">
                                    Order #{order.id}
                                    <Badge className={`ml-2 ${getStatusColor(order.status)}`} variant="outline">
                                      <span className="flex items-center">
                                        {getStatusIcon(order.status)}
                                        <span className="ml-1 capitalize">{order.status}</span>
                                      </span>
                                    </Badge>
                                  </CardTitle>
                                  <CardDescription>
                                    {new Date(order.orderTime).toLocaleString()} - {order.customer.name} (
                                    {order.customer.phone})
                                  </CardDescription>
                                  <div className="flex items-center mt-1 text-[#4ade80]">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span className="text-xs">
                                      Estimated preparation time: {order.totalPreparationTime} minutes
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                {order.status !== "completed" && order.status !== "cancelled" && (
                                  <>
                                    {order.status === "pending" && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleStatusChange(order.id, "preparing")}
                                        className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                                      >
                                        Start Preparing
                                      </Button>
                                    )}
                                    {order.status === "preparing" && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleStatusChange(order.id, "completed")}
                                        className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                                      >
                                        Mark Completed
                                      </Button>
                                    )}
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleStatusChange(order.id, "cancelled")}
                                    >
                                      Cancel Order
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium">Order Items</h4>
                                <div className="mt-2 divide-y">
                                  {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between py-2">
                                      <div className="flex items-center">
                                        <span className="font-medium">{item.quantity}x</span>
                                        <span className="ml-2">{item.name}</span>
                                        <span className="ml-2 text-xs text-muted-foreground">
                                          ({item.preparationTime} mins)
                                        </span>
                                      </div>
                                      <span>LKR {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <div className="flex justify-between font-medium">
                                  <span>Total:</span>
                                  <span>LKR {order.subtotal.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
