"use client"

import type React from "react"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, ClipboardList, Home, Menu, MessageSquare, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRestaurant } from "@/hooks/use-restaurant"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { restaurant } = useRestaurant()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/menu",
      label: "Menu",
      icon: Store,
      active: pathname === "/dashboard/menu",
    },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: ClipboardList,
      active: pathname === "/dashboard/orders",
    },
    {
      href: "/dashboard/insights",
      label: "Insights",
      icon: BarChart3,
      active: pathname === "/dashboard/insights",
    },
    {
      href: "/dashboard/reviews",
      label: "Reviews",
      icon: MessageSquare,
      active: pathname === "/dashboard/reviews",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm transition-all duration-200">
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
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                  <Image
                    src="https://sjc.microlink.io/hRksl_1P7rUIBkGvPoHj3tjNxJqegAHEx1Ovvw3jbZPLkaz1bYyQX1aJrTaWtr9XpDKkrHxoMW_ZFtYsXYUo6g.jpeg"
                    alt="Kamu.LK Logo"
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <span className="text-gray-900">Kamu.LK Dashboard</span>
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
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold md:hidden">
            <Image
              src="https://sjc.microlink.io/hRksl_1P7rUIBkGvPoHj3tjNxJqegAHEx1Ovvw3jbZPLkaz1bYyQX1aJrTaWtr9XpDKkrHxoMW_ZFtYsXYUo6g.jpeg"
              alt="Kamu.LK Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
          </Link>
          <Link href="/dashboard" className="hidden items-center gap-2 font-semibold md:flex">
            <Image
              src="https://sjc.microlink.io/hRksl_1P7rUIBkGvPoHj3tjNxJqegAHEx1Ovvw3jbZPLkaz1bYyQX1aJrTaWtr9XpDKkrHxoMW_ZFtYsXYUo6g.jpeg"
              alt="Kamu.LK Logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="text-gray-900">Kamu.LK Restaurant Dashboard</span>
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
        <div className="flex items-center gap-2">
          <Link href="/dashboard/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://sjc.microlink.io/hRksl_1P7rUIBkGvPoHj3tjNxJqegAHEx1Ovvw3jbZPLkaz1bYyQX1aJrTaWtr9XpDKkrHxoMW_ZFtYsXYUo6g.jpeg"
                  alt="Chaminda Perera"
                />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <div className="hidden border-r bg-white md:block md:w-64">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
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
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-white">{children}</div>
      </div>
    </div>
  )
}
