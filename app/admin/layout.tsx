"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, LogOut, Menu, ShieldCheck, Store, Users, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // Skip rendering the layout for the login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const routes = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      active: pathname === "/admin/dashboard",
    },
    {
      href: "/admin/restaurants",
      label: "Restaurant Requests",
      icon: Store,
      active: pathname === "/admin/restaurants",
    },
    {
      href: "/admin/riders",
      label: "Rider Requests",
      icon: Bike,
      active: pathname === "/admin/riders",
    },
    {
      href: "/admin/users",
      label: "User Management",
      icon: Users,
      active: pathname === "/admin/users",
    },
  ]

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs bg-white">
            <div className="flex h-full flex-col">
              <div className="flex items-center border-b px-2 py-4">
                <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                  <Image
                    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=50&auto=format&fit=crop"
                    alt="UberEats Admin"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <span className="text-gray-900">UberEats Admin</span>
                </Link>
              </div>
              <nav className="grid gap-2 px-2 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                      route.active ? "bg-[#4ade80] text-white" : "bg-transparent hover:bg-gray-100 text-gray-900"
                    }`}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold md:hidden">
            <Image
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=50&auto=format&fit=crop"
              alt="UberEats Admin"
              width={32}
              height={32}
              className="rounded-md"
            />
          </Link>
          <Link href="/admin/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
            <Image
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=50&auto=format&fit=crop"
              alt="UberEats Admin"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-gray-900">UberEats Admin Dashboard</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4 md:px-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                route.active ? "bg-[#4ade80] text-white" : "bg-transparent hover:bg-gray-100 text-gray-900"
              }`}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=50&auto=format&fit=crop"
                  alt="Admin"
                />
                <AvatarFallback>
                  <ShieldCheck className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel className="text-gray-900">Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1 bg-white">{children}</main>
    </div>
  )
}
