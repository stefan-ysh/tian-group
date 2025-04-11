import { RecentNews } from './RecentNews';
import { findLatestNews } from '../../src/utils/news';
import { NewsItem } from './NewsTimeline';

// Server component to fetch the latest news and pass to the client component
export async function HomeNews() {
  // Fetch latest 3 news items
  const latestNews = await findLatestNews({ count: 3 });
  
  // Filter out null items and cast to NewsItem
  const typedNews = latestNews.filter(item => item !== null) as NewsItem[];
  
  return <RecentNews news={typedNews} />;
} 