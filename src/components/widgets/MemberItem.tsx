'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

interface MemberItemProps {
  name: string;
  slug: string;
  avatar: string;
  position: string;
}

const placeholderImage = 'https://placehold.co/200x200';

export const MemberItem = ({ name, slug, avatar, position }: MemberItemProps) => {
  const router = useRouter();
  const t = useTranslations('Member.Position');

  return (
    <div key={slug} className="group flex flex-col items-center">
      <div 
        onClick={() => router.push(`/members/${slug}`)}
        className="cursor-pointer flex flex-col items-center gap-3 w-full"
      >
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-orange-500 p-0.5 hover:scale-105 transition-transform duration-300 bg-white">
          <NextImage
            width={200}
            height={200}
            alt={name}
            src={`${avatar}`}
            placeholder='blur'
            blurDataURL={placeholderImage}
            loading='lazy'
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-lg font-bold text-purple-900 dark:text-purple-300 group-hover:text-amber-600 transition-colors">
            {name}
          </h2>
          <span className="text-sm text-gray-500 font-medium">
             {t(position)}
          </span>
        </div>
      </div>
    </div>
  );
};
