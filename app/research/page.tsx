import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '研究方向 | 田甜课题组',
  description: '扬州大学化学学院，田甜课题组',
  openGraph: {
    title: '研究方向 | 田甜课题组',
    description: '扬州大学化学学院，田甜课题组'
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
