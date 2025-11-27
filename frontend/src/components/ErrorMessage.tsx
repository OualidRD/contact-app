import { AlertCircle, X } from 'lucide-react';
import { useContactStore } from '../store';
import { useEffect } from 'react';

export const ErrorMessage = () => {
  const { error, setError } = useContactStore();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-100">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
        <button
          onClick={() => setError(null)}
          className="text-red-600 hover:text-red-700 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
