'use client';

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react';

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <ThemeProvider attribute="class" enableSystem={true}>
    {children}
  </ThemeProvider>
);

export default Providers;
