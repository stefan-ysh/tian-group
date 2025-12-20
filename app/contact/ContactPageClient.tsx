'use client';

import { Mail, MapPin, School, Globe, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import { useTheme } from 'next-themes';

// 声明全局 AMap 变量以解决类型错误
declare global {
  interface Window {
    AMap: any;
    _AMapSecurityConfig: {
      securityJsCode: string;
    };
  }
}

export default function ContactPageClient() {
  // 获取主题
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === 'dark' || resolvedTheme === 'dark';

  // 获取Next.js配置
  const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} };
  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API || publicRuntimeConfig.mapApiKey || '';

  const t = useTranslations('HomePage');
  const common = useTranslations('common');
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [scriptStatus, setScriptStatus] = useState<string>('loading');

  // 扬州大学的经纬度坐标
  const position = {
    lng: 119.423332,
    lat: 32.398812,
  };

  // 动态加载高德地图脚本
  useEffect(() => {
    if (!mapApiKey) {
      setMapError('Missing API key');
      console.error('Missing AMap API key');
      return;
    }

    // 检查脚本是否已存在
    if (window.AMap) {
      setScriptStatus('loaded');
      setMapLoaded(true);
      return;
    }

    setScriptStatus('loading');

    // 创建脚本元素
    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${mapApiKey}&plugin=AMap.ToolBar,AMap.Scale`;
    script.async = true;
    script.defer = true;

    // 监听脚本加载事件
    script.onload = () => {
      setScriptStatus('loaded');
      setMapLoaded(true);

      // 延迟初始化地图，确保DOM和脚本都已加载完成
      setTimeout(() => {
        initMap();
      }, 500);
    };

    script.onerror = (error) => {
      console.error('Failed to load AMap script dynamically', error);
      setScriptStatus('error');
      setMapError('Failed to load map API');
    };

    // 添加脚本到文档
    document.head.appendChild(script);

    // 清理函数
    return () => {
      // 如果脚本仍在加载中，可以选择移除它
      if (scriptStatus === 'loading') {
        document.head.removeChild(script);
      }
    };
  }, [mapApiKey]);

  // 监听路由变化，确保在导航回页面时地图正确显示
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 如果页面变为可见，且地图已加载但没有实例，则重新初始化
      if (document.visibilityState === 'visible' && window.AMap && !mapInstance) {
        setTimeout(() => initMap(), 300);
      }
    };

    // 添加页面可见性变化事件
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 组件加载时，也检查一次
    if (mapLoaded && !mapInstance) {
      setTimeout(() => initMap(), 300);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [mapLoaded, mapInstance]);

  // 初始化地图
  const initMap = () => {
    try {
      if (!mapRef.current) {
        setMapError('Map container not found');
        return;
      }

      if (!window.AMap) {
        setMapError('AMap not loaded');
        return;
      }

      // 清除之前的错误
      setMapError(null);

      // 创建地图实例
      const map = new window.AMap.Map(mapRef.current, {
        zoom: 15,
        center: [position.lng, position.lat],
        viewMode: '2D',
        mapStyle: isDark ? 'amap://styles/dark' : 'amap://styles/normal',
      });

      // 添加标记
      const marker = new window.AMap.Marker({
        position: [position.lng, position.lat],
        title: t('College'),
      });

      map.add(marker);

      // 添加控件
      map.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        // 添加工具条和比例尺
        map.addControl(new window.AMap.ToolBar());
        map.addControl(new window.AMap.Scale());
      });

      // 移除可能存在的旧按钮
      const existingButtons = document.querySelectorAll('.center-button-container');
      existingButtons.forEach((btn) => btn.remove());

      // 添加自定义回到中心点按钮
      const centerButtonContent = document.createElement('div');
      centerButtonContent.className = 'center-button';
      centerButtonContent.innerHTML = `
        <div style="
          padding: 8px; 
          background-color: white; 
          border-radius: 2px; 
          box-shadow: 0 2px 6px rgba(0,0,0,.3); 
          cursor: pointer; 
          margin-top: 8px; 
          text-align: center; 
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
        ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>`;

      centerButtonContent.onclick = () => {
        map.setCenter([position.lng, position.lat]);
        map.setZoom(15);
      };

      const centerButton = document.createElement('div');
      centerButton.className = 'center-button-container';
      centerButton.appendChild(centerButtonContent);
      centerButton.style.position = 'absolute';
      centerButton.style.bottom = '110px';
      centerButton.style.right = '10px';

      if (mapRef.current) {
        mapRef.current.appendChild(centerButton);
      }

      setMapInstance(map);
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(`Error initializing map: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  // 当主题更改时，更新地图样式
  useEffect(() => {
    if (mapInstance) {
      mapInstance.setMapStyle(isDark ? 'amap://styles/dark' : 'amap://styles/normal');
    }
  }, [isDark, mapInstance]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (mapInstance) {
        try {
          mapInstance.destroy();
        } catch (error) {
          console.error('Error destroying map:', error);
        }
      }
    };
  }, [mapInstance]);

  // 静态地图URL（备用方案）- 也支持深色模式
  const staticMapUrl = `https://restapi.amap.com/v3/staticmap?location=${position.lng},${position.lat}&zoom=15&size=750*400&markers=mid,,A:${position.lng},${position.lat}&key=${mapApiKey}${isDark ? '&style=7' : ''}`;

  return (
    <section className="mx-auto max-w-5xl p-0 md:px-6 md:py-12">
      {/* 页面标题 */}
      <div className="text-center mb-1">
        {/* 对SEO友好的隐藏标题 */}
        <h1 className="sr-only">{common('ContactUs')}</h1>
      </div>

      {/* 主要内容 */}
      <div className="bg-white/90 dark:bg-gray-800/80 rounded-2xl p-4 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        {/* 介绍部分 */}
        <div className="flex items-start mb-10">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="text-foreground/90 leading-relaxed text-lg">{common('GetInTouch')}</p>
          </div>
        </div>

        {/* 联系方式卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Contact */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <Mail className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('Email')}</h3>
            <a href="mailto:tiant91@yzu.edu.cn" className="text-foreground/90 hover:text-primary transition-colors">
              tiant91@yzu.edu.cn
            </a>
          </div>

          {/* Address */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('Address')}</h3>
            <p className="text-foreground/90">{t('Address')}</p>
          </div>

          {/* School */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl hover:shadow-md transition-all">
            <div className="bg-primary/10 w-14 h-14 flex items-center justify-center rounded-full mb-4">
              <School className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-primary">{common('College')}</h3>
            <p className="text-foreground/90">{t('College')}</p>
          </div>
        </div>

        {/* 地图 */}
        <div className="mt-10 p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-2xl font-bold text-primary">{common('Location')}</h2>
          </div>
          <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700/30 rounded-lg overflow-hidden">
            {/* 动态地图 */}
            <div ref={mapRef} className="w-full h-full relative">
              {/* 加载状态或错误信息 */}
              {(!mapInstance || mapError) && (
                <div className="w-full h-full flex flex-col items-center justify-center absolute inset-0 bg-gray-100 dark:bg-gray-700/30 z-10">
                  {mapError ? (
                    <>
                      <p className="text-red-500 mb-2">{mapError}</p>
                      {mapApiKey && (
                        <div className="w-full h-full relative">
                          <img src={staticMapUrl} alt={t('College')} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-foreground/70">{common('MapPlaceholder')}</p>
                  )}

                  <div className="mt-2 text-xs text-gray-500">
                    <p>API状态: {scriptStatus}</p>
                    {!mapApiKey && <p className="text-red-500 mt-1">请在.env.local文件中设置NEXT_PUBLIC_MAP_API。</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
