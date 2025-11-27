import { create } from 'zustand';
import type { Contact, ContactDTO } from '../types';
import { contactService } from '../services/contactService';

// ========== Contact Store ==========
interface ContactStore {
  contacts: Contact[];
  filteredContacts: Contact[];
  selectedContact: Contact | null;
  isFormOpen: boolean;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  searchQuery: string;

  // Actions
  loadContacts: () => Promise<void>;
  addContact: (contact: ContactDTO) => Promise<void>;
  updateContact: (id: number, contact: ContactDTO) => Promise<void>;
  deleteContact: (id: number) => Promise<void>;
  setSelectedContact: (contact: Contact | null) => void;
  setFormOpen: (open: boolean) => void;
  searchContacts: (query: string) => void;
  setError: (error: string | null) => void;
  clearSuccessMessage: () => void;
  showSuccessMessage: (message: string) => void;
}

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: [],
  filteredContacts: [],
  selectedContact: null,
  isFormOpen: false,
  loading: false,
  error: null,
  successMessage: null,
  searchQuery: '',

  loadContacts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await contactService.getAllContacts();
      set({ contacts: data, filteredContacts: data });
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || 'Erreur lors du chargement des contacts';
      set({ error: errorMsg });
    } finally {
      set({ loading: false });
    }
  },

  addContact: async (contact: ContactDTO) => {
    set({ loading: true, error: null });
    try {
      const newContact = await contactService.createContact(contact);
      const updated = [...get().contacts, newContact];
      set({
        contacts: updated,
        filteredContacts: updated,
        isFormOpen: false,
        successMessage: `${newContact.firstName} ${newContact.lastName} a été créé avec succès!`,
      });
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || 'Erreur lors de la création du contact';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateContact: async (id: number, contact: ContactDTO) => {
    set({ loading: true, error: null });
    try {
      const updated = await contactService.updateContact(id, contact);
      const contacts = get().contacts.map((c) => (c.id === id ? updated : c));
      set({
        contacts,
        filteredContacts: contacts,
        isFormOpen: false,
        successMessage: `${updated.firstName} ${updated.lastName} a été mis à jour avec succès!`,
      });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Erreur lors de la mise à jour';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteContact: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const contactName = get().contacts.find((c) => c.id === id);
      await contactService.deleteContact(id);
      const contacts = get().contacts.filter((c) => c.id !== id);
      set({
        contacts,
        filteredContacts: contacts,
        successMessage: `${contactName?.firstName} ${contactName?.lastName} a été supprimé avec succès!`,
      });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Erreur lors de la suppression';
      set({ error: errorMsg });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  setSelectedContact: (contact) => set({ selectedContact: contact }),
  setFormOpen: (open) =>
    set({
      isFormOpen: open,
      selectedContact: open ? get().selectedContact : null,
    }),
  setError: (error) => set({ error }),
  clearSuccessMessage: () => set({ successMessage: null }),
  showSuccessMessage: (message: string) => set({ successMessage: message }),

  searchContacts: (query: string) => {
    const { contacts } = get();
    set({ searchQuery: query });
    if (!query.trim()) {
      set({ filteredContacts: contacts });
      return;
    }
    const q = query.toLowerCase();
    const filtered = contacts.filter(
      (c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
    set({ filteredContacts: filtered });
  },
}));
