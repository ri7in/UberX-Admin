"use client"

import { useState } from "react"

interface RiderRequest {
  id: string
  name: string
  email: string
  phone: string
  address: string
  vehicleType: string
  vehicleNumber: string
  experience: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  rejectionReason?: string
}

export function useRiderRequests() {
  const [riderRequests, setRiderRequests] = useState<RiderRequest[]>([
    {
      id: "d1",
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      phone: "077-123-4567",
      address: "42 Temple Road, Colombo 03, Sri Lanka",
      vehicleType: "Motorcycle",
      vehicleNumber: "BAC-1234",
      experience: "2 years of delivery experience with another food delivery service.",
      status: "pending",
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "d2",
      name: "Nimal Silva",
      email: "nimal@gmail.com",
      phone: "071-987-6543",
      address: "15 Galle Road, Colombo 04, Sri Lanka",
      vehicleType: "Scooter",
      vehicleNumber: "CAD-5678",
      experience: "New to delivery, but experienced rider for 5 years.",
      status: "pending",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "d3",
      name: "Chaminda Bandara",
      email: "chaminda@gmail.com",
      phone: "076-555-1234",
      address: "78 Duplication Road, Colombo 05, Sri Lanka",
      vehicleType: "Bicycle",
      vehicleNumber: "N/A",
      experience: "Worked as a bicycle courier for 1 year.",
      status: "pending",
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "d4",
      name: "Pradeep Kumar",
      email: "pradeep@gmail.com",
      phone: "070-123-9876",
      address: "25 Marine Drive, Colombo 06, Sri Lanka",
      vehicleType: "Motorcycle",
      vehicleNumber: "DEF-9012",
      experience: "3 years of experience in food delivery.",
      status: "approved",
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "d5",
      name: "Samantha Fonseka",
      email: "samantha@gmail.com",
      phone: "077-888-5555",
      address: "10 High Level Road, Nugegoda, Sri Lanka",
      vehicleType: "Motorcycle",
      vehicleNumber: "GHI-3456",
      experience: "New rider, no previous delivery experience.",
      status: "rejected",
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      rejectionReason: "Incomplete documentation. Missing valid driver's license and insurance documents.",
    },
  ])

  const updateRiderStatus = (id: string, status: "approved" | "rejected", rejectionReason?: string) => {
    setRiderRequests((prev) =>
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
    riderRequests,
    updateRiderStatus,
  }
}
