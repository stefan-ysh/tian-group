import { findPublicationsByName } from '~/utils/publications';

export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const publication = await findPublicationsByName(slug);
    
    if (!publication) {
      return {
        title: '出版物未找到',
        description: '请求的出版物信息不存在'
      };
    }
    
    return { 
      title: publication.title || slug,
      description: publication.description || publication.abstract || '论文详情'
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '出版物',
      description: '论文详情页面'
    };
  }
} 