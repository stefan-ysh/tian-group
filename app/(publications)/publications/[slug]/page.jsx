import md from 'markdown-it';
import katex from 'katex';
import tm from 'markdown-it-texmath';
import { notFound } from 'next/navigation';

import { findPublicationsByName, findLatestPublications } from '~/utils/publications';

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const publication = await findPublicationsByName(decodeURIComponent(params.slug));

  if (!publication) {
    return notFound();
  }
  const title = `${publication.title}`;
  return { title, description: publication.description };
}

export async function generateStaticParams() {
  try {
    const publications = await findLatestPublications();
    return publications.map(({ slug }) => ({
      slug: encodeURIComponent(slug),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function Page({ params }) {
  const publication = await findPublicationsByName(decodeURIComponent(params.slug));

  if (!publication) {
    return <div>Publication not found</div>;
  }

  return (
    <section className="mx-auto px-0 md:px-0 pt-0">
      <article>
        <div
          className="prose-md prose-headings:font-heading prose-headings:leading-tighter container prose prose-lg mx-auto mt-8  px-6 prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-primary-600 prose-img:rounded-md prose-img:shadow-lg dark:prose-invert dark:prose-headings:text-slate-300 dark:prose-a:text-primary-400 sm:px-0 lg:prose-xl font-serif"
          dangerouslySetInnerHTML={{
            __html: md({
              html: true,
            })
              .use(tm, {
                engine: katex,
                delimiters: 'dollars',
                katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
              })
              .render(publication.content),
          }}
        />
      </article>
    </section>
  );
}
