export interface Property {
  id: string;
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
  id: string;
  propertyId: number;
  name: string;
  description: string;
  facilities: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  price: number;
  discount: number;
  images: string[];
}

export interface Booking {
  id: string;
  userId: string;
  roomId: number;
  checkinDate: string;
  checkoutDate: string;
  numGuests: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
}
