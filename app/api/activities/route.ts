import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { fetchActivities, findActivitiesByName } from '../../../src/utils/activities';

// ... (existing interfaces)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';
    
    // 获取查询参数
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const count = url.searchParams.get('count');
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    
    // 如果请求特定活动
    if (id) {
      const activity = await findActivitiesByName(id, locale);
      if (!activity) {
        return NextResponse.json(
          { error: '未找到活动' },
          { status: 404 }
        );
      }
      return NextResponse.json(activity);
    }
    
    // 获取所有活动
    const allActivities = await fetchActivities(locale);
    
    // 按日期排序（最新的在前）
    const sortedActivities = [...allActivities].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // 准备返回数据
    let activities = [...sortedActivities];
    
    // 应用分页
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const startIndex = pageNum === 1 ? 0 : (pageNum - 1) * limitNum;
      const endIndex = pageNum === 1 ? limitNum : startIndex + limitNum;
      activities = activities.slice(startIndex, endIndex);
    } 
    // 或使用count参数
    else if (count) {
      activities = activities.slice(0, parseInt(count));
    }
    
    return NextResponse.json(
      {
        items: activities,
        total: sortedActivities.length,
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
    console.error('获取活动数据时出错:', error);
    return NextResponse.json(
      { error: '获取活动数据失败' },
      { status: 500 }
    );
  }
} 