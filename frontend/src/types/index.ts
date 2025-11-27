export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  errors?: Record<string, string>;
}
