import Content from '~/components/widgets/Content';
import Features2 from '~/components/widgets/Features2';
import Features4 from '~/components/widgets/Features4';
import Hero from '~/components/widgets/Hero';
import { callToActionServices, contentServicesOne, contentServicesTwo, faqsServices, features2Services, features4Services, heroServices, testimonialsServices } from '~/shared/data/pages/services.data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
};

const Page = () => {
  return (
    <>
      <Hero {...heroServices} />
      <Features2 {...features2Services} />
      <Content {...contentServicesOne} />
      <Content {...contentServicesTwo} />
      <Features4 {...features4Services} />
      {/* <Testimonials {...testimonialsServices} /> */}
      {/* <FAQs {...faqsServices} /> */}
      {/* <CallToAction {...callToActionServices} /> */}
    </>
  );
};

export default Page;
