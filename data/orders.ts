import type { Order } from "@/lib/types"

export const mockOrders: Order[] = [
  {
    id: "1001",
    items: [
      { id: "1", name: "Chicken Kottu", price: 650, quantity: 2, preparationTime: 15 },
      { id: "6", name: "Isso Wade", price: 200, quantity: 1, preparationTime: 7 },
      { id: "10", name: "Ginger Tea", price: 150, quantity: 2, preparationTime: 3 },
    ],
    customer: {
      id: "c1",
      name: "Dinesh Jayawardena",
      email: "dinesh@gmail.com",
      phone: "071-555-1234",
      address: "24 Flower Road, Malabe, Sri Lanka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    },
    status: "pending",
    subtotal: 1800,
    deliveryFee: 200,
    orderTime: new Date().toISOString(),
    notes: "Extra spicy kottu please",
    totalPreparationTime: 43, // 15*2 + 7 + 3*2
  },
  {
    id: "1002",
    items: [
      { id: "2", name: "Vegetable Rice and Curry", price: 450, quantity: 1, preparationTime: 10 },
      { id: "8", name: "Curd and Treacle", price: 250, quantity: 1, preparationTime: 2 },
    ],
    customer: {
      id: "c2",
      name: "Priyanka Fernando",
      email: "priyanka@yahoo.com",
      phone: "077-123-4567",
      address: "15 Temple Road, Kaduwela, Sri Lanka",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    status: "preparing",
    subtotal: 700,
    deliveryFee: 200,
    orderTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    totalPreparationTime: 12, // 10 + 2
  },
  {
    id: "1003",
    items: [
      { id: "3", name: "Fish Ambul Thiyal", price: 750, quantity: 1, preparationTime: 20 },
      { id: "4", name: "Egg Hoppers", price: 120, quantity: 3, preparationTime: 5 },
      { id: "9", name: "Faluda", price: 350, quantity: 2, preparationTime: 5 },
    ],
    customer: {
      id: "c3",
      name: "Malith Gunasekara",
      email: "malith@hotmail.com",
      phone: "076-987-6543",
      address: "78 Lake Drive, Athurugiriya, Sri Lanka",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    },
    status: "completed",
    subtotal: 1690,
    deliveryFee: 200,
    orderTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    totalPreparationTime: 35, // 20 + 5*3 + 5*2
  },
  {
    id: "1004",
    items: [
      { id: "12", name: "Chicken Biryani", price: 850, quantity: 2, preparationTime: 25 },
      { id: "7", name: "Watalappan", price: 300, quantity: 2, preparationTime: 5 },
    ],
    customer: {
      id: "c4",
      name: "Kumari Wijesinghe",
      email: "kumari@gmail.com",
      phone: "070-456-7890",
      address: "32 Hill Street, Malabe, Sri Lanka",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    },
    status: "cancelled",
    subtotal: 2000,
    deliveryFee: 200,
    orderTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    notes: "No spices in the biryani please",
    totalPreparationTime: 60, // 25*2 + 5*2
  },
  {
    id: "1005",
    items: [
      { id: "1", name: "Chicken Kottu", price: 650, quantity: 3, preparationTime: 15 },
      { id: "5", name: "Mutton Rolls", price: 180, quantity: 4, preparationTime: 8 },
      { id: "11", name: "Wood Apple Juice", price: 200, quantity: 3, preparationTime: 4 },
    ],
    customer: {
      id: "c5",
      name: "Roshan Perera",
      email: "roshan@outlook.com",
      phone: "075-123-9876",
      address: "56 Main Street, Battaramulla, Sri Lanka",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    },
    status: "completed",
    subtotal: 2670,
    deliveryFee: 200,
    orderTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    totalPreparationTime: 77, // 15*3 + 8*4 + 4*3
  },
]
