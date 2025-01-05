'use client';
import React from 'react';
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react';
import { Mail, School } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-full">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] mx-auto my-10"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
              <Image
                alt="Album cover"
                className="object-cover"
                height={200}
                shadow="md"
                src="https://nextui.org/images/album-cover.png"
                width="100%"
              />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <div className="flex items-end gap-2">
                    <h3 className="font-semibold text-foreground/90">Tian Tian</h3>
                    <p className="text-small text-foreground/80">Professor</p>
                  </div>

                  <h1 className="text-large font-medium mt-2">Yangzhou University</h1>
                </div>
              </div>
              <div className="w-full mt-2 text-xs">
                <div className="flex items-center gap-2 mt-4">
                  <Mail size={16} />
                  <a href="mailto:aa@aa.com">tiant91@yzu.edu.cn</a>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <School size={16} />
                  <a href="mailto:aa@aa.com">Jiangsu Province Yangzhou City Hanjiang District</a>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
