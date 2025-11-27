import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useContactStore } from '../store';
import type { Contact, ContactDTO } from '../types';

interface ContactFormProps {
  contact?: Contact;
}

export const ContactForm = ({ contact }: ContactFormProps) => {
  const { isFormOpen, setFormOpen, addContact, updateContact, loading } =
    useContactStore();
  const [formData, setFormData] = useState<ContactDTO>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Charger les données du contact quand il change
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        city: contact.city || '',
        postalCode: contact.postalCode || '',
      });
    } else {
      // Réinitialiser si nouveau contact
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
      });
    }
    setErrors({});
  }, [contact, isFormOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim())
      newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Email invalide';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    if (!/^\+?[\d\s-]{7,}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = 'Téléphone invalide (7-15 chiffres)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (contact?.id) {
        await updateContact(contact.id, formData);
      } else {
        await addContact(formData);
      }
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
      });
      setFormOpen(false);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!isFormOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-4 animate-slide-up">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-slate-900">
            {contact ? 'Modifier Contact' : 'Nouveau Contact'}
          </h2>
          <button
            onClick={() => setFormOpen(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* First Name */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Prénom *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className={`w-full px-2.5 py-1.5 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Jean"
              disabled={loading}
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-0.5">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Nom *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className={`w-full px-2.5 py-1.5 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Dupont"
              disabled={loading}
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-0.5">
                {errors.lastName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-2.5 py-1.5 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="jean@example.com"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-0.5">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Téléphone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full px-2.5 py-1.5 text-xs border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="+33612345678"
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-0.5">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Adresse
            </label>
            <input
              type="text"
              value={formData.address || ''}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123 Rue de la Paix"
              disabled={loading}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Ville
            </label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paris"
              disabled={loading}
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">
              Code Postal
            </label>
            <input
              type="text"
              value={formData.postalCode || ''}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="75001"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded text-slate-700 hover:bg-slate-50 transition-colors font-medium"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50 font-medium"
              disabled={loading}
            >
              {loading
                ? 'Chargement...'
                : contact
                  ? 'Mettre à jour'
                  : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
