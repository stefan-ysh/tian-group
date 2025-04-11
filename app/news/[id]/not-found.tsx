import Link from 'next/link';
import { Newspaper } from 'lucide-react';

export default function NewsNotFound() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 text-center">
        <Newspaper className="w-24 h-24 mx-auto text-primary/50 mb-4" />
        <h1 className="text-3xl font-bold mb-4">新闻未找到</h1>
        <p className="text-xl text-foreground/70 mb-8">
          抱歉，您请求的新闻内容不存在或已被删除。
        </p>
        <Link
          href="/news"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          返回新闻列表
        </Link>
      </div>
    </section>
  );
} 