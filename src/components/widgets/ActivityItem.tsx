'use client';
import React from 'react';
import { Card, Image, Chip } from "@heroui/react";
import { useRouter } from 'next/navigation';

interface ActivityItemProps {
  id: string;
  name: string;
  avatar: string;
  position: string;
  title: string;
  description: string;
}

export const ActivityItem = ({ id, name, avatar, position, title, description }: ActivityItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activities/${id}`);
  };

  return (
    <Card 
      className="w-full max-w-sm cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
    >
      <div 
        onClick={handleClick}
        className="w-full h-full"
      >
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <Image
            isZoomed
            src={avatar}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Chip color="warning" variant="flat" size="sm">
              {position}
            </Chip>
            <span className="text-sm text-gray-600 dark:text-gray-400">{name}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
    </Card>
  );
};
