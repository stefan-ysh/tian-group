import { NextResponse } from 'next/server';
import { findMembersByName } from '../../../../src/utils/members';

interface Member {
  slug: string;
  name: string;
  avatar?: string;
  position?: string;
  content: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    console.log(`API: Fetching member with slug: ${slug}`);
    
    const member = await findMembersByName(slug) as Member;
    
    if (!member) {
      console.error(`API: Member not found with slug: ${slug}`);
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }
    
    console.log(`API: Successfully found member: ${member.name || slug}`);
    
    return NextResponse.json({ member });
  } catch (error) {
    console.error('API: Error fetching member data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member data' },
      { status: 500 }
    );
  }
} 