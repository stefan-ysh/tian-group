import Link from 'next/link';

import type { Metadata } from 'next';

import { generateSEOMetadata } from '~/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: '页面未找到',
  description: '抱歉，您访问的页面不存在或已被移动。',
  noindex: true,
  path: '/404',
  type: 'website',
});

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">页面未找到</h2>
      <p className="text-lg text-foreground/70 mb-8 text-center max-w-md">
        抱歉，您访问的页面不存在或已被移动。请返回首页或尝试其他链接。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        返回首页
      </Link>
    </section>
  );
}
