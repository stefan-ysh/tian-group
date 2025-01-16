import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 | 田甜科研小组',
  description: '扬州大学化学学院田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、JACS、JPC、NC、Wiley、Nature、Science、Advanced Materials等众多权威期刊。, Journal of Materials Chemistry B, Journal of Materials Chemistry C, Journal of Materials Chemistry D, Journal of Materials Chemistry E, Journal of Materials Chemistry F, Journal of Materials Chemistry G, Journal of Materials Chemistry H, Journal of Materials Chemistry I, Journal of Materials Chemistry',
  keywords: '田甜, 扬州大学, 化学学院, 科研实验室, 环糊精, 钙钛矿, 太阳能电池, 教授, Angew, JACS, JPC, NC, Wiley, Nature, Science, Advanced Materials, Advanced Functional Materials, ACS Nano, ACS Catalysis, ACS Energy Letters, ACS Energy & Fuels, ACS Sustainable Chemistry & Engineering, Journal of Materials Chemistry A, Journal of Materials Chemistry B, Journal of Materials Chemistry C, Journal of Materials Chemistry D, Journal of Materials Chemistry E, Journal of Materials Chemistry F, Journal of Materials Chemistry G, Journal of Materials Chemistry H, Journal of Materials Chemistry I, Journal of Materials Chemistry',
  openGraph: {
    title: '联系我们 | 田甜科研小组',
    description: '扬州大学化学学院田甜科研小组，专注环糊精、钙钛矿、太阳能电池研究，成果发表于Angew、JACS、JPC、NC、Wiley、Nature、Science、Advanced Materials等众多权威期刊。, Journal of Materials Chemistry B, Journal of Materials Chemistry C, Journal of Materials Chemistry D, Journal of Materials Chemistry E, Journal of Materials Chemistry F, Journal of Materials Chemistry G, Journal of Materials Chemistry H, Journal of Materials Chemistry I, Journal of Materials Chemistry'
  }
}

export default async function ContactWrapper({}) {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:px-6 sm:py-16 lg:py-20 pt-0">
      <header>
        <h1 className="leading-tighter font-heading mb-8 text-center text-4xl font-bold tracking-tighter md:mb-16 md:text-5xl">
          Contact in Progress
        </h1>
      </header>
    </section>
  );
}
