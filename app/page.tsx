import { SITE } from '~/config.js';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: {
    template: `%s — ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
};
const IndexPage = () => {
  return <>index page</>;
};

export default IndexPage;
