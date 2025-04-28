export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com"

export const RESTAURANT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
}

export const ORDER_STATUS = {
  PENDING: "pending",
  PREPARING: "preparing",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

export const MENU_CATEGORIES = [
  { value: "appetizer", label: "Appetizer" },
  { value: "main", label: "Main Course" },
  { value: "dessert", label: "Dessert" },
  { value: "drink", label: "Drink" },
]

export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const THEME = {
  colors: {
    primary: "#FFFFFF", // White
    secondary: "#4ade80", // Light Green
    tertiary: "#333333", // Black
    background: "#FFFFFF",
    text: "#333333",
    error: "#FF0000",
    success: "#22c55e", // Darker Green
    warning: "#FFC107",
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
}

export const CHART_COLORS = [
  "#4ade80", // Light Green
  "#22c55e", // Medium Green
  "#16a34a", // Dark Green
  "#86efac", // Very Light Green
  "#bbf7d0", // Pale Green
]
