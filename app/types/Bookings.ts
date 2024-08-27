export interface Booking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuest: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: number;
  cabins?: { name: string; image: string };
}
