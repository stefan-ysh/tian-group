'use client';
import React from 'react';
import { Chip, Image, Card } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface ActivityItemProps {
  name: string;
  id: string;
  avatar: string;
  position: string;
}

export const ActivityItem = ({ name, id, avatar, position }: ActivityItemProps) => {
  const router = useRouter();

  return (
    <Card key={id} className="mx-auto w-4/5 sm:w-full flex flex-col overflow-hidden rounded-xl shadow-lg p-2">
      <div
        onClick={() => {
          router.push(`/activities/${id}`);
        }}
        className="flex flex-col items-center justify-center"
      >
        <Image
          isZoomed
          width={200}
          height={200}
          isBlurred
          alt={name}
          src={`${avatar}`}
          className="w-full h-full md:w-[300px] md:h-[300px] p-0 sm:p-1 md:p-2 !object-cover"
        />
        <div className="w-full flex justify-around items-center text-xs">
          <Chip color="warning" variant="flat" size='sm'>
            {position}
          </Chip>
          <h2 className="font-bold whitespace-nowrap">{name}</h2>
        </div>
      </div>
    </Card>
  );
};
