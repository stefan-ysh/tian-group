'use client';
import React, { useState } from 'react';
import { Card, Chip } from "@heroui/react";
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import { CalendarDays, MapPin } from 'lucide-react';

interface ActivityItemProps {
  id: string;
  name: string;
  avatar: string;
  position: string;
  title: string;
  tags?: string[];
  description: string;
  date?: string;
  formattedDate?: string;
}

const placeholderImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000';

export const ActivityItem = ({ 
  id, 
  name, 
  avatar, 
  position, 
  title, 
  description, 
  tags = [], 
  date,
  formattedDate 
}: ActivityItemProps) => {
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(avatar || placeholderImage);

  const handleClick = () => {
    router.push(`/activities/${id}`);
  };

  return (
    <Card 
      isPressable
      onPress={handleClick}
      className="group w-full overflow-hidden transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 h-full flex flex-col"
      shadow="none"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <NextImage
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(placeholderImage)}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {tags.slice(0, 2).map((tag, index) => (
            <Chip 
              key={index} 
              size="sm" 
              className="bg-purple-900/80 text-white backdrop-blur-md border-none shadow-sm h-6"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50/30 dark:from-transparent dark:to-transparent">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
            {name}
          </span>
          {(formattedDate || date) && (
            <div className="flex items-center text-xs text-gray-400 font-medium ml-auto">
              <CalendarDays className="mr-1 h-3 w-3" />
              {formattedDate || date}
            </div>
          )}
        </div>

        <h3 className="mb-2 text-xl font-bold tracking-tight text-purple-900 dark:text-purple-300 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">
          {title}
        </h3>
        
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow leading-relaxed">
          {description}
        </p>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs font-medium text-gray-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-500/70" />
            <span>{position}</span>
          </div>
          <span className="text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            查看详情 →
          </span>
        </div>
      </div>
    </Card>
  );
};
