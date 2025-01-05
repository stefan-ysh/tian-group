'use client';
import Providers from '~/components/atoms/Providers';
import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import { Inter as CustomFont } from 'next/font/google';
import { useState } from 'react';

import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [isDark, setIsDark] = useState(false);
  return (
    <html
      lang="en"
      className={`${isDark ? 'dark text-foreground bg-background' : 'light text-foreground bg-background'} motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased ">
        <Providers>
          <Header toggleTheme={(isDark: boolean) => setIsDark(isDark)} />
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
