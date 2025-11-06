"use client";

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export function CartMigrationNotification() {
  const [show, setShow] = useState(false);
  const [migratedCount, setMigratedCount] = useState(0);

  useEffect(() => {
    const handleCartMigrated = (event: CustomEvent) => {
      setMigratedCount(event.detail.count);
      setShow(true);
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        setShow(false);
      }, 5000);
    };

    window.addEventListener('cartMigrated', handleCartMigrated as EventListener);
    
    return () => {
      window.removeEventListener('cartMigrated', handleCartMigrated as EventListener);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-medium text-green-800">
            Cart Synced!
          </h4>
          <p className="text-sm text-green-700 mt-1">
            {migratedCount} item{migratedCount !== 1 ? 's' : ''} from your local cart have been synced to your account.
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-green-600 hover:text-green-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

