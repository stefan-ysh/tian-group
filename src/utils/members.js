import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/members');

const load = () => {
  const files = fs.readdirSync(BLOG_DIR);

  const members = Promise.all(
    files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const slug = filename.replace('.md', '');
        return await findMembersByName(slug);
      }),
  );

  return members;
};

let _memberss;

/** */
export const fetchMembers = async () => {
  _memberss = _memberss || load();

  return await _memberss;
};

/** */
export const findLatestMembers = async ({ count } = {}) => {
  const _count = count || 40;
  const members = await fetchMembers();

  return members ? members.slice(_count * -1) : [];
};

/** */
export const findMembersByName = async (slug) => {
  if (!slug) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      ...frontmatter,
      content,
    };
  } catch (e) {}

  return null;
};

/** */
export const findPostsByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const members = await fetchMembers();

  return ids.reduce(function (r, id) {
    members.some(function (post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};
