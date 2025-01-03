import type { Metadata } from 'next';

import { heroFaqs, callToActionFaqs, faqs4Faqs } from '~/shared/data/pages/faqs.data';
import Hero from '~/components/widgets/Hero';

export const metadata: Metadata = {
  title: 'FAQs',
};

const Page = () => {
  return (
    <>
      {/* <Hero {...heroFaqs} /> */}
      news
    </>
  );
};

export default Page;
