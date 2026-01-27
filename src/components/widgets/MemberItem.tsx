'use client';
import React from 'react';
import { Card } from '@heroui/react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface MemberItemProps {
  name: string;
  slug: string;
  avatar: string;
  position: string;
  joined_year?: string;
  leave_year?: string;
  showAvatar?: boolean;
}

const placeholderImage = 'https://placehold.co/200x200';

export const MemberItem = ({ name, slug, avatar, position, joined_year, leave_year, showAvatar = true }: MemberItemProps) => {
  const router = useRouter();
  const t = useTranslations('Member.Position');
  const locale = useLocale();

  return (
    <div key={slug} className="group flex flex-col items-center">
      <div 
        onClick={() => router.push(`/members/${slug}`)}
        className="cursor-pointer flex flex-col items-center gap-3 w-full"
      >
        {showAvatar && (
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-[3px] border-orange-500 p-0.5 hover:scale-105 transition-transform duration-300 bg-white shadow-sm">
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
        )}
        
        <div className={`flex flex-col items-center ${showAvatar ? 'gap-1' : 'gap-0 pb-2 border-b border-gray-100 dark:border-gray-800 w-full hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-lg p-2 transition-colors'}`}>
          <h2 className={`${showAvatar ? 'text-lg font-bold text-purple-900 dark:text-purple-300' : 'text-base font-semibold text-gray-700 dark:text-gray-400'} group-hover:text-amber-600 transition-colors`}>
            {name}
          </h2>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 font-medium text-center">
              {t(position)}
            </span>
            {leave_year && (
              <span className="text-xs text-gray-400 mt-0.5">
                {joined_year ? `${joined_year} - ${leave_year}` : leave_year}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
