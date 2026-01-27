import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/publications');

const load = () => {
  const files = fs.readdirSync(BLOG_DIR);

  const publications = Promise.all(
    files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const s = filename.replace('.md', '')
        const slug = s
        return await findPublicationsByName(slug);
      }),
  );

  return publications;
};

let _publications;

/** */
export const fetchPublications = async (locale = 'zh') => {
  const publications = await load();
  return publications.map((pub) => localizePublication(pub, locale));
};

/** */
const localizePublication = (pub, locale) => {
  if (!pub) return null;
  const isEn = locale === 'en';

  // Split content by separator
  const contentParts = pub.content.split('---EN---');
  const localizedContent = isEn ? contentParts[1] || contentParts[0] : contentParts[0];

  return {
    ...pub,
    title: isEn && pub.title_en ? pub.title_en : pub.title,
    abstract: isEn && pub.abstract_en ? pub.abstract_en : pub.abstract,
    journal: isEn && pub.journal_en ? pub.journal_en : pub.journal,
    content: localizedContent.trim(),
  };
};

/** */
export const findLatestPublications = async ({ count, locale = 'zh' } = {}) => {
  const _count = count || 100;
  const publications = await fetchPublications(locale);

  return publications ? publications.slice(_count * -1) : [];
};

/** */
export const findPublicationsByName = async (slug, locale = 'zh') => {
  if (!slug) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    const pub = {
      slug,
      ...frontmatter,
      content,
    };
    return localizePublication(pub, locale);
  } catch (e) {
    // console.log('[ e ] >', e)
  }

  return null;
};

/** */
export const findPublicationsByIds = async (ids, locale = 'zh') => {
  if (!Array.isArray(ids)) return [];

  const publications = await fetchPublications(locale);

  return ids.reduce(function (r, id) {
    publications.some(function (pub) {
      return id === pub.id && r.push(pub);
    });
    return r;
  }, []);
};
