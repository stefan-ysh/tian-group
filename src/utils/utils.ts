// Function to format a number in thousands (K) or millions (M) format depending on its value
export const getSuffixNumber = (number: number, digits: number = 1): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const lookupItem = lookup
    .slice()
    .reverse()
    .find((item) => number >= item.value);
  return lookupItem ? (number / lookupItem.value).toFixed(digits).replace(rx, '$1') + lookupItem.symbol : '0';
};

/**
 * 格式化日期的通用函数，不依赖于React Hooks
 * @param dateStr ISO格式的日期字符串
 * @param format 格式选项: 'short'(年+短月), 'medium'(年+月+日), 'long'(年+长月+日), 'full'(年+长月+日+时间)
 * @param locale 语言区域设置，默认为'zh-CN'
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateStr: string, format: 'short' | 'medium' | 'long' | 'full' = 'medium', locale: string = 'zh-CN'): string {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      return '';
    }
    
    switch (format) {
      case 'short':
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short'
        });
      case 'medium':
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      case 'long':
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'full':
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) + ' ' + date.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit'
        });
      default:
        return date.toLocaleDateString(locale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return '';
  }
}
