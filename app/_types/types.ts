export interface Property {
  id: number;
  owner: string;
  name: string;
  area: string;
  city: string;
  type: string;
  description: string;
  contactPhone: number;
  contactEmail: string;
  images: string[];
}

export interface Room {
  id: number;
  propertyId: number;
  name: string;
  description: string;
  facilities: string;
  maxCapacity: number;
  price: number;
  discount: number;
  images: string[];
}

export interface Booking {
  id: number;
  userId: string;
  roomId: number;
  checkinDate: string;
  checkoutDate: string;
  numGuests: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
}
