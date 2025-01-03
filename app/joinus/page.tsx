import type { Metadata } from 'next';

import Contact2 from '~/components/widgets/Contact2';
import Hero from '~/components/widgets/Hero';
import { heroContact, contact2Contact } from '~/shared/data/pages/contact.data';

export const metadata: Metadata = {
  title: 'Contact us',
};

const Page = () => {
  return (
    <>
      {/* <Hero {...heroContact} /> */}
      {/* <Contact2 {...contact2Contact} /> */}
      join us
    </>
  );
};

export default Page;
