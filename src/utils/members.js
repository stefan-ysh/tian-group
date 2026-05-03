import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { cache } from 'react';

const BLOG_DIR = join(process.cwd(), 'src/content/members');

const STUDENT_POSITIONS = new Set(['Graduate', 'Doctoral', 'Master Student', 'PhD Student']);

const POSITION_LABELS = {
  zh: {
    Graduate: '研究生',
    Doctoral: '博士',
    'Master Student': '硕士研究生',
    'PhD Student': '博士研究生',
  },
  en: {
    Graduate: 'Graduate',
    Doctoral: 'Doctoral',
    'Master Student': 'Master Student',
    'PhD Student': 'PhD Student',
  },
};

const normalizeText = (text = '') =>
  String(text)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/[\s。．.，,、:：;；!！?？\-—–_]/g, '')
    .toLowerCase();

const isStudent = (member) => STUDENT_POSITIONS.has(member?.position) || STUDENT_POSITIONS.has(member?.position_en);

const getPositionLabel = (member, locale) => {
  const position = locale === 'en' && member.position_en ? member.position_en : member.position;
  return POSITION_LABELS[locale]?.[position] || position;
};

const withEducationInDescription = (member, description, locale) => {
  if (!isStudent(member) || !description) return description;

  const rawPosition = locale === 'en' && member.position_en ? member.position_en : member.position;
  const positionLabel = getPositionLabel(member, locale);
  if (!positionLabel || normalizeText(description).includes(normalizeText(positionLabel))) {
    return description;
  }

  if (rawPosition && normalizeText(description).includes(normalizeText(rawPosition))) {
    return description.replace(rawPosition, positionLabel);
  }

  return `${description} - ${positionLabel}`;
};

const removeDuplicateContent = (content, descriptions = []) => {
  if (!content) return content;
  const normalizedContent = normalizeText(content);
  return descriptions.some((description) => description && normalizedContent === normalizeText(description)) ? '' : content;
};

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

/** */
const fetchMembersInternal = async (locale = 'zh') => {
  const members = await load();
  return members.map(member => localizeMember(member, locale));
};

export const fetchMembers = cache(fetchMembersInternal);

/** */
const localizeMember = (member, locale) => {
  if (!member) return null;
  const isEn = locale === 'en';
  
  // Split content by separator
  const contentParts = member.content.split('---EN---');
  const localizedContent = isEn 
    ? (contentParts[1] || contentParts[0]) 
    : contentParts[0];

  const rawDescription = (isEn && member.description_en) ? member.description_en : member.description;
  const description = withEducationInDescription(member, rawDescription, locale);
  const content = removeDuplicateContent(localizedContent.trim(), [rawDescription, description]);

  return {
    ...member,
    name: (isEn && member.name_en) ? member.name_en : member.name,
    position: (isEn && member.position_en) ? member.position_en : member.position,
    research_areas: (isEn && member.research_areas_en) ? member.research_areas_en : member.research_areas,
    title: (isEn && member.title_en) ? member.title_en : member.title,
    description,
    content,
  };
};

/** */
export const findLatestMembers = async ({ count, locale = 'zh' } = {}) => {
  const _count = count || 40;
  const members = await fetchMembers(locale);

  return members ? members.slice(_count * -1) : [];
};

/** */
export const findMembersByName = async (slug, locale = 'zh') => {
  if (!slug) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${slug}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    const member = {
      slug,
      ...frontmatter,
      content,
    };
    return localizeMember(member, locale);
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
