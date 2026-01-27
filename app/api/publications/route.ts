import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { findLatestPublications } from '~/utils/publications';

interface Publication {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  journal: string;
  authors: Array<{ name: string; role?: string }>;
  image?: string;
  link?: string;
  doi?: string;
  abstract?: string;
  impactFactor?: number;
  citations?: number;
}

// 配置缓存：1小时重新验证，24小时内可使用过期缓存
export const revalidate = 3600;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';

    console.log(`API: Fetching publications data for locale: ${locale}`);
    const publications = await findLatestPublications({ locale });

    if (!publications || !Array.isArray(publications)) {
      console.error('API: Publications data is not an array or is empty', publications);
      return NextResponse.json({ error: 'Invalid publications data format' }, { status: 500 });
    }

    console.log(`API: Found ${publications.length} publications`);

    // 按照发布日期排序并创建安全副本
    const safePublications = [...publications]
      .map((pub) => ({
        ...pub,
        publishDate: pub.publishDate || '',
        // Ensure all fields are safe
      }))
      .sort((a: Publication, b: Publication) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    return NextResponse.json(
      {
        publications: safePublications,
      },
      {
        headers: {
          // 浏览器缓存1小时
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          // CDN 缓存配置
          'CDN-Cache-Control': 'public, s-maxage=3600',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
        },
      }
    );
  } catch (error) {
    console.error('API: Error fetching publications data:', error);
    return NextResponse.json({ error: 'Failed to fetch publications data' }, { status: 500 });
  }
}
