"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Download, ShoppingBag, Star, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/settings">Settings</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // In a real app, this would generate and download a PDF report
              alert("Downloading report...")
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-[#00A082]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">LKR 325,000.25</div>
                <p className="text-xs text-gray-600 text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-[#00A082]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">+573</div>
                <p className="text-xs text-gray-600 text-muted-foreground">+12.2% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Customers</CardTitle>
                <Users className="h-4 w-4 text-[#00A082]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">+2350</div>
                <p className="text-xs text-gray-600 text-muted-foreground">+10.1% from last month</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-900">Rating</CardTitle>
                <Star className="h-4 w-4 text-[#00A082]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
                <p className="text-xs text-gray-600 text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="col-span-4"
          >
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Orders</CardTitle>
                <CardDescription className="text-gray-600">You have received 12 orders today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "1001",
                      time: "10:45 AM",
                      amount: "LKR 1,800.00",
                      customer: {
                        name: "Dinesh Jayawardena",
                        avatar:
                          "https://images.unsplash.com/photo-1570295999919-56ceb7e80295?q=80&w=100&auto=format&fit=crop",
                      },
                      prepTime: "25 mins",
                    },
                    {
                      id: "1002",
                      time: "12:30 PM",
                      amount: "LKR 700.00",
                      customer: {
                        name: "Priyanka Fernando",
                        avatar:
                          "https://images.unsplash.com/photo-1494790108377-be9c29b82a7e?q=80&w=100&auto=format&fit=crop",
                      },
                      prepTime: "20 mins",
                    },
                    {
                      id: "1005",
                      time: "2:15 PM",
                      amount: "LKR 2,670.00",
                      customer: { name: "Roshan Perera", avatar: null },
                      prepTime: "30 mins",
                    },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full mr-2">
                          <Image
                            src={
                              order.customer.avatar ||
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                            }
                            alt={order.customer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.time} - {order.amount} - {order.customer.name}
                          </p>
                          <p className="text-xs text-[#00A082]">Prep time: {order.prepTime}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/orders">View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-[#00A082] hover:text-white transition-colors duration-200"
                  >
                    <Link href="/dashboard/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="col-span-3"
          >
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Popular Items</CardTitle>
                <CardDescription className="text-gray-600">Your top selling menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Chicken Kottu", price: "LKR 650.00", orders: 120, prepTime: "20 mins" },
                    { name: "Egg Hoppers", price: "LKR 120.00", orders: 100, prepTime: "15 mins" },
                    { name: "Mutton Rolls", price: "LKR 180.00", orders: 90, prepTime: "10 mins" },
                    { name: "Vegetable Rice and Curry", price: "LKR 450.00", orders: 85, prepTime: "25 mins" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600 text-muted-foreground">
                          {item.price} - Ordered {item.orders} times
                        </p>
                        <p className="text-xs text-[#00A082]">Prep time: {item.prepTime}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hover:text-[#00A082] transition-colors duration-200"
                      >
                        <Link href="/dashboard/menu">Edit</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    variant="outline"
                    asChild
                    className="hover:bg-[#00A082] hover:text-white transition-colors duration-200"
                  >
                    <Link href="/dashboard/menu">Manage Menu</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=550&auto=format&fit=crop"
          alt="Restaurant Dashboard"
          width={550}
          height={550}
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  )
}
