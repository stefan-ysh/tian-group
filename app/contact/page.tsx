import type { Metadata } from 'next';
import Contact from '~/components/widgets/Contact';
import { contactAbout } from '~/shared/data/pages/about.data';

export const metadata: Metadata = {
  title: `About us`,
};

const Page = () => {
  return (
    <>
      <Contact {...contactAbout} />
    </>
  );
};

export default Page;
