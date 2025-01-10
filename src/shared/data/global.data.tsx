import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconChevronDown,
  IconRss,
} from '@tabler/icons-react';
import { AnnouncementProps, FooterProps, HeaderProps } from '../types';

// Announcement data
export const announcementData: AnnouncementProps = {
  title: 'NEW',
  callToAction: {
    text: 'This template is made with Next.js 14 using the new App Router »',
    href: 'https://nextjs.org/blog/next-14',
  },
  callToAction2: {
    text: 'Follow @onWidget on Twitter',
    href: 'https://twitter.com/intent/user?screen_name=onwidget',
  },
};

// Header data
export const headerData: HeaderProps = {
  links: [
    {
      label: 'Home',
      code: 'home',
      href: '/',
    },
    {
      label: 'Research',
      code: 'research',
      href: '/research',
    },
    {
      label: 'Publications',
      code: 'publications',
      href: '/publications',
    },
    {
      label: 'Members',
      code: 'members',
      href: '/members',
    },
    {
      label: 'News',
      code: 'news',
      href: '/news',
    },
    // {
    //   label: 'Terms & Conditions',
    //   href: '/terms',
    // },
    {
      label: 'Activities',
      code: 'activities',
      href: '/activities',
    },
    {
      label: 'Join Us',
      code: 'joinus',
      href: '/joinus',
    },
    {
      label: 'Contact',
      code: 'contact',
      href: '/contact',
    },
  ],
  // actions: [
  //   {
  //     text: 'Download',
  //     href: 'https://github.com/onwidget/tailnext',
  //     targetBlank: true,
  //   },
  // ],
  isSticky: true,
  showToggleTheme: true,
  showRssFeed: false,
  position: 'right',
};

// Footer data
export const footerData: FooterProps = {
  title: 'Tian group',
  links: [
    {
      label: 'Index',
      href: '/',
      code: 'home',
    },
    {
      label: 'Research',
      href: '/research',
      code: 'research',
    },
    {
      label: 'Publications',
      href: '/publications',
      code: 'publications',
    },
    {
      label: 'Members',
      href: '/members',
      code: 'members',
    },
    {
      label: 'News',
      href: '/news',
      code: 'news',
    },
    // {
    //   label: 'Terms & Conditions',
    //   href: '/terms',
    // },
    {
      label: 'Activities',
      href: '/activities',
      code: 'activities',
    },
    {
      label: 'Join Us',
      href: '/joinus',
      code: 'joinus',
    },
    {
      label: 'Contact',
      href: '/contact',
      code: 'contact',
    },
  ],
  columns: [
    // {
    //   title: 'Product',
    //   links: [
    //     {
    //       label: 'Features',
    //       href: '/',
    //     },
    //     {
    //       label: 'Security',
    //       href: '/',
    //     },
    //     {
    //       label: 'Team',
    //       href: '/',
    //     },
    //     {
    //       label: 'Enterprise',
    //       href: '/',
    //     },
    //     {
    //       label: 'Customer stories',
    //       href: '/',
    //     },
    //     {
    //       label: 'Pricing',
    //       href: '/pricing',
    //     },
    //     {
    //       label: 'Resources',
    //       href: '/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Platform',
    //   links: [
    //     {
    //       label: 'Developer API',
    //       href: '/',
    //     },
    //     {
    //       label: 'Partners',
    //       href: '/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Support',
    //   links: [
    //     {
    //       label: 'Docs',
    //       href: '/',
    //     },
    //     {
    //       label: 'Community Forum',
    //       href: '/',
    //     },
    //     {
    //       label: 'Professional Services',
    //       href: '/',
    //     },
    //     {
    //       label: 'Skills',
    //       href: '/',
    //     },
    //     {
    //       label: 'Status',
    //       href: '/',
    //     },
    //   ],
    // },
    // {
    //   title: 'Company',
    //   links: [
    //     {
    //       label: 'About',
    //       href: '/',
    //     },
    //     {
    //       label: 'Blog',
    //       href: '/blog',
    //     },
    //     {
    //       label: 'Careers',
    //       href: '/',
    //     },
    //     {
    //       label: 'Press',
    //       href: '/',
    //     },
    //     {
    //       label: 'Inclusion',
    //       href: '/',
    //     },
    //     {
    //       label: 'Social Impact',
    //       href: '/',
    //     },
    //     {
    //       label: 'Shop',
    //       href: '/',
    //     },
    //   ],
    // },
  ],
  socials: [
    { label: 'Twitter', icon: IconBrandTwitter, href: '#', code: 'twitter' },
    { label: 'Instagram', icon: IconBrandInstagram, href: '#', code: 'instagram' },
    { label: 'Facebook', icon: IconBrandFacebook, href: '#', code: 'facebook' },
    { label: 'RSS', icon: IconRss, href: '#', code: 'rss' },
  ],
  footNote: (
    <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm">
      Copyright © {new Date().getFullYear()}
    </div>
  ),
};

