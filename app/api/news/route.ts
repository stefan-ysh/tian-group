import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loadAllAsNewsItems } from '../../../src/utils/contentLoader';

// 配置缓存：30分重新验证，12小时内内可使用过期缓存
export const revalidate = 1800;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';

    // 获取查询参数
    const url = new URL(request.url);
    const count = url.searchParams.get('count');
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    const type = url.searchParams.get('type');
    
    // 加载所有新闻项
    let allNews = await loadAllAsNewsItems(locale);
    
    // 如果指定了类型，进行过滤
    if (type && type !== 'all') {
      allNews = allNews.filter(item => item.type === type);
    }
    
    // 按照日期排序（最新的在前面）
    allNews = allNews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // 过滤掉null项
    const filteredAllNews = allNews.filter(item => item !== null);
    const totalCount = filteredAllNews.length;
    
    // 准备返回的新闻
    let news = [...filteredAllNews];
    
    // 使用分页参数
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const startIndex = pageNum === 1 ? 0 : (pageNum - 1) * limitNum;
      const endIndex = pageNum === 1 ? limitNum : startIndex + limitNum;
      news = news.slice(startIndex, endIndex);
    }
    // 否则使用简单的count参数
    else if (count) {
      news = news.slice(0, parseInt(count));
    }
    
    // 返回JSON响应，包含新闻项和总数量
    return NextResponse.json(
      {
        items: news,
        total: totalCount,
      },
      {
        headers: {
          // 浏览器缓存30分钟
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=43200',
          // CDN 缓存配置
          'CDN-Cache-Control': 'public, s-maxage=1800',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=1800',
        },
      }
    );
  } catch (error) {
    console.error('Error in news API route:', error);
    return NextResponse.json(
      { error: '获取新闻失败' },
      { status: 500 }
    );
  }
} 