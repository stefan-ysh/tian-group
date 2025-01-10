import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Providers from '~/components/atoms/Providers';
// import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import { Inter as CustomFont } from 'next/font/google';
import PageAnimatePresence from '~/components/atoms/PageAnimatePresence';

import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const runtime = 'edge';

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`text-foreground bg-background motion-safe:scroll-smooth 2xl:text-[20px] ${customFont.variable} font-sans`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <PageAnimatePresence>{children}</PageAnimatePresence>
            {/* <Footer /> */}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
