"use client"

import { useState } from "react"

interface AdminStats {
  pendingRestaurants: number
  pendingRestaurantsChange: number
  pendingRiders: number
  pendingRidersChange: number
  totalUsers: number
  totalUsersChange: number
  systemAlerts: number
  systemAlertsChange: number
  platformRevenue: number
  platformRevenueChange: number
  recentRequests: Array<{
    id: string
    name: string
    type: "Restaurant" | "Rider"
    date: string
    status: string
  }>
  financialMetrics: Array<{
    name: string
    value: number
    change: number
    period: string
  }>
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    pendingRestaurants: 12,
    pendingRestaurantsChange: 20,
    pendingRiders: 8,
    pendingRidersChange: 15,
    totalUsers: 2450,
    totalUsersChange: 5.2,
    systemAlerts: 3,
    systemAlertsChange: -10,
    platformRevenue: 1250000,
    platformRevenueChange: 8.5,
    recentRequests: [
      {
        id: "r1",
        name: "Spice Garden Restaurant",
        type: "Restaurant",
        date: "2023-06-15",
        status: "pending",
      },
      {
        id: "d1",
        name: "Kasun Perera",
        type: "Rider",
        date: "2023-06-14",
        status: "pending",
      },
      {
        id: "r2",
        name: "Colombo Cafe",
        type: "Restaurant",
        date: "2023-06-14",
        status: "pending",
      },
      {
        id: "d2",
        name: "Nimal Silva",
        type: "Rider",
        date: "2023-06-13",
        status: "pending",
      },
      {
        id: "r3",
        name: "Curry House",
        type: "Restaurant",
        date: "2023-06-12",
        status: "pending",
      },
    ],
    financialMetrics: [
      {
        name: "Total Revenue",
        value: 1250000,
        change: 8.5,
        period: "This month",
      },
      {
        name: "Commission Earnings",
        value: 375000,
        change: 12.3,
        period: "This month",
      },
      {
        name: "Delivery Fees",
        value: 225000,
        change: 5.7,
        period: "This month",
      },
      {
        name: "Transaction Volume",
        value: 850000,
        change: 9.2,
        period: "This month",
      },
    ],
  })

  return { stats }
}
