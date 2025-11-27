import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { Contact, ContactDTO, ApiError } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor pour les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      timestamp: new Date().toISOString(),
      status: error.response?.status || 500,
      error: error.response?.data?.error || 'Erreur serveur',
      message: error.response?.data?.message || error.message,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  }
);

export const contactService = {
  // Récupérer tous les contacts
  getAllContacts: async (): Promise<Contact[]> => {
    const response = await apiClient.get('/contacts');
    return response.data;
  },

  // Récupérer un contact par ID
  getContactById: async (id: number): Promise<Contact> => {
    const response = await apiClient.get(`/contacts/${id}`);
    return response.data;
  },

  // Créer un contact
  createContact: async (contact: ContactDTO): Promise<Contact> => {
    const response = await apiClient.post('/contacts', contact);
    return response.data;
  },

  // Mettre à jour un contact
  updateContact: async (id: number, contact: ContactDTO): Promise<Contact> => {
    const response = await apiClient.put(`/contacts/${id}`, contact);
    return response.data;
  },

  // Supprimer un contact
  deleteContact: async (id: number): Promise<void> => {
    await apiClient.delete(`/contacts/${id}`);
  },

  // Rechercher par nom
  searchContacts: async (name: string): Promise<Contact[]> => {
    const response = await apiClient.get('/contacts/search', {
      params: { name },
    });
    return response.data;
  },

  // Filtrer par ville
  getContactsByCity: async (city: string): Promise<Contact[]> => {
    const response = await apiClient.get('/contacts/city', {
      params: { city },
    });
    return response.data;
  },
};
