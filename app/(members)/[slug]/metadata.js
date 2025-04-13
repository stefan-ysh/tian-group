import { findMembersByName } from '~/utils/members';

export async function generateMetadata({ params }) {
  try {
    const member = await findMembersByName(params.slug);
    
    if (!member) {
      return {
        title: '成员未找到',
        description: '请求的成员信息不存在'
      };
    }
    
    return { 
      title: `${member.name} - ${member.position}`,
      description: member.description || `${member.name}的个人资料`
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '团队成员',
      description: '成员详情页面'
    };
  }
} 