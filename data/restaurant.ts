import type { Restaurant } from "@/lib/types"

export const mockRestaurant: Restaurant = {
  id: "1",
  restaurantName: "Kamu.LK",
  ownerName: "Chaminda Perera",
  email: "chaminda@kamu.lk",
  phone: "077-123-4567",
  address: "42 Kandy Road, Malabe, Sri Lanka",
  description: "Authentic Sri Lankan cuisine featuring rice and curry, kottu roti, and hoppers.",
  cuisine: "Sri Lankan",
  approved: true,
  createdAt: new Date().toISOString(),
  openingHours: {
    Monday: { isOpen: true, open: "09:00", close: "22:00" },
    Tuesday: { isOpen: true, open: "09:00", close: "22:00" },
    Wednesday: { isOpen: true, open: "09:00", close: "22:00" },
    Thursday: { isOpen: true, open: "09:00", close: "22:00" },
    Friday: { isOpen: true, open: "09:00", close: "23:00" },
    Saturday: { isOpen: true, open: "10:00", close: "23:00" },
    Sunday: { isOpen: false, open: "", close: "" },
  },
}
