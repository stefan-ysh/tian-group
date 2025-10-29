/**
 * 处理 markdown 内容的辅助函数
 * 移除常见的 Markdown 格式标记，并限制内容长度
 */
export const processMarkdownContent = (markdown: string, maxLength: number = 8000): string => {
  if (!markdown) {
    console.error('处理 markdown 内容时收到空值');
    return '';
  }

  console.log(`开始处理 markdown 内容, 原始长度: ${markdown.length}字符`);

  // 移除 markdown 中的常见格式标记，简化内容
  let processedContent = markdown
    // 移除 REFERENCES 部分（通常在文章末尾）
    .split('## REFERENCES')[0]
    .split('## References')[0]
    .split('## 参考文献')[0]
    // 移除标题标记
    .replace(/#{1,6}\s/g, '')
    // 移除粗体
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    // 移除斜体
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // 移除删除线
    .replace(/~~(.*?)~~/g, '$1')
    // 提取代码块内容
    .replace(/`{3}.*?\n([\s\S]*?)`{3}/g, '$1')
    // 移除行内代码标记
    .replace(/`([^`]+)`/g, '$1')
    // 提取链接文本
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // 提取图片描述
    .replace(/!\[(.*?)\]\(.*?\)/g, '$1')
    // 移除HTML标签
    .replace(/<[^>]*>/g, '')
    // 减少多余空行
    .replace(/\n{3,}/g, '\n\n')
    // 移除首尾空白
    .trim();

  // 限制内容长度
  if (processedContent.length > maxLength) {
    console.log(`内容超过最大长度 ${maxLength}，进行截断`);
    processedContent = processedContent.substring(0, maxLength) + '...';
  }

  console.log(`处理后的内容长度: ${processedContent.length}字符`);
  return processedContent;
};

/**
 * 验证内容是否有效
 */
export const validateContent = (content: any, minLength: number = 10): boolean => {
  if (!content) {
    console.error('内容验证失败: 内容为空');
    return false;
  }

  if (typeof content !== 'string') {
    console.error(`内容验证失败: 类型错误，预期 string，实际 ${typeof content}`);
    return false;
  }

  const trimmedContent = content.trim();
  if (trimmedContent === '') {
    console.error('内容验证失败: 内容为空字符串');
    return false;
  }

  if (trimmedContent.length < minLength) {
    console.error(`内容验证失败: 内容太短 (${trimmedContent.length} < ${minLength})`);
    return false;
  }

  return true;
};

/**
 * 清理和标准化文本内容
 */
export const cleanText = (text: string): string => {
  return text
    .replace(/\r\n/g, '\n') // 统一换行符
    .replace(/\t/g, '    ') // 制表符转空格
    .replace(/\u00a0/g, ' ') // 不间断空格转普通空格
    .replace(/\s+$/gm, '') // 移除行尾空格
    .replace(/\n{4,}/g, '\n\n\n') // 最多保留3个连续换行
    .trim();
};
