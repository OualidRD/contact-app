import { Check, X } from 'lucide-react';
import { useContactStore } from '../store';
import { useEffect } from 'react';

export const SuccessMessage = () => {
  const { successMessage, clearSuccessMessage } = useContactStore();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  if (!successMessage) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">
            {successMessage}
          </p>
        </div>
        <button
          onClick={clearSuccessMessage}
          className="text-green-600 hover:text-green-700"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
