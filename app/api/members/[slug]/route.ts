import { NextResponse } from 'next/server';
import { findLatestMembers, findMembersByName } from '../../../../src/utils/members';

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
    const { searchParams } = new URL(request.url);
    const queryLocale = searchParams.get('locale');
    
    const locale = queryLocale || (request.headers.get('cookie')?.split('; ')
      .find(row => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1]) || 'zh';
    
    const member = await findMembersByName(slug, locale) as Member;
    
    if (!member) {
      console.error(`API: Member not found with slug: ${slug}`);
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }
    
    const members = await findLatestMembers({ locale }) as Member[];
    const advisor = member.advisor ? members.find((item) => item.slug === member.advisor) : null;
    const advisedStudents = members.filter((item) => item.advisor === member.slug);

    return NextResponse.json({
      member: {
        ...member,
        advisorSlug: advisor?.slug,
        advisorName: advisor?.name,
        advisedStudents: advisedStudents.map((student) => ({
          slug: student.slug,
          name: student.name,
          avatar: student.avatar,
        })),
      },
    });
  } catch (error) {
    console.error('API: Error fetching member data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member data' },
      { status: 500 }
    );
  }
} 
