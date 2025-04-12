/**
 * 作者信息接口
 */
export interface Author {
  id: string;
  name: string;
}

/**
 * 基础内容项接口 - 所有内容类型的共同属性
 */
export interface BaseContentItem {
  id: string;
  title: string;
  date: string;  // ISO格式的日期
  summary: string;
  tags?: string[];
  imageUrl?: string;
  link?: string;
}

/**
 * 新闻类型枚举
 */
export type NewsType = 'publication' | 'award' | 'event' | 'media' | 'announcement';

/**
 * 新闻项接口
 */
export interface NewsItem extends BaseContentItem {
  type: NewsType;
  aspect?: string;
  authors?: Author[];
  publishDate?: string;
  publication?: {
    journal: string;
    volume?: string;
    issue?: string;
    doi?: string;
  };
}

/**
 * 论文接口
 */
export interface Publication extends BaseContentItem {
  authors: Author[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  aspect?: string;
  doi?: string;
  abstract?: string;
  isHighlighted?: boolean;
  impactFactor?: number;
  citations?: number;
  pdfUrl?: string;
}

/**
 * 奖项接口
 */
export interface Award extends BaseContentItem {
  recipient?: string;
  organization?: string;
  aspect?: string;
  awardType?: string; // 例如：荣誉奖、研究资助等
}

/**
 * 公告接口
 */
export interface Announcement extends BaseContentItem {
  category?: string; // 例如：招聘、通知、活动等
  deadline?: string; // ISO格式的日期，如果适用
  aspect?: string;
  status?: 'active' | 'expired';
}

/**
 * 活动接口
 */
export interface Event extends BaseContentItem {
  startDate: string; // ISO格式的日期时间
  endDate?: string;  // ISO格式的日期时间
  location?: string;
  speakers?: string[];
  eventType?: string; // 例如：会议、研讨会、工作坊等
  aspect?: string;
}

// 添加 DetailNewsItem 接口定义
export interface DetailNewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  type: string;
  imageUrl?: string;
  link?: string;
  tags?: string[];
  authors?: {
    id: string;
    name: string;
  }[];
  publication?: {
    journal: string;
    volume?: string;
    issue?: string;
    doi?: string;
  };
} 