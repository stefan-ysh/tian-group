import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    console.log('API: Fetching publications data');
    const publications = await findLatestPublications();

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

    return NextResponse.json({
      publications: safePublications,
    });
  } catch (error) {
    console.error('API: Error fetching publications data:', error);
    return NextResponse.json({ error: 'Failed to fetch publications data' }, { status: 500 });
  }
}
