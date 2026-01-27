import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getNewsCounts } from '../../../../src/utils/contentLoader';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value || 'zh';

    // 获取所有新闻类型的数量
    const counts = await getNewsCounts(locale);
    
    // 返回所有计数
    return NextResponse.json(counts);
  } catch (error) {
    console.error('Error in news count API route:', error);
    return NextResponse.json(
      { error: '获取新闻计数失败' },
      { status: 500 }
    );
  }
} 