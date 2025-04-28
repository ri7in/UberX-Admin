"use client"

import { useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "restaurant" | "rider" | "admin"
  active: boolean
  joinedAt: string
  lastActive?: string
  avatar?: string
  phone?: string
  location?: string
  activityCount?: number
  reportCount?: number
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "u1",
      name: "Dinesh Jayawardena",
      email: "dinesh@gmail.com",
      role: "customer",
      active: true,
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "077-123-4567",
      location: "Colombo, Sri Lanka",
      activityCount: 24,
      reportCount: 0,
    },
    {
      id: "u2",
      name: "Chaminda Perera",
      email: "chaminda@kamu.lk",
      role: "restaurant",
      active: true,
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "071-987-6543",
      location: "Malabe, Sri Lanka",
      activityCount: 120,
      reportCount: 2,
    },
    {
      id: "u3",
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      role: "rider",
      active: true,
      joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "076-555-1234",
      location: "Colombo, Sri Lanka",
      activityCount: 87,
      reportCount: 1,
    },
    {
      id: "u4",
      name: "Admin User",
      email: "admin@ubereats.com",
      role: "admin",
      active: true,
      joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "070-123-9876",
      location: "Colombo, Sri Lanka",
      activityCount: 450,
      reportCount: 0,
    },
    {
      id: "u5",
      name: "Priyanka Fernando",
      email: "priyanka@yahoo.com",
      role: "customer",
      active: false,
      joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "077-888-5555",
      location: "Kandy, Sri Lanka",
      activityCount: 8,
      reportCount: 3,
    },
    {
      id: "u6",
      name: "Sunil Fernando",
      email: "sunil@spicegarden.lk",
      role: "restaurant",
      active: true,
      joinedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "071-222-3333",
      location: "Colombo, Sri Lanka",
      activityCount: 85,
      reportCount: 0,
    },
    {
      id: "u7",
      name: "Nimal Silva",
      email: "nimal@gmail.com",
      role: "rider",
      active: true,
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      phone: "076-444-5555",
      location: "Gampaha, Sri Lanka",
      activityCount: 65,
      reportCount: 0,
    },
  ])

  const updateUserStatus = (id: string, active: boolean) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              active,
            }
          : user,
      ),
    )
  }

  return {
    users,
    updateUserStatus,
  }
}
