import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/activities');

const load = () => {
  const files = fs.readdirSync(BLOG_DIR);

  const activities = Promise.all(
    files
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) => {
        const id = filename.replace('.md', '');
        return await findMembersByName(id);
      }),
  );

  return activities;
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
  const activities = await fetchMembers();

  return activities ? activities.slice(_count * -1) : [];
};

/** */
export const findMembersByName = async (id) => {
  if (!id) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${id}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      id,
      ...frontmatter,
      content,
    };
  } catch (e) {}

  return null;
};

/** */
export const findPostsByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const activities = await fetchMembers();

  return ids.reduce(function (r, id) {
    activities.some(function (post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};