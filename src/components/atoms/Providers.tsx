'use client';

import { ThemeProvider } from 'next-themes';

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => <ThemeProvider>{children}</ThemeProvider>;

export default Providers;
