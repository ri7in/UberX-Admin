"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useRestaurant } from "@/hooks/use-restaurant"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const { toast } = useToast()
  const { restaurant, updateRestaurant } = useRestaurant()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    restaurantName: "Kamu.LK",
    email: "info@kamu.lk",
    phone: "077-123-4567",
    address: "42 Kandy Road, Malabe, Sri Lanka",
    description: "Authentic Sri Lankan cuisine featuring rice and curry, kottu roti, and hoppers.",
    cuisine: "Sri Lankan",
    openingHours: {
      Monday: { isOpen: true, open: "09:00", close: "22:00" },
      Tuesday: { isOpen: true, open: "09:00", close: "22:00" },
      Wednesday: { isOpen: true, open: "09:00", close: "22:00" },
      Thursday: { isOpen: true, open: "09:00", close: "22:00" },
      Friday: { isOpen: true, open: "09:00", close: "23:00" },
      Saturday: { isOpen: true, open: "10:00", close: "23:00" },
      Sunday: { isOpen: false, open: "", close: "" },
    },
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleOpeningHoursChange = (day: string, field: "isOpen" | "open" | "close", value: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await updateRestaurant(formData)

      toast({
        title: "Settings updated",
        description: "Your restaurant settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hours">Opening Hours</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300">
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>Update your restaurant's basic information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="restaurantName">Restaurant Name</Label>
                      <Input
                        id="restaurantName"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cuisine">Cuisine Type</Label>
                      <Input id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="hours" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300">
              <CardHeader>
                <CardTitle>Opening Hours</CardTitle>
                <CardDescription>Set your restaurant's opening hours for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.keys(formData.openingHours).map((day) => (
                  <div
                    key={day}
                    className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0"
                  >
                    <div className="w-full sm:w-1/4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`${day}-isOpen`} className="font-medium">
                          {day}
                        </Label>
                        <Switch
                          id={`${day}-isOpen`}
                          checked={formData.openingHours[day].isOpen}
                          onCheckedChange={(checked) => handleOpeningHoursChange(day, "isOpen", checked)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 items-center space-x-2">
                      <div className="w-1/2">
                        <Input
                          type="time"
                          value={formData.openingHours[day].open}
                          onChange={(e) => handleOpeningHoursChange(day, "open", e.target.value)}
                          disabled={!formData.openingHours[day].isOpen}
                        />
                      </div>
                      <span className="text-center">to</span>
                      <div className="w-1/2">
                        <Input
                          type="time"
                          value={formData.openingHours[day].close}
                          onChange={(e) => handleOpeningHoursChange(day, "close", e.target.value)}
                          disabled={!formData.openingHours[day].isOpen}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    toast({
                      title: "Opening hours saved",
                      description: "Your opening hours have been updated successfully.",
                    })
                  }}
                  className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Opening Hours
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive order and review notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive order notifications via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={formData.smsNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("smsNotifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications in the browser or mobile app</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={formData.pushNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("pushNotifications", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    toast({
                      title: "Notification settings saved",
                      description: "Your notification preferences have been updated.",
                    })
                  }}
                  className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="border-2 hover:border-[#4ade80] transition-all duration-300">
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Manage your payment methods and bank details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input id="bankName" defaultValue="Commercial Bank" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" defaultValue="1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input id="accountName" defaultValue="Chaminda Perera" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branchCode">Branch Code</Label>
                  <Input id="branchCode" defaultValue="001" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    toast({
                      title: "Payment settings saved",
                      description: "Your payment settings have been updated.",
                    })
                  }}
                  className="bg-[#4ade80] hover:bg-[#22c55e] text-white transition-colors duration-200"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Payment Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
