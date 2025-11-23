export interface Property {
  id: number;
  name: string;
  area: string;
  city: string;
  type: string;
  description: string;
  contact_phone: number;
  contact_email: string;
  user_id: number;
  images: string[];
}

export interface Room {
  id: number;
  name: string;
  description: string;
  facilities: string;
  max_capacity: number;
  price: number;
  discount: number;
  images: string[];
  property_id: number;
}

export interface User {
  id: number;
  username: string;
  display_name: string;
  bio: string;
}
