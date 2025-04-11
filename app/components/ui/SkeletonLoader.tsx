'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
}

// 基础骨架元素
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-primary/10 rounded ${className}`}></div>
  );
}

// 新闻列表骨架屏
export function NewsSkeletonLoader() {
  return (
    <div className="py-12 text-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-primary/20 rounded mb-8"></div>
        <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="h-6 bg-primary/20 rounded w-24"></div>
                <div className="h-4 bg-primary/10 rounded w-32"></div>
              </div>
              <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 首页新闻骨架屏
export function HomeNewsSkeletonLoader() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-primary/20 rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-4">
              <div className="h-40 bg-primary/10 rounded-md mb-4"></div>
              <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-primary/10 rounded w-full mb-2"></div>
              <div className="h-4 bg-primary/10 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 出版物列表骨架屏
export function PublicationsSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse space-y-8 max-w-6xl mx-auto">
        {/* 筛选器骨架 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="h-10 w-32 bg-primary/10 rounded"></div>
          <div className="h-10 w-44 bg-primary/10 rounded"></div>
          <div className="h-10 w-36 bg-primary/10 rounded"></div>
        </div>
        
        {/* 出版物列表骨架 */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-background/80 rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4">
                <div className="h-48 bg-primary/10 rounded-md"></div>
              </div>
              <div className="w-full md:w-3/4 space-y-4">
                <div className="h-7 bg-primary/20 rounded w-3/4"></div>
                <div className="h-5 bg-primary/10 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-primary/10 rounded w-full"></div>
                  <div className="h-4 bg-primary/10 rounded w-full"></div>
                  <div className="h-4 bg-primary/10 rounded w-2/3"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-primary/15 rounded"></div>
                  <div className="h-8 w-24 bg-primary/15 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 团队成员骨架屏
export function MembersSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse max-w-6xl mx-auto">
        {/* 标题骨架 */}
        <div className="flex justify-center mb-12">
          <div className="h-8 w-48 bg-primary/20 rounded"></div>
        </div>
        
        {/* 成员卡片骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="h-40 w-40 rounded-full bg-primary/10 mb-4"></div>
                <div className="h-6 w-32 bg-primary/20 rounded mb-2"></div>
                <div className="h-4 w-24 bg-primary/10 rounded mb-4"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-primary/10 rounded w-full"></div>
                  <div className="h-4 bg-primary/10 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 学术活动骨架屏
export function ActivitiesSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse max-w-6xl mx-auto">
        {/* 标题骨架 */}
        <div className="flex justify-center mb-8">
          <div className="h-8 w-56 bg-primary/20 rounded"></div>
        </div>
        
        {/* 标签页骨架 */}
        <div className="h-12 bg-primary/5 rounded-t-lg mb-6 flex">
          <div className="h-full w-32 bg-primary/10 rounded-tl-lg"></div>
          <div className="h-full w-32 bg-primary/5 rounded-t-lg"></div>
        </div>
        
        {/* 活动列表骨架 */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-5">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <div className="h-32 bg-primary/10 rounded-md"></div>
                </div>
                <div className="w-full md:w-3/4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-primary/20 rounded"></div>
                    <div className="h-5 w-24 bg-primary/10 rounded"></div>
                  </div>
                  <div className="h-7 bg-primary/15 rounded w-3/4 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-primary/10 rounded w-full"></div>
                    <div className="h-4 bg-primary/10 rounded w-full"></div>
                    <div className="h-4 bg-primary/10 rounded w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/15"></div>
                    <div className="h-4 w-28 bg-primary/10 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 研究方向骨架屏
export function ResearchSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse max-w-6xl mx-auto">
        {/* 标题骨架 */}
        <div className="flex flex-col items-center mb-12 space-y-4">
          <div className="h-8 w-48 bg-primary/20 rounded"></div>
          <div className="h-4 w-3/4 bg-primary/10 rounded"></div>
          <div className="h-4 w-2/3 bg-primary/10 rounded"></div>
        </div>
        
        {/* 研究方向卡片骨架 */}
        <div className="space-y-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background/80 rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                  <div className="h-64 bg-primary/10 rounded-md"></div>
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="h-7 bg-primary/20 rounded w-2/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-primary/10 rounded w-full"></div>
                    <div className="h-4 bg-primary/10 rounded w-full"></div>
                    <div className="h-4 bg-primary/10 rounded w-full"></div>
                    <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                  </div>
                  <div className="pt-4">
                    <div className="h-6 bg-primary/15 rounded w-44 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-primary/10 rounded w-full"></div>
                      <div className="h-4 bg-primary/10 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 详情页骨架屏
export function DetailPageSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse max-w-4xl mx-auto">
        {/* 面包屑导航骨架 */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-primary/10 rounded"></div>
          <div className="h-4 w-4 bg-primary/10 rounded"></div>
          <div className="h-4 w-20 bg-primary/10 rounded"></div>
          <div className="h-4 w-4 bg-primary/10 rounded"></div>
          <div className="h-4 w-32 bg-primary/15 rounded"></div>
        </div>
        
        {/* 卡片骨架 */}
        <div className="bg-background/80 rounded-lg shadow-sm p-6 md:p-8">
          {/* 元数据骨架 */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="h-6 w-24 bg-primary/20 rounded"></div>
            <div className="h-6 w-32 bg-primary/10 rounded"></div>
          </div>
          
          {/* 标题骨架 */}
          <div className="h-8 bg-primary/20 rounded w-3/4 mb-6"></div>
          
          {/* 图片骨架 */}
          <div className="h-64 md:h-96 w-full bg-primary/10 rounded-md mb-8"></div>
          
          {/* 内容骨架 */}
          <div className="space-y-4 mb-8">
            <div className="h-5 bg-primary/10 rounded w-full"></div>
            <div className="h-5 bg-primary/10 rounded w-full"></div>
            <div className="h-5 bg-primary/10 rounded w-full"></div>
            <div className="h-5 bg-primary/10 rounded w-3/4"></div>
          </div>
          
          {/* 标签骨架 */}
          <div className="mt-6">
            <div className="h-4 bg-primary/10 rounded w-16 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-primary/15 rounded-full"></div>
              <div className="h-6 w-20 bg-primary/15 rounded-full"></div>
              <div className="h-6 w-24 bg-primary/15 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* 底部按钮骨架 */}
        <div className="mt-8 text-center">
          <div className="h-10 w-32 bg-primary/10 rounded-md inline-block"></div>
        </div>
      </div>
    </div>
  );
} 