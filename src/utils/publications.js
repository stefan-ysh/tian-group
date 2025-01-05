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
        return await findPostBySlug(slug);
      }),
  );

  return publications;
};

let _publications;

/** */
export const fetchPublications = async () => {
  _publications = _publications || load();

  return await _publications;
};

/** */
export const findLatestPublications = async ({ count } = {}) => {
  const _count = count || 100;
  const publications = await fetchPublications();

  return publications ? publications.slice(_count * -1) : [];
};

/** */
export const findPostBySlug = async (slug) => {
  if (!slug) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch (e) {
    console.log('[ e ] >', e)
  }

  return null;
};

/** */
export const findPublicationsByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const publications = await fetchPublications();

  return ids.reduce(function (r, id) {
    publications.some(function (publications) {
      return id === publications.id && r.push(publications);
    });
    return r;
  }, []);
};
