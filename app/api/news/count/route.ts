import { NextRequest, NextResponse } from 'next/server';
import { getNewsCounts } from '../../../../src/utils/contentLoader';

export async function GET(request: NextRequest) {
  try {
    // 获取所有新闻类型的数量
    const counts = await getNewsCounts();
    
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