import React, { useState } from 'react';
import { Mail, Phone, MapPin, Edit, Trash2, AlertTriangle } from 'lucide-react';
import type { Contact } from '../types';
import { useContactStore } from '../store';

interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({ contact }: ContactCardProps) => {
  const { setSelectedContact, setFormOpen, deleteContact, loading } =
    useContactStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => {
    setSelectedContact(contact);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id);
      setConfirmDelete(false);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 animate-fade-in">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {contact.firstName} {contact.lastName}
          </h3>
        </div>

        <div className="space-y-2 mb-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <a
              href={`mailto:${contact.email}`}
              className="text-blue-600 hover:underline"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a
              href={`tel:${contact.phone}`}
              className="text-blue-600 hover:underline"
            >
              {contact.phone}
            </a>
          </div>
          {contact.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{contact.city}</span>
            </div>
          )}
          {contact.address && <p className="text-xs text-slate-500">{contact.address}</p>}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
            disabled={loading}
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
            disabled={loading}
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </button>
        </div>
      </div>

      {/* Modal de Confirmation Moderne */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop flou */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmDelete(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 animate-slide-up border border-slate-200">
            {/* Icône Alert */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>

            {/* Titre */}
            <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
              Supprimer le contact ?
            </h3>

            {/* Message */}
            <p className="text-slate-600 text-center mb-6 text-sm">
              Vous êtes sur le point de supprimer{' '}
              <span className="font-semibold">
                {contact.firstName} {contact.lastName}
              </span>
              . Cette action est irréversible.
            </p>

            {/* Boutons */}
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 px-4 py-2.5 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors font-medium text-sm"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 font-medium text-sm"
                disabled={loading}
              >
                {loading ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
