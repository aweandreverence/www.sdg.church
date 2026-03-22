'use client';

import { useEffect } from 'react';

export function BootstrapClient() {
  useEffect(() => {
    // Import Bootstrap JS on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}
