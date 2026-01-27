import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '~/components/atoms/Providers';
import { OrganizationSchema, WebSiteSchema } from '~/components/seo/JsonLd';
// import Footer from '~/components/widgets/Footer';
import Header from '~/components/widgets/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Script from 'next/script';

import type { Metadata } from 'next';

import '~/styles/base.css';

export interface LayoutProps {
  children: React.ReactNode;
}

// Static metadata base
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tiantian.group';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getMessages().then((m: any) => m.Metadata);
  const locale = await getLocale();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.Title,
      template: `%s | ${t.Creator}`,
    },
    description: t.Description,
    keywords: t.Keywords.split(',').map((s: string) => s.trim()),
    authors: [{ name: t.Creator }],
    creator: t.Creator,
    publisher: t.Publisher,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      url: SITE_URL,
      siteName: t.Creator,
      title: t.Title,
      description: t.Description,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.Creator,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.Title,
      description: t.Description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const common = (messages as any).Common || {};

  return (
    <html
      lang={locale}
      className="text-foreground bg-background motion-safe:scroll-smooth 2xl:text-[20px] font-sans"
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          defer
          src="https://umami.tiantian.group/script.js"
          data-website-id="d8ae1e2a-17a7-4566-8bfa-dcb8c1ee8f8e"
        ></script>
      </head>
      <body className="tracking-tight antialiased">
        <OrganizationSchema />
        <WebSiteSchema />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
            {/* <Footer /> */}
          </NextIntlClientProvider>
        </Providers>
        <a
          href="#top"
          title={common.backToTop || 'Back to top'}
          id="backToTop"
          className="fixed bottom-6 right-6 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 invisible"
          aria-label={common.backToTop || 'Back to top'}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
        <Script src="/js/backTop.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
