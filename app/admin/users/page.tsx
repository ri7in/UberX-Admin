"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Check, Download, Eye, Lock, Search, Unlock, User, UserCog, X, Clock } from "lucide-react"
import { useUsers } from "@/hooks/use-users"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UsersPage() {
  const { toast } = useToast()
  const { users, updateUserStatus } = useUsers()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleStatusChange = (id: string, status: boolean) => {
    updateUserStatus(id, status)
    toast({
      title: status ? "User Activated" : "User Deactivated",
      description: `The user has been ${status ? "activated" : "deactivated"} successfully.`,
    })
  }

  const getUserRoleBadge = (role: string) => {
    switch (role) {
      case "customer":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <User className="mr-1 h-3 w-3" />
            Customer
          </Badge>
        )
      case "restaurant":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            <User className="mr-1 h-3 w-3" />
            Restaurant
          </Badge>
        )
      case "rider":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800">
            <User className="mr-1 h-3 w-3" />
            Rider
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <UserCog className="mr-1 h-3 w-3" />
            Admin
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            <User className="mr-1 h-3 w-3" />
            {role}
          </Badge>
        )
    }
  }

  const getStatusBadge = (active: boolean) => {
    return active ? (
      <Badge variant="outline" className="bg-green-100 text-green-800">
        <Check className="mr-1 h-3 w-3" />
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-red-100 text-red-800">
        <X className="mr-1 h-3 w-3" />
        Inactive
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button variant="outline" className="hover:bg-[#4ade80] hover:text-white">
          <Download className="mr-2 h-4 w-4" />
          Export Users
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-600" />
        <Input
          placeholder="Search by name, email, or role..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="customer">Customers</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurants</TabsTrigger>
          <TabsTrigger value="rider">Riders</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
        </TabsList>

        {["all", "customer", "restaurant", "rider", "admin"].map((role) => (
          <TabsContent key={role} value={role} className="space-y-4">
            {filteredUsers.filter((user) => role === "all" || user.role === role).length === 0 ? (
              <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed">
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <User className="h-8 w-8 text-gray-600" />
                  <div className="text-gray-600">No users found</div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredUsers
                  .filter((user) => role === "all" || user.role === role)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-2 hover:border-[#4ade80] transition-all duration-300 bg-white">
                        <CardHeader className="pb-2">
                          <div className="flex flex-col justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={user.avatar || "/avatar.jpeg?height=40&width=40"} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="flex items-center text-gray-900">
                                  {user.name}
                                  <span className="ml-2">{getStatusBadge(user.active)}</span>
                                  <span className="ml-2">{getUserRoleBadge(user.role)}</span>
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                  {user.email} • Joined {new Date(user.joinedAt).toLocaleDateString()}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>User Details</DialogTitle>
                                    <DialogDescription>View and manage user information</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="flex items-start space-x-4">
                                      <Avatar className="h-12 w-12">
                                        <AvatarImage
                                          src={selectedUser?.avatar || "/placeholder.svg?height=40&width=40"}
                                        />
                                        <AvatarFallback>{selectedUser?.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-lg font-medium text-gray-900">{selectedUser?.name}</h3>
                                        <p className="text-sm text-gray-600">{selectedUser?.email}</p>
                                      </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                      <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Account Information</h4>
                                        <div className="space-y-2 rounded-md border p-3">
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Role:</span>
                                            <span className="col-span-2 text-sm capitalize text-gray-900">
                                              {selectedUser?.role}
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Status:</span>
                                            <span className="col-span-2 text-sm text-gray-900">
                                              {selectedUser?.active ? "Active" : "Inactive"}
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Joined:</span>
                                            <span className="col-span-2 text-sm text-gray-900">
                                              {selectedUser?.joinedAt &&
                                                new Date(selectedUser.joinedAt).toLocaleString()}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="mb-2 font-medium text-gray-900">Contact Information</h4>
                                        <div className="space-y-2 rounded-md border p-3">
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Email:</span>
                                            <span className="col-span-2 text-sm text-gray-900">
                                              {selectedUser?.email}
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Phone:</span>
                                            <span className="col-span-2 text-sm text-gray-900">
                                              {selectedUser?.phone || "Not provided"}
                                            </span>
                                          </div>
                                          <div className="grid grid-cols-3">
                                            <span className="text-sm text-gray-600">Location:</span>
                                            <span className="col-span-2 text-sm text-gray-900">
                                              {selectedUser?.location || "Not provided"}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="mb-2 font-medium text-gray-900">Account Settings</h4>
                                      <div className="space-y-4 rounded-md border p-3">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <Label htmlFor="user-active" className="text-gray-900">
                                              Account Status
                                            </Label>
                                            <p className="text-xs text-gray-600">
                                              {selectedUser?.active
                                                ? "User can currently access the platform"
                                                : "User is currently blocked from the platform"}
                                            </p>
                                          </div>
                                          <Switch
                                            id="user-active"
                                            checked={selectedUser?.active}
                                            onCheckedChange={(checked) => {
                                              setSelectedUser({ ...selectedUser, active: checked })
                                            }}
                                          />
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <Label htmlFor="user-role" className="text-gray-900">
                                              User Role
                                            </Label>
                                            <p className="text-xs text-gray-600">
                                              Change the user's role and permissions
                                            </p>
                                          </div>
                                          <Select
                                            value={selectedUser?.role}
                                            onValueChange={(value) => {
                                              setSelectedUser({ ...selectedUser, role: value })
                                            }}
                                          >
                                            <SelectTrigger className="w-[180px]">
                                              <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="customer">Customer</SelectItem>
                                              <SelectItem value="restaurant">Restaurant</SelectItem>
                                              <SelectItem value="rider">Rider</SelectItem>
                                              <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                      className="bg-[#4ade80] hover:bg-[#22c55e] text-white"
                                      onClick={() => {
                                        updateUserStatus(selectedUser.id, selectedUser.active)
                                        toast({
                                          title: "User Updated",
                                          description: "User information has been updated successfully.",
                                        })
                                      }}
                                    >
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              {user.active ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-200 bg-red-100 text-red-800 hover:bg-red-200"
                                  onClick={() => handleStatusChange(user.id, false)}
                                >
                                  <Lock className="mr-2 h-4 w-4" />
                                  Deactivate
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-green-200 bg-green-100 text-green-800 hover:bg-green-200"
                                  onClick={() => handleStatusChange(user.id, true)}
                                >
                                  <Unlock className="mr-2 h-4 w-4" />
                                  Activate
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-2 md:grid-cols-3">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">
                                {user.role === "customer"
                                  ? "Orders: "
                                  : user.role === "restaurant"
                                    ? "Menu Items: "
                                    : user.role === "rider"
                                      ? "Deliveries: "
                                      : "Actions: "}
                                <span className="font-medium text-gray-900">{user.activityCount || 0}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">
                                Reports: <span className="font-medium text-gray-900">{user.reportCount || 0}</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-600" />
                              <span className="text-sm text-gray-600">
                                Last active:{" "}
                                <span className="font-medium text-gray-900">
                                  {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : "Never"}
                                </span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
