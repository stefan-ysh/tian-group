'use server';

import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { 
  BaseContentItem, 
  NewsItem, 
  Publication, 
  Award, 
  Announcement, 
  Event, 
  Author,
  NewsType
} from '../types/content';

// 内容目录配置
const CONTENT_DIRS = {
  publications: join(process.cwd(), 'src/content/publications'),
  awards: join(process.cwd(), 'src/content/awards'),
  announcements: join(process.cwd(), 'src/content/announcements'),
  events: join(process.cwd(), 'src/content/events'),
};

/**
 * 创建内容目录（如果不存在）
 * @param contentType 内容类型
 */
async function ensureContentDir(contentType: string): Promise<void> {
  const dir = CONTENT_DIRS[contentType as keyof typeof CONTENT_DIRS];
  if (!dir) return;
  
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (error) {
    console.error(`Error creating content directory for ${contentType}:`, error);
  }
}

/**
 * 解析日期字符串（例如"May 2022"）为ISO日期
 * @param dateStr 日期字符串
 * @returns ISO格式的日期字符串或当前日期
 */
function parseDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  // 尝试解析类似"May 2022"的格式
  const dateRegex = /(\w+)\s+(\d{4})/;
  const match = dateStr.match(dateRegex);
  
  if (match) {
    const month = match[1];
    const year = match[2];
    const monthMap: Record<string, number> = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    
    if (monthMap[month] !== undefined) {
      const date = new Date(parseInt(year), monthMap[month], 15);
      return date.toISOString().split('T')[0]; // YYYY-MM-DD格式
    }
  }
  
  // 尝试直接解析日期字符串
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (e) {
    // 解析失败，返回当前日期
  }
  
  return new Date().toISOString().split('T')[0];
}

/**
 * 将作者字符串解析为Author对象数组
 * @param authorStr 作者字符串，例如"Tian Tian, Other Authors"
 * @returns Author对象数组
 */
function parseAuthors(authorStr?: string | string[]): Author[] {
  if (!authorStr) return [];
  
  // 如果是数组，直接使用；否则分割字符串
  const authorNames = Array.isArray(authorStr) ? authorStr : authorStr.split(',');
  
  return authorNames
    .map(author => author.trim())
    .filter(author => author) // 过滤空字符串
    .map(author => {
      // 移除作者名中的星号等标记
      // const cleanName = author.replace(/[*]/g, '').trim();
      // 从名字生成ID
      const id = author.toLowerCase().replace(/\s+/g, '-');
      return { id, name: author };
    });
}

/**
 * 从markdown文件加载内容
 * @param contentType 内容类型
 * @param transformer 转换函数，将frontmatter转换为指定的内容类型
 */
