import { getMessages } from 'next-intl/server';
import { footerData } from '~/shared/data/global.data';
import { Link } from '~/i18n/routing';
import { IconCompass, IconLink } from '@tabler/icons-react';
import Logo from '~/components/atoms/Logo';

const Footer = async () => {
  const { links, externalLinks, footNote } = footerData;
  const footerLinks = links ?? [];
  const extLinks = externalLinks ?? [];
  const messages = await getMessages();
  const nav = (messages as Record<string, Record<string, string>>).Header?.NavMenu || {};
  const common = (messages as Record<string, string>).Common || {};

  const linkClassName =
    'rounded-md text-sm font-medium text-slate-600 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:text-teal-200';

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white/[0.76] dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-5 sm:px-6 lg:grid-cols-12 lg:gap-8">
        {/* 左侧：Logo + 简介 */}
        <div className="lg:col-span-5 xl:col-span-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2"
            aria-label={(nav as Record<string, string>).home || 'Home'}
          >
            <Logo
              title={(common as Record<string, string>).groupName || 'Tian Group'}
              subtitle={
                (common as Record<string, string>).footerTagline ||
                'Functional materials and optoelectronic devices'
              }
              textClassName="[&>span:first-child]:text-base [&>span:last-child]:text-sm"
            />
          </Link>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {(common as Record<string, string>).footerDescription ||
              'A research group at the School of Chemistry and Materials, Yangzhou University.'}
          </p>
        </div>

        {/* 右侧：页面导航 + 友情链接 */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-7 xl:col-span-6 lg:gap-12">
          {/* 页面导航 */}
          <nav aria-label={(common as Record<string, string>).footerNav || 'Footer navigation'}>
            <h3 className="mb-5 flex items-center gap-2 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-900 dark:border-white/10 dark:text-white">
              <IconCompass className="h-4 w-4 text-primary dark:text-teal-400" />
              {(common as Record<string, string>).footerNav || '页面导航'}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {footerLinks.map(({ href, code, label }) => (
                <li key={href || code}>
                  <Link href={(href || '/') as '/'} className={linkClassName}>
                    {(nav as Record<string, string>)[code || ''] || label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 友情链接 */}
          {extLinks.length > 0 && (
            <div>
              <h3 className="mb-5 flex items-center gap-2 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-900 dark:border-white/10 dark:text-white">
                <IconLink className="h-4 w-4 text-primary dark:text-teal-400" />
                {(common as Record<string, string>).friendlyLinks || '友情链接'}
              </h3>
              <ul className="grid gap-y-3">
                {extLinks.map(({ href, label, code }) => (
                  <li key={href || code}>
                    <a
                      href={href || '/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {(nav as Record<string, string>)[code || ''] || label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 底部版权栏 */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-slate-200 px-4 py-4 text-sm text-slate-500 sm:px-6 dark:border-white/10 dark:text-slate-400">
        {footNote}
        <a
          href="mailto:tiant91@yzu.edu.cn"
          className="transition hover:text-primary dark:hover:text-teal-200"
        >
          tiant91@yzu.edu.cn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
