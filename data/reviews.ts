import type { Review } from "@/lib/types"

export const mockReviews: Review[] = [
  {
    id: "r1",
    customerName: "Dinesh Jayawardena",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    text: "Best kottu in Malabe! The chicken kottu was spicy and flavorful, just how I like it. Delivery was quick too.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    response:
      "Thank you for your kind words, Dinesh! We're glad you enjoyed our kottu and look forward to serving you again soon.",
  },
  {
    id: "r2",
    customerName: "Priyanka Fernando",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    text: "The vegetable rice and curry was delicious and authentic. Curd and treacle was the perfect dessert. Would order again!",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r3",
    customerName: "Malith Gunasekara",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    rating: 3,
    text: "Food was good but took longer than expected to arrive. The hoppers were a bit cold by the time they reached.",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    response:
      "We apologize for the delay, Malith. We're working on improving our delivery times. Thank you for your feedback!",
  },
  {
    id: "r4",
    customerName: "Kumari Wijesinghe",
    customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    rating: 2,
    text: "Ordered biryani without spices but it was still too spicy for me. The watalappan was good though.",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r5",
    customerName: "Roshan Perera",
    customerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    text: "Amazing kottu! The mutton rolls were crispy and delicious. Wood apple juice was refreshing. Will order again!",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r6",
    customerName: "Nilmini Silva",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    rating: 4,
    text: "The isso wade was fresh and tasty. Loved the fish ambul thiyal too. Authentic Sri Lankan flavors!",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r7",
    customerName: "Asanka Bandara",
    customerAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    text: "Best Sri Lankan food in the area! The egg hoppers were perfect and the kottu was spicy and flavorful.",
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "r8",
    customerName: "Dilini Rajapakse",
    customerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
    rating: 3,
    text: "Food was good but portions were a bit small for the price. Delivery was quick though.",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
]
