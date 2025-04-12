import { NextRequest, NextResponse } from 'next/server';

import { fetchActivities, findActivitiesByName } from '../../../src/utils/activities';

// 定义活动项的接口
interface ActivityItem {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  position: string;
  date: string;
  location?: string;
  tags?: string[];
  content?: string;
}

// 使用服务器端缓存提高性能
let cachedActivities: ActivityItem[] = [];
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const count = url.searchParams.get('count');
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    
    // 如果请求特定活动
    if (id) {
      const activity = await findActivitiesByName(id);
      if (!activity) {
        return NextResponse.json(
          { error: '未找到活动' },
          { status: 404 }
        );
      }
      return NextResponse.json(activity);
    }
    
    // 检查缓存是否有效
    if (cachedActivities && Date.now() - cacheTime < CACHE_DURATION) {
      let activities = [...cachedActivities];
      
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
      
      return NextResponse.json({
        items: activities,
        total: cachedActivities.length
      });
    }
    
    // 如果缓存无效，获取所有活动
    const allActivities = await fetchActivities();
    
    // 按日期排序（最新的在前）
    const sortedActivities = [...allActivities].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // 更新缓存
    cachedActivities = sortedActivities;
    cacheTime = Date.now();
    
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
    
    return NextResponse.json({
      items: activities,
      total: sortedActivities.length
    });
  } catch (error) {
    console.error('获取活动数据时出错:', error);
    return NextResponse.json(
      { error: '获取活动数据失败' },
      { status: 500 }
    );
  }
} 