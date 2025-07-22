export interface Ticket {
  id: string
  flightNumber: string
  origin: string
  destination: string
  departureTime: string
  arrivalTime: string
  price: number
  airline: string
  status: "pending" | "confirmed" | "cancelled"
  passengerName: string
  seatNumber: string
}
