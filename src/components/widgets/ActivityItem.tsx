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
  tags?: string[];
  description: string;
}

export const ActivityItem = ({ id, name, avatar, position, title, description, tags = [] }: ActivityItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activities/${id}`);
  };

  return (
    <Card 
      className="w-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl bg-gray-50 dark:bg-gray-700/50"
      shadow="sm"
    >
      <div 
        onClick={handleClick}
        className="w-full h-full"
      >
        <div className="aspect-w-16 aspect-h-9 w-full h-[200px] relative overflow-hidden">
          <Image
            isZoomed
            src={avatar}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {tags.map((tag, index) => (
              <Chip key={index} color="warning" variant="flat" size="sm" className="capitalize">
                {tag}
              </Chip>
            ))}
            <span className="text-sm">{name}</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="line-clamp-2 mb-3">{description}</p>
        </div>
      </div>
    </Card>
  );
};
