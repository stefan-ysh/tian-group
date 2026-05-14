'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

interface MemberItemProps {
  name: string;
  slug: string;
  avatar: string;
  position: string;
  advisorName?: string;
  joined_year?: string;
  leave_year?: string;
  showAvatar?: boolean;
}

const placeholderImage = 'https://placehold.co/200x200';

export const MemberItem = ({
  name,
  slug,
  avatar,
  position,
  advisorName,
  joined_year,
  leave_year,
  showAvatar = true,
}: MemberItemProps) => {
  const router = useRouter();
  const t = useTranslations('Member.Position');

  return (
    <div key={slug} className="group flex flex-col items-center">
      <div
        onClick={() => router.push(`/members/${slug}`)}
        className="cursor-pointer flex flex-col items-center gap-3 w-full"
      >
        {showAvatar && (
          <div className="relative h-28 w-28 rounded-md border border-slate-200 bg-white p-1 shadow-sm transition-transform duration-300 hover:scale-[1.02] md:h-32 md:w-32 dark:border-white/10 dark:bg-slate-900">
            <NextImage
              width={200}
              height={200}
              alt={name}
              src={`${avatar}`}
              placeholder="blur"
              blurDataURL={placeholderImage}
              loading="lazy"
              sizes="(max-width: 768px) 112px, 128px"
              className="h-full w-full rounded-[0.25rem] object-cover"
            />
          </div>
        )}

        <div
          className={`flex flex-col items-center ${showAvatar ? 'gap-1' : 'gap-0 pb-2 border-b border-gray-100 dark:border-gray-800 w-full hover:bg-gray-50/50 dark:hover:bg-gray-800/50 rounded-md p-2 transition-colors'}`}
        >
          <h2
            className={`${showAvatar ? 'text-lg font-semibold text-slate-950 dark:text-white' : 'text-base font-semibold text-gray-700 dark:text-gray-400'} transition-colors group-hover:text-primary`}
          >
            {name}
          </h2>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 font-medium text-center">{t(position)}</span>
            {advisorName && (
              <span className="text-xs text-gray-400 mt-0.5 text-center">
                {t('Advisor')}: {advisorName}
              </span>
            )}
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
