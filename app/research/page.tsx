import type { Metadata } from 'next';

import Hero from '~/components/widgets/Hero';
import Pricing from '~/components/widgets/Pricing';
import Comparison from '~/components/widgets/Comparison';
import { heroPricing, comparisonPricing, faqs3Pricing, pricingPricing } from '~/shared/data/pages/pricing.data';

export const metadata: Metadata = {
  title: 'Pricing',
};

const Page = () => {
  return (
    <>
      {/* <Hero {...heroPricing} />
      <Pricing {...pricingPricing} />
      <Comparison {...comparisonPricing} /> */}
      哈哈哈
    </>
  );
};

export default Page;
