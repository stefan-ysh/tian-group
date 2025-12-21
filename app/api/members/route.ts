import { NextResponse } from 'next/server';
import { findLatestMembers } from '../../../src/utils/members';

interface Member {
  slug: string;
  name: string;
  avatar: string;
  position: string;
  order: number;
}

// 配置缓存：1小时重新验证，24小时内可使用过期缓存
export const revalidate = 3600;

export async function GET() {
  try {
    console.log('API: Fetching members data');
    const members = await findLatestMembers();
    
    if (!members || !Array.isArray(members)) {
      console.error('API: Members data is not an array or is empty', members);
      return NextResponse.json(
        { error: 'Invalid members data format' },
        { status: 500 }
      );
    }
    
    console.log(`API: Found ${members.length} members`);
    
    // Sort by order property
    const sortedMembers = members.sort((a: Member, b: Member) => (a.order - b.order));
    
    return NextResponse.json(
      { 
        members: sortedMembers
      },
      {
        headers: {
          // 浏览器缓存1小时
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          // CDN 缓存配置
          'CDN-Cache-Control': 'public, s-maxage=3600',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
        },
      }
    );
  } catch (error) {
    console.error('API: Error fetching members data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members data' },
      { status: 500 }
    );
  }
} 