import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '~/components/atoms/Providers';
// import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter as CustomFont } from 'next/font/google';
import Script from 'next/script'

// import PageAnimatePresence from '~/components/atoms/PageAnimatePresence';

import '~/assets/styles/base.css';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}



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
            {/* <PageAnimatePresence> */}
              {children}
              <Analytics />
              <SpeedInsights />
            {/* </PageAnimatePresence> */}
            {/* <Footer /> */}
          </NextIntlClientProvider>
        </Providers>
        <a
          href="#top"
          title="Back to top"
          id="backToTop"
          className="fixed bottom-6 right-6 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 invisible"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
        <Script src="/js/backTop.js" />
      </body>
    </html>
  );
}