export async function loadContentFromFiles<T extends BaseContentItem>(
  contentType: string, 
  transformer: (frontmatter: any, id: string) => T | null
): Promise<T[]> {
  const dir = CONTENT_DIRS[contentType as keyof typeof CONTENT_DIRS];
  if (!dir) {
    console.error(`Content directory not found for type: ${contentType}`);
    return [];
  }
  
  try {
    // 确保目录存在
    await ensureContentDir(contentType);
    
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir);
    
    const content = files
      .filter((filename) => filename.endsWith('.md'))
      .map((filename) => {
        try {
          const filePath = join(dir, filename);
          const fileContent = fs.readFileSync(filePath, 'utf-8');
          const { data: frontmatter } = matter(fileContent);
          
          // 从文件名获取ID
          const id = filename.replace('.md', '').toLowerCase()
            .replace(/[^\w\s-]/g, '') // 移除特殊字符
            .replace(/\s+/g, '-');    // 用连字符替换空格
          
          // 使用转换函数将frontmatter转换为所需内容类型
          return transformer(frontmatter, id);
        } catch (error) {
          console.error(`Error processing file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean) as T[]; // 过滤掉null值
    
    return content;
  } catch (error) {
    console.error(`Error loading ${contentType}:`, error);
    return [];
  }
}

/**
 * 加载出版物数据
 */
export async function loadPublications(): Promise<Publication[]> {
  return loadContentFromFiles<Publication>('publications', (frontmatter, id) => {
    const date = parseDate(frontmatter.publishDate);
    
    return {
      id: `publication-${id}`,
      title: frontmatter.title || 'Untitled Publication',
      date: date,
      year: new Date(date).getFullYear(),
      summary: frontmatter.description || '',
      imageUrl: frontmatter.image || 'https://i.imgur.com/FRQ93Lm.jpg',
      tags: frontmatter.tags || ['Research', 'Publication'],
      link: frontmatter.link || '',
      authors: parseAuthors(frontmatter.author),
      journal: frontmatter.journal || 'Unknown Journal',
      volume: frontmatter.volume || '',
      issue: frontmatter.issue || '',
      pages: frontmatter.pages || '',
      doi: frontmatter.link?.replace('http://dx.doi.org/', '') || '',
      abstract: frontmatter.abstract || '',
      isHighlighted: frontmatter.highlighted || false,
      impactFactor: frontmatter.impactFactor || undefined,
      citations: frontmatter.citations || undefined,
      aspect: frontmatter.aspect || undefined,
      pdfUrl: frontmatter.pdfUrl || undefined
    };
  });
}

/**
 * 加载奖项数据
 */
export async function loadAwards(): Promise<Award[]> {
  return loadContentFromFiles<Award>('awards', (frontmatter, id) => {
    return {
      id: `award-${id}`,
      title: frontmatter.title || 'Untitled Award',
      date: parseDate(frontmatter.date),
      summary: frontmatter.description || '',
      imageUrl: frontmatter.image || undefined,
      tags: frontmatter.tags || ['Award'],
      link: frontmatter.link || undefined,
      recipient: frontmatter.recipient || undefined,
      organization: frontmatter.organization || undefined,
      aspect: frontmatter.aspect || undefined,
      awardType: frontmatter.awardType || undefined
    };
  });
}

/**
 * 加载公告数据
 */
export async function loadAnnouncements(): Promise<Announcement[]> {
  return loadContentFromFiles<Announcement>('announcements', (frontmatter, id) => {
    return {
      id: `announcement-${id}`,
      title: frontmatter.title || 'Untitled Announcement',
      date: parseDate(frontmatter.date),
      summary: frontmatter.description || '',
      imageUrl: frontmatter.image || undefined,
      tags: frontmatter.tags || ['Announcement'],
      link: frontmatter.link || undefined,
      category: frontmatter.category || undefined,
      aspect: frontmatter.aspect || undefined,
      deadline: frontmatter.deadline ? parseDate(frontmatter.deadline) : undefined,
      status: frontmatter.status || 'active'
    };
  });
}

/**
 * 加载活动数据
 */
export async function loadEvents(): Promise<Event[]> {
  return loadContentFromFiles<Event>('events', (frontmatter, id) => {
    return {
      id: `event-${id}`,
      title: frontmatter.title || 'Untitled Event',
      date: parseDate(frontmatter.date),
      summary: frontmatter.description || '',
      imageUrl: frontmatter.image || undefined,
      tags: frontmatter.tags || ['Event'],
      link: frontmatter.link || undefined,
      startDate: parseDate(frontmatter.startDate || frontmatter.date),
      endDate: frontmatter.endDate ? parseDate(frontmatter.endDate) : undefined,
      location: frontmatter.location || undefined,
      speakers: frontmatter.speakers || undefined,
      eventType: frontmatter.eventType || undefined
    };
  });
}

/**
 * 将所有内容类型转换为新闻项
 */
export async function loadAllAsNewsItems(): Promise<NewsItem[]> {
  // 加载所有内容类型
  const publications = await loadPublications();
  const awards = await loadAwards();
  const announcements = await loadAnnouncements();
  const events = await loadEvents();
  
  // 转换为新闻项
  const publicationNews: NewsItem[] = publications.map(pub => ({
    id: pub.id,
    title: pub.title,
    date: pub.date,
    summary: pub.summary,
    type: 'publication' as NewsType,
    imageUrl: pub.imageUrl,
    aspect: pub.aspect,
    link: pub.link,
    tags: pub.tags,
    authors: pub.authors,
    publication: {
      journal: pub.journal,
      volume: pub.volume,
      issue: pub.issue,
      doi: pub.doi
    }
  }));
  
  const awardNews: NewsItem[] = awards.map(award => ({
    id: award.id,
    title: award.title,
    date: award.date,
    summary: award.summary,
    type: 'award' as NewsType,
    imageUrl: award.imageUrl,
    aspect: award.aspect,
    link: award.link,
    tags: award.tags
  }));
  
  const announcementNews: NewsItem[] = announcements.map(announcement => ({
    id: announcement.id,
    title: announcement.title,
    date: announcement.date,
    summary: announcement.summary,
    type: 'announcement' as NewsType,
    imageUrl: announcement.imageUrl,
    aspect: announcement.aspect,
    link: announcement.link,
    tags: announcement.tags
  }));
  
  const eventNews: NewsItem[] = events.map(event => ({
    id: event.id,
    title: event.title,
    date: event.date,
    summary: event.summary,
    type: 'event' as NewsType,
    imageUrl: event.imageUrl,
    aspect: event.aspect,
    link: event.link,
    tags: event.tags
  }));
  
  // 合并所有新闻项
  return [...publicationNews, ...awardNews, ...announcementNews, ...eventNews];
}

/**
 * 获取不同类型新闻的数量
 */
export async function getNewsCounts(): Promise<Record<string, number>> {
  const news = await loadAllAsNewsItems();
  const counts: Record<string, number> = { all: news.length };
  
  // 计算每种类型的数量
  news.forEach(item => {
    if (!counts[item.type]) {
      counts[item.type] = 0;
    }
    counts[item.type]++;
  });
  
  return counts;
} 