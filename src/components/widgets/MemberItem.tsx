'use client';
import React from 'react';
import { Chip, Card } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import NextImage from 'next/image';
interface MemberItemProps {
  name: string;
  slug: string;
  avatar: string;
  position: string;
}

export const MemberItem = ({ name, slug, avatar, position }: MemberItemProps) => {
  const router = useRouter();

  return (
    <Card key={slug} className="mx-auto w-4/5 sm:w-full flex flex-col overflow-hidden rounded-xl shadow-lg p-2">
      <div
        onClick={() => {
          router.push(`${slug}`);
        }}
        className="flex flex-col items-center justify-center"
      >
        <NextImage
          width={200}
          height={200}
          alt={name}
          src={`${avatar}`}
          loading='lazy'
          className="w-full h-full md:w-[300px] md:h-[300px] p-0 sm:p-1 md:p-2 !object-cover rounded-full"
        />
        <div className="w-full flex justify-around items-center text-xs mt-2">
          <Chip color="warning" variant="flat" size='sm'>
            {position}
          </Chip>
          <h2 className="font-bold whitespace-nowrap">{name}</h2>
        </div>
      </div>
    </Card>
  );
};
