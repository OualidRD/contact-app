import { useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { useContactStore } from './store';
import { ContactList } from './components/ContactList';
import { ContactForm } from './components/ContactForm';
import { ErrorMessage } from './components/ErrorMessage';
import { SuccessMessage } from './components/SuccessMessage';

function App() {
  const {
    loadContacts,
    setFormOpen,
    searchContacts,
    searchQuery,
    selectedContact,
  } = useContactStore();

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    searchContacts(query);
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📇</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Contact App
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par prénom, nom, email ou téléphone..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ContactList />
        </main>

        {/* Add Contact Button */}
        <button
          onClick={() => {
            setFormOpen(true);
          }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-30"
          aria-label="Ajouter un contact"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Form Modal */}
        <ContactForm contact={selectedContact || undefined} />

        {/* Error Messages */}
        <ErrorMessage />

        {/* Success Messages */}
        <SuccessMessage />
      </div>
    </div>
  );
}

export default App;
