import { Metadata } from 'next';
import { NewsTimeline, NewsItem } from '../components/NewsTimeline';
import { fetchNews } from '../../src/utils/news';

export const metadata: Metadata = {
  title: '新闻动态 | 田甜科研小组',
  description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, NC, Wiley, Advanced Materials, Advanced Functional Materials, ACS Nano,  ACS Energy Letters',
  openGraph: {
    title: '新闻动态 | 田甜科研小组',
    description: '扬州大学化学学院庞欢课题组-田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、NC、Wiley、Advanced Materials等众多权威期刊。'
  }
}

export default async function NewsPage() {
  return (
    <section className="w-full mx-auto py-8">
      {/* <div className="container mx-auto px-4"> */}
        {/* <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            新闻动态
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            了解我们研究组的最新动态，包括研究成果、学术活动、团队荣誉及合作项目。
          </p>
        </header> */}
        
        {/* News Timeline Component */}
        <NewsClientWrapper />
      {/* </div> */}
    </section>
  );
}

// Client component wrapper to handle news data loading
import dynamic from 'next/dynamic';

const NewsClientWrapper = dynamic(() => import('./NewsClient').then(mod => mod.NewsClient), {
  ssr: true,
  loading: () => (
    <div className="py-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-primary/20 rounded mb-8"></div>
        <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="h-6 bg-primary/20 rounded w-24"></div>
                <div className="h-4 bg-primary/10 rounded w-32"></div>
              </div>
              <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});
