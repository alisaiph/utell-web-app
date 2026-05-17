export interface Property {
  id: string;
  owner: string;
  name: string;
  area: string;
  city: string;
  type: string;
  location: string;
  description: string;
  address: string;
  contactPhone: number;
  contactEmail: string;
  images: string[];
}

export interface Room {
  id: string;
  name: string;
  description: string | null;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  price: number;
  discount: number;
  propertyId: string;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  checkinDate: string;
  checkoutDate: string;
  numGuests: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
}
