'use client';
import React from 'react';
import { Chip, Card } from "@heroui/react";
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';
interface MemberItemProps {
  name: string;
  slug: string;
  avatar: string;
  position: string;
}

const placeholderImage = 'https://placehold.co/200x200'

export const MemberItem = ({ name, slug, avatar, position }: MemberItemProps) => {
  const router = useRouter();
  const t = useTranslations('Member.Position');

  return (
    <Card key={slug} className="mx-auto w-4/5 sm:w-full flex flex-col overflow-hidden rounded-xl drop-shadow-sm hover:drop-shadow-none p-5 aspect-square 
    bg-gray-50 dark:bg-gray-700/50 cursor-pointer">
      <div
        onClick={() => {
          router.push(`${slug}`);
        }}
        className="flex flex-col items-center justify-center w-full h-full"
      >
        <NextImage
          width={200}
          height={200}
          alt={name}
          src={`${avatar}`}
          placeholder='blur'
          blurDataURL={placeholderImage}
          loading='lazy'
          className="w-5/6 h-5/6 md:w-[300px] md:h-[300px] p-0 sm:p-1 md:p-2 !object-cover rounded-full bg-transparent transition-all hover:bg-secondary-100 hover:scale-90"
        />
        <div className="w-full flex justify-between items-center mt-2 gap-1">
          <Chip color="warning" variant="flat" size='sm'>
            {t(position)}
          </Chip>
          <h2 className="font-bold whitespace-nowrap">{name}</h2>
        </div>
      </div>
    </Card>
  );
};
