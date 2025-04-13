import { NextResponse } from 'next/server';
import { findPublicationsByName } from '~/utils/publications';

interface Publication {
  slug: string;
  title?: string;
  content: string;
  [key: string]: any;
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = decodeURIComponent(params.slug);
    console.log(`API: Fetching publication with slug: ${slug}`);

    const publication = (await findPublicationsByName(slug)) as Publication;

    if (!publication) {
      console.error(`API: Publication not found with slug: ${slug}`);
      return NextResponse.json({ error: 'Publication not found' }, { status: 404 });
    }

    console.log(`API: Successfully found publication: ${publication.title || slug}`);

    return NextResponse.json({ publication });
  } catch (error) {
    console.error('API: Error fetching publication data:', error);
    return NextResponse.json({ error: 'Failed to fetch publication data' }, { status: 500 });
  }
}
