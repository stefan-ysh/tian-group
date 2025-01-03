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
      label: 'Index',
      href: '/',
    },
    {
      label: 'Research',
      href: '/research',
    },
    {
      label: 'Publications',
      href: '/publications',
    },
    {
      label: 'Member Introduction',
      href: '/members',
    },
    {
      label: 'News',
      href: '/news',
    },
    // {
    //   label: 'Terms & Conditions',
    //   href: '/terms',
    // },
    {
      label: 'Activities',
      href: '/activities',
    },
    {
      label: 'Join Us',
      href: '/joinus',
    },
    {
      label: 'Contact',
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
  title: 'T lab',
  links: [
    {
      label: 'Index',
      href: '/',
    },
    {
      label: 'Research',
      href: '/research',
    },
    {
      label: 'Publications',
      href: '/publications',
    },
    {
      label: 'Member Introduction',
      href: '/members',
    },
    {
      label: 'News',
      href: '/news',
    },
    // {
    //   label: 'Terms & Conditions',
    //   href: '/terms',
    // },
    {
      label: 'Activities',
      href: '/activities',
    },
    {
      label: 'Join Us',
      href: '/joinus',
    },
    {
      label: 'Contact',
      href: '/contact',
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
    { label: 'Twitter', icon: IconBrandTwitter, href: '#' },
    { label: 'Instagram', icon: IconBrandInstagram, href: '#' },
    { label: 'Facebook', icon: IconBrandFacebook, href: '#' },
    { label: 'RSS', icon: IconRss, href: '#' },
  ],
  footNote: (
    <div className="mr-4 rtl:mr-0 rtl:ml-4 text-sm">
      Copyright © {new Date().getFullYear()}
    </div>
  ),
};

