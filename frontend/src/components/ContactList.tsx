import { useContactStore } from '../store';
import { ContactCard } from './ContactCard';
import { LoadingSpinner } from './LoadingSpinner';

export const ContactList = () => {
  const { filteredContacts, loading } = useContactStore();

  if (loading && filteredContacts.length === 0) {
    return <LoadingSpinner />;
  }

  if (filteredContacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Aucun contact trouvé
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredContacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
