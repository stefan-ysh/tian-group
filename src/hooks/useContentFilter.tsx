import { useState, useMemo, useCallback } from 'react';

interface UseContentFilterOptions<T> {
  // 初始过滤条件
  initialFilters?: Record<string, any>;
  // 用于搜索的字段
  searchFields?: (keyof T)[];
  // 每页显示的数量，默认为7
  initialItemsPerPage?: number;
  // 初始页码
  initialPage?: number;
}

interface ContentFilterResult<T> {
  // 过滤后的项目
  filteredItems: T[];
  // 当前可见的项目
  visibleItems: T[];
  // 当前页码
  currentPage: number;
  // 每页显示数量
  itemsPerPage: number;
  // 总页数
  totalPages: number;
  // 是否有下一页
  hasMore: boolean;
  // 搜索文本
  searchQuery: string;
  // 当前过滤条件
  filters: Record<string, any>;
  // 设置搜索文本
  setSearchQuery: (query: string) => void;
  // 设置过滤条件
  setFilter: (key: string, value: any) => void;
  // 重置所有过滤条件
  resetFilters: () => void;
  // 加载更多内容
  loadMore: () => void;
  // 设置当前页
  setCurrentPage: (page: number) => void;
  // 检查某个过滤键是否有值
  hasActiveFilter: (key: string) => boolean;
}

/**
 * 内容过滤和分页的通用Hook
 * @param items 要过滤的项目数组
 * @param options 配置选项
 */
export function useContentFilter<T extends Record<string, any>>(
  items: T[],
  options: UseContentFilterOptions<T> = {}
): ContentFilterResult<T> {
  const {
    initialFilters = {},
    searchFields = [],
    initialItemsPerPage = 7,
    initialPage = 1
  } = options;

  // 状态管理
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // 过滤项目
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 应用过滤条件
      for (const [key, value] of Object.entries(filters)) {
        if (value !== null && value !== undefined && value !== '') {
          if (item[key] !== value) {
            return false;
          }
        }
      }
      
      // 应用搜索
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        
        // 如果指定了搜索字段，只在这些字段中搜索
        if (searchFields.length > 0) {
          return searchFields.some(field => {
            const fieldValue = item[field];
            if (fieldValue === null || fieldValue === undefined) return false;
            
            // 对数组类型的字段进行特殊处理
            if (Array.isArray(fieldValue)) {
              return fieldValue.some((val: unknown) => {
                if (typeof val === 'object' && val !== null) {
                  // 对于对象数组（如作者数组），搜索对象的所有值
                  return Object.values(val).some(
                    subVal => typeof subVal === 'string' && subVal.toLowerCase().includes(query)
                  );
                }
                return String(val).toLowerCase().includes(query);
              });
            }
            
            // 对于普通字段，直接转换为字符串并搜索
            return String(fieldValue).toLowerCase().includes(query);
          });
        } else {
          // 如果没有指定搜索字段，搜索所有字段
          return Object.values(item).some(value => {
            if (value === null || value === undefined) return false;
            
            if (Array.isArray(value)) {
              return value.some((val: unknown) => {
                if (typeof val === 'object' && val !== null) {
                  return Object.values(val).some(
                    subVal => typeof subVal === 'string' && subVal.toLowerCase().includes(query)
                  );
                }
                return String(val).toLowerCase().includes(query);
              });
            }
            
            return String(value).toLowerCase().includes(query);
          });
        }
      }
      
      return true;
    });
  }, [items, filters, searchQuery, searchFields]);

  // 计算当前可见项
  const visibleItems = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, currentPage, itemsPerPage]);

  // 计算总页数
  const totalPages = useMemo(() => {
    return Math.ceil(filteredItems.length / itemsPerPage);
  }, [filteredItems.length, itemsPerPage]);

  // 是否有更多内容可加载
  const hasMore = useMemo(() => {
    return filteredItems.length > visibleItems.length;
  }, [filteredItems.length, visibleItems.length]);

  // 设置特定过滤器
  const setFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // 重置到第一页
  }, []);

  // 重置所有过滤器
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSearchQuery('');
    setCurrentPage(1);
  }, [initialFilters]);

  // 加载更多内容
  const loadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  // 检查过滤器是否激活
  const hasActiveFilter = useCallback(
    (key: string) => {
      const value = filters[key];
      return value !== null && value !== undefined && value !== '';
    },
    [filters]
  );

  return {
    filteredItems,
    visibleItems,
    currentPage,
    itemsPerPage,
    totalPages,
    hasMore,
    searchQuery,
    filters,
    setSearchQuery,
    setFilter,
    resetFilters,
    loadMore,
    setCurrentPage,
    hasActiveFilter
  };
} 