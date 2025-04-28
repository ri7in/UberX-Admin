"use client"

import { useState } from "react"

interface RestaurantRequest {
  id: string
  restaurantName: string
  ownerName: string
  email: string
  phone: string
  address: string
  description: string
  cuisine: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  rejectionReason?: string
}

export function useRestaurantRequests() {
  const [restaurantRequests, setRestaurantRequests] = useState<RestaurantRequest[]>([
    {
      id: "r1",
      restaurantName: "Spice Garden Restaurant",
      ownerName: "Sunil Fernando",
      email: "sunil@spicegarden.lk",
      phone: "077-123-4567",
      address: "42 Temple Road, Colombo 03, Sri Lanka",
      description: "Authentic Sri Lankan cuisine featuring rice and curry, kottu roti, and hoppers.",
      cuisine: "Sri Lankan",
      status: "pending",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "r2",
      restaurantName: "Colombo Cafe",
      ownerName: "Priyanka Jayawardena",
      email: "priyanka@colombocafe.lk",
      phone: "071-987-6543",
      address: "15 Galle Road, Colombo 04, Sri Lanka",
      description: "Modern cafe serving fusion cuisine, coffee, and pastries.",
      cuisine: "Fusion",
      status: "pending",
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "r3",
      restaurantName: "Curry House",
      ownerName: "Ravi Perera",
      email: "ravi@curryhouse.lk",
      phone: "076-555-1234",
      address: "78 Duplication Road, Colombo 05, Sri Lanka",
      description: "Indian and Sri Lankan curries with a modern twist.",
      cuisine: "Indian/Sri Lankan",
      status: "pending",
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "r4",
      restaurantName: "Seafood Paradise",
      ownerName: "Malik Gunaratne",
      email: "malik@seafoodparadise.lk",
      phone: "070-123-9876",
      address: "25 Marine Drive, Colombo 06, Sri Lanka",
      description: "Fresh seafood dishes with a focus on local catch.",
      cuisine: "Seafood",
      status: "approved",
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "r5",
      restaurantName: "Pizza Corner",
      ownerName: "Dinesh Silva",
      email: "dinesh@pizzacorner.lk",
      phone: "077-888-5555",
      address: "10 High Level Road, Nugegoda, Sri Lanka",
      description: "Authentic Italian pizzas and pasta dishes.",
      cuisine: "Italian",
      status: "rejected",
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      rejectionReason: "Incomplete documentation. Missing food handling certificates and proper business registration.",
    },
  ])

  const updateRestaurantStatus = (id: string, status: "approved" | "rejected", rejectionReason?: string) => {
    setRestaurantRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              ...(rejectionReason && { rejectionReason }),
            }
          : request,
      ),
    )
  }

  return {
    restaurantRequests,
    updateRestaurantStatus,
  }
}
