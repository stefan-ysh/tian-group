import { getMessages } from 'next-intl/server';
import { footerData } from '~/shared/data/global.data';
import { Link } from '~/i18n/routing';
import Logo from '~/components/atoms/Logo';

const Footer = async () => {
  const { links, footNote } = footerData;
  const footerLinks = links ?? [];
  const messages = await getMessages();
  const nav = (messages as any).Header?.NavMenu || {};
  const common = (messages as any).Common || {};

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/[0.76] dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
            aria-label={nav.home || 'Home'}
          >
            <Logo
              title={common.groupName || 'Tian Group'}
              subtitle={common.footerTagline || 'Functional materials and optoelectronic devices'}
              textClassName="[&>span:first-child]:text-base [&>span:last-child]:text-sm"
            />
          </Link>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            {common.footerDescription ||
              'A research group at the School of Chemistry and Materials, Yangzhou University.'}
          </p>
        </div>

        <nav
          aria-label={common.footerNav || 'Footer navigation'}
          className="flex flex-wrap gap-x-4 gap-y-3 lg:justify-end"
        >
          {footerLinks.map(({ href, code, label }) => (
            <Link
              key={href || code}
              href={(href || '/') as any}
              className="rounded-md text-sm font-medium text-slate-600 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:text-teal-200"
            >
              {nav[code || ''] || label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-slate-200 px-4 py-4 text-sm text-slate-500 sm:px-6 dark:border-white/10 dark:text-slate-400">
        {footNote}
        <a href="mailto:tiant91@yzu.edu.cn" className="transition hover:text-primary dark:hover:text-teal-200">
          tiant91@yzu.edu.cn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
