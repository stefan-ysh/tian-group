import { NextResponse } from 'next/server';
import { findLatestMembers } from '../../../src/utils/members';

interface Member {
  slug: string;
  name: string;
  avatar: string;
  position: string;
  order: number;
}

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
    
    return NextResponse.json({ 
      members: sortedMembers
    });
  } catch (error) {
    console.error('API: Error fetching members data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members data' },
      { status: 500 }
    );
  }
} 