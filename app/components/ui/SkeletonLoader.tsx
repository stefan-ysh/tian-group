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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
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
      <div className="animate-pulse space-y-8 max-w-5xl mx-auto">
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

// 团队成员骨架屏 (更新版本)
export function MembersSkeletonLoader() {
  return (
    <section className="mx-auto px-0 md:px-20 py-12 max-w-5xl">
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-4 p-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div 
              key={i} 
              className="mx-auto w-4/5 sm:w-full flex flex-col overflow-hidden rounded-xl drop-shadow-sm p-5 aspect-square 
                bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex flex-col items-center justify-center w-full h-full">
                {/* 头像骨架 */}
                <div className="w-5/6 h-5/6 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full bg-primary/5"></div>
                </div>
                
                {/* 姓名和职位骨架 */}
                <div className="w-full flex justify-between items-center mt-2 gap-1">
                  <div className="h-6 w-16 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-full"></div>
                  <div className="h-5 w-16 bg-primary/20 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 学术活动骨架屏
export function ActivitiesSkeletonLoader() {
  return (
    <div className="w-full py-8">
      <div className="animate-pulse max-w-5xl mx-auto">
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
      <div className="animate-pulse max-w-5xl mx-auto">
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

// 出版物时间线骨架屏
export function PublicationsTimelineSkeleton() {
  return (
    <div className="w-full py-4">
      <div className="container mx-auto p-0">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="relative">
              {/* 日期标记 */}
              <div className="flex items-center mb-4">
                <div className="bg-primary/20 p-2 w-32 rounded-md h-10"></div>
                <div className="flex-grow ml-4 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* 发布卡片 */}
              <div className="overflow-hidden w-full ml-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* 图片骨架 */}
                    <div className="md:col-span-3 p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50">
                      <div className="w-[180px] h-[180px] bg-primary/10 rounded-md"></div>
                    </div>

                    {/* 内容骨架 */}
                    <div className="md:col-span-9 p-4 flex flex-col justify-between">
                      <div>
                        {/* 标题骨架 */}
                        <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
                        
                        {/* 作者骨架 */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 w-20 bg-primary/10 rounded-full"></div>
                          ))}
                        </div>
                        
                        {/* 描述骨架 */}
                        <div className="space-y-2">
                          <div className="h-4 bg-primary/10 rounded w-full"></div>
                          <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                          <div className="h-4 bg-primary/10 rounded w-4/6"></div>
                        </div>
                      </div>
                      
                      {/* 底部信息骨架 */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="h-4 w-48 bg-primary/10 rounded"></div>
                        <div className="h-4 w-24 bg-primary/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 垂直时间线 */}
              {index < 4 - 1 && (
                <div className="absolute left-0 top-14 bottom-0 w-[1px] bg-primary/20" 
                     style={{ height: 'calc(100% + 2rem)' }}>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 出版物网格视图骨架屏
export function PublicationsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse bg-gray-50 dark:bg-gray-800/50 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* 图片区域 */}
            <div className="bg-primary/5 h-full min-h-[200px] flex items-center justify-center">
              <div className="w-[120px] h-[120px] bg-primary/10 rounded-md"></div>
            </div>
            
            {/* 内容区域 */}
            <div className="md:col-span-2 p-5 flex flex-col justify-between">
              {/* 日期 */}
              <div className="flex justify-between items-center mb-4">
                <div className="h-5 w-24 bg-primary/20 rounded"></div>
                <div className="h-4 w-16 bg-primary/10 rounded"></div>
              </div>
              
              {/* 标题 */}
              <div className="h-6 bg-primary/20 rounded w-3/4 mb-3"></div>
              
              {/* 期刊 */}
              <div className="h-4 bg-primary/10 rounded w-1/2 mb-8"></div>
              
              {/* 作者 */}
              <div className="flex gap-1 mb-2">
                <div className="h-5 w-20 bg-primary/10 rounded-full"></div>
                <div className="h-5 w-16 bg-primary/10 rounded-full"></div>
                <div className="h-5 w-24 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 