"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bike, Download, DollarSign, Store, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAdminStats } from "@/hooks/use-admin-stats"
import Image from "next/image"

export default function AdminDashboardPage() {
  const { stats } = useAdminStats()

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h2>
        <Button variant="outline" className="hover:bg-[#4ade80] hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">Pending Restaurant Requests</CardTitle>
              <Store className="h-4 w-4 text-[#4ade80]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingRestaurants}</div>
              <p className="text-xs text-gray-600">
                {stats.pendingRestaurantsChange > 0 ? "+" : ""}
                {stats.pendingRestaurantsChange}% from last week
              </p>
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
              <CardTitle className="text-sm font-medium text-gray-900">Pending Rider Requests</CardTitle>
              <Bike className="h-4 w-4 text-[#4ade80]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.pendingRiders}</div>
              <p className="text-xs text-gray-600">
                {stats.pendingRidersChange > 0 ? "+" : ""}
                {stats.pendingRidersChange}% from last week
              </p>
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
              <CardTitle className="text-sm font-medium text-gray-900">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#4ade80]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
              <p className="text-xs text-gray-600">
                {stats.totalUsersChange > 0 ? "+" : ""}
                {stats.totalUsersChange}% from last month
              </p>
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
              <CardTitle className="text-sm font-medium text-gray-900">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-[#4ade80]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">LKR {stats.platformRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-600">
                {stats.platformRevenueChange > 0 ? "+" : ""}
                {stats.platformRevenueChange}% from last month
              </p>
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
              <CardTitle className="text-gray-900">Recent Requests</CardTitle>
              <CardDescription className="text-gray-600">
                Latest restaurant and rider verification requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={
                            request.type === "Restaurant"
                              ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100&auto=format&fit=crop"
                              : "https://images.unsplash.com/photo-1526613879466-f0f6227aacc8?q=80&w=100&auto=format&fit=crop"
                          }
                          alt={request.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{request.name}</p>
                        <p className="text-sm text-gray-600">
                          {request.type} • {request.date} • {request.status}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={request.type === "Restaurant" ? "/admin/restaurants" : "/admin/riders"}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  asChild
                  className="hover:bg-[#4ade80] hover:text-white transition-colors duration-200"
                >
                  <Link href="/admin/restaurants">
                    View All Requests
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
              <CardTitle className="text-gray-900">Financial Overview</CardTitle>
              <CardDescription className="text-gray-600">Current financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.financialMetrics.map((metric) => (
                  <div key={metric.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 rounded-full bg-green-100 p-1">
                        <TrendingUp className="h-4 w-4 text-[#4ade80]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{metric.name}</p>
                        <p className="text-sm text-gray-600">{metric.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">LKR {metric.value.toLocaleString()}</p>
                      <p className={`text-xs ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  className="hover:bg-[#4ade80] hover:text-white transition-colors duration-200"
                >
                  View Financial Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
