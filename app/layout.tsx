import Providers from '~/components/atoms/Providers';
// import Announcement from '~/components/widgets/Announcement';
import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import { SITE } from '~/config.js';
import { Metadata } from 'next';
import { Inter as CustomFont } from 'next/font/google';

import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: `%s — ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth 2xl:text-[24px] ${customFont.variable} font-sans`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased ">
        <Providers>
          {/* <Announcement /> */}
          <main >
            <Header />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
