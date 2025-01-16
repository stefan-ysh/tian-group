import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '研究方向 | 田甜科研小组',
  description: '扬州大学化学学院，田甜的科研小组，主要研究方向包括环糊精、钙钛矿、太阳能电池等, 多项科研成果发布在Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A',
  openGraph: {
    title: '研究方向 | 田甜科研小组',
    description: '扬州大学化学学院，田甜的科研小组，主要研究方向包括环糊精、钙钛矿、太阳能电池等, 多项科研成果发布在Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A'
  }
}
export default async function ResearchWrapper({}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20 pt-0">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Research in Progress
        </h1>
      </header>
    </section>
  );
}
