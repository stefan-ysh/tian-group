import { processMarkdownContent, validateContent, cleanText } from '~/utils/markdown';
import { findPublicationsByName } from '~/utils/publications';
import { NextResponse } from 'next/server';

// 缓存机制
const summaryCache = new Map<string, { summary: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

interface SummaryRequest {
  slug?: string;
  title?: string;
  text?: string;
  sourceType?: 'title' | 'abstract' | 'markdown' | 'custom';
  contextInfo?: {
    authors?: string[];
    journal?: string;
    publishDate?: string;
  };
  locale?: string;
  stream?: boolean;
  useCache?: boolean;
}

interface Publication {
  slug: string;
  title?: string;
  content?: string;
  abstract?: string;
  authors?: string[];
  journal?: string;
  journalShort?: string;
  publishDate?: string;
  [key: string]: any;
}

// 生成缓存键
function getCacheKey(slug: string, locale: string): string {
  return `${slug}_${locale}`;
}

// 检查缓存
function checkCache(key: string): string | null {
  const cached = summaryCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`API: 从缓存中返回摘要，键: ${key}`);
    return cached.summary;
  }
  if (cached) {
    console.log(`API: 缓存已过期，删除键: ${key}`);
    summaryCache.delete(key);
  }
  return null;
}

// 清除所有缓存（用于测试）
export async function DELETE() {
  const count = summaryCache.size;
  summaryCache.clear();
  console.log(`API: 已清除所有缓存，共 ${count} 条`);
  return NextResponse.json({ message: `已清除 ${count} 条缓存` });
}

// 将结构化JSON转换为Markdown
function convertJsonToMarkdown(jsonData: any, locale: string): string {
  const isEnglish = locale === 'en';
  
  const sections = isEnglish ? {
    research_background: '## Research Background',
    methodology: '## Methodology',
    key_findings: '## Key Findings',
    contributions: '## Contributions',
    limitations: '## Limitations'
  } : {
    research_background: '## 研究背景',
    methodology: '## 研究方法',
    key_findings: '## 主要发现',
    contributions: '## 研究贡献',
    limitations: '## 局限性'
  };

  let markdown = '';

  // 研究背景
  if (jsonData.research_background) {
    markdown += `${sections.research_background}\n`;
    if (jsonData.research_background.core_problem) {
      markdown += `- ${jsonData.research_background.core_problem}\n`;
    }
    if (jsonData.research_background.objectives) {
      markdown += `- ${jsonData.research_background.objectives}\n`;
    }
    markdown += '\n';
  }

  // 研究方法
  if (jsonData.methodology) {
    markdown += `${sections.methodology}\n`;
    if (jsonData.methodology.technical_approach) {
      markdown += `- ${jsonData.methodology.technical_approach}\n`;
    }
    if (jsonData.methodology.key_methods) {
      markdown += `- ${jsonData.methodology.key_methods}\n`;
    }
    markdown += '\n';
  }

  // 主要发现
  if (jsonData.key_findings) {
    markdown += `${sections.key_findings}\n`;
    if (jsonData.key_findings.quantitative_results) {
      markdown += `- ${jsonData.key_findings.quantitative_results}\n`;
    }
    if (jsonData.key_findings.novel_discoveries) {
      markdown += `- ${jsonData.key_findings.novel_discoveries}\n`;
    }
    markdown += '\n';
  }

  // 研究贡献
  if (jsonData.contributions) {
    markdown += `${sections.contributions}\n`;
    if (jsonData.contributions.theoretical_innovation) {
      markdown += `- ${jsonData.contributions.theoretical_innovation}\n`;
    }
    if (jsonData.contributions.practical_applications) {
      markdown += `- ${jsonData.contributions.practical_applications}\n`;
    }
    markdown += '\n';
  }

  // 局限性
  if (jsonData.limitations) {
    markdown += `${sections.limitations}\n`;
    if (jsonData.limitations.methodological) {
      markdown += `- ${jsonData.limitations.methodological}\n`;
    }
    if (jsonData.limitations.external_validity) {
      markdown += `- ${jsonData.limitations.external_validity}\n`;
    }
  }

  return markdown.trim();
}

// 保存到缓存
function saveToCache(key: string, summary: string): void {
  summaryCache.set(key, {
    summary,
    timestamp: Date.now(),
  });
  console.log(`API: 保存摘要到缓存，键: ${key}`);
}

/**
 * API 端点用于生成出版物的 AI 摘要
 */
export async function POST(request: Request) {
  try {
    const {
      slug,
      title,
      text,
      sourceType = 'custom',
      contextInfo = {},
      locale = 'zh',
      stream = false,
      useCache = true,
    } = (await request.json()) as SummaryRequest;

    // 验证请求
    if (!slug && !title && !text) {
      return NextResponse.json({ error: '需要提供 slug、title 或 text 参数' }, { status: 400 });
    }

    // 检查缓存（仅对非流式请求且有 slug）
    if (useCache && slug && !stream) {
      const cacheKey = getCacheKey(slug, locale);
      const cachedSummary = checkCache(cacheKey);
      if (cachedSummary) {
        return NextResponse.json({
          summary: cachedSummary,
          sourceType: 'cached',
          fromCache: true,
        });
      }
    }

    // 用于存储最终发送给 AI 的内容
    let content = '';
    let actualSourceType = sourceType;

    // 如果提供了 slug，尝试获取出版物内容
    if (slug) {
      try {
        console.log(`API: 尝试从 slug 获取内容: ${slug}`);
        const publication = (await findPublicationsByName(slug)) as Publication;

        if (publication && publication.content) {
          console.log(`API: 成功获取内容，长度: ${publication.content.length}`);
          content = processMarkdownContent(publication.content);
          actualSourceType = 'markdown';
        } else if (publication && publication.abstract) {
          console.log(`API: 使用摘要作为回退内容`);
          content = publication.abstract;
          actualSourceType = 'abstract';
        } else if (publication && publication.title) {
          console.log(`API: 只能使用标题`);
          content = `论文标题: ${publication.title}`;

          // 添加上下文信息
          if (publication.authors && publication.authors.length > 0) {
            content += `\n作者: ${publication.authors.join(', ')}`;
          }
          if (publication.journal) {
            content += `\n期刊: ${publication.journal}`;
          }
          if (publication.publishDate) {
            content += `\n发布日期: ${publication.publishDate}`;
          }

          actualSourceType = 'title';
        } else {
          console.log(`API: 未找到出版物或内容为空`);
        }
      } catch (error) {
        console.error(`API: 根据 slug 获取内容时出错:`, error);
      }
    }

    // 如果没有从 slug 获取到内容，使用提供的 text 或 title
    if (!content) {
      if (text) {
        console.log(`API: 使用提供的文本内容，长度: ${text.length}`);
        content = text;
        actualSourceType = sourceType;
      } else if (title) {
        console.log(`API: 只能使用标题: ${title}`);
        content = `论文标题: ${title}`;

        // 添加上下文信息
        if (contextInfo.authors && contextInfo.authors.length > 0) {
          content += `\n作者: ${contextInfo.authors.join(', ')}`;
        }
        if (contextInfo.journal) {
          content += `\n期刊: ${contextInfo.journal}`;
        }
        if (contextInfo.publishDate) {
          content += `\n发布日期: ${contextInfo.publishDate}`;
        }

        actualSourceType = 'title';
      }
    }

    if (!content) {
      return NextResponse.json({ error: '无法获取有效内容' }, { status: 400 });
    }

    // 验证内容有效性
    if (!validateContent(content)) {
      return NextResponse.json({ error: '内容验证失败' }, { status: 400 });
    }

    // 根据 locale 选择语言
    const isEnglish = locale === 'en';

    const systemPrompt = isEnglish
      ? `You are a professional academic paper analyst. Analyze the paper and provide a structured JSON response.

Output JSON with these exact fields:
{
  "research_background": {
    "core_problem": "Field's core problem",
    "objectives": "Research objectives (format: 'This study aims to...')"
  },
  "methodology": {
    "technical_approach": "Technical approaches (annotate type: ML-based/experimental/clinical)",
    "key_methods": "Key methods in plain language"
  },
  "key_findings": {
    "quantitative_results": "Quantitative results with metrics (p-values/CI when available)",
    "novel_discoveries": "Novel discoveries"
  },
  "contributions": {
    "theoretical_innovation": "Theoretical innovations (compare with existing literature)",
    "practical_applications": "Practical applications"
  },
  "limitations": {
    "methodological": "Methodological constraints",
    "external_validity": "External validity considerations"
  }
}

ABSOLUTE RULES:
1. Write ONLY in English
2. Use academic present tense
3. Output ONLY valid JSON, no other text
4. Each field must contain 2-5 bullet points worth of content
5. Explain technical terms inline
6. NO thinking process, NO meta-commentary`
      : `你是专业论文分析助手。分析论文并提供结构化JSON响应。

输出JSON包含以下精确字段：
{
  "research_background": {
    "core_problem": "领域核心问题",
    "objectives": "研究目标（格式：'本研究旨在...'）"
  },
  "methodology": {
    "technical_approach": "技术方法（标注类型：基于机器学习/实验研究/临床试验等）",
    "key_methods": "关键方法的通俗解释"
  },
  "key_findings": {
    "quantitative_results": "定量结果（含统计指标，如p值/置信区间）",
    "novel_discoveries": "创新性发现"
  },
  "contributions": {
    "theoretical_innovation": "理论创新（对比现有文献）",
    "practical_applications": "实际应用价值"
  },
  "limitations": {
    "methodological": "方法学局限",
    "external_validity": "外部效度考虑"
  }
}

绝对规则：
1. 完全使用中文，严禁中英混杂
2. 只输出有效JSON，不要其他任何文字
3. 每个字段包含2-5个要点的内容
4. 专业术语首次出现标注英文（格式：中文术语(English Term)）
5. 学术化书面语，禁止"笔者认为"等主观表述
6. 严禁思考过程、元评论`;

    console.log(`API: 系统提示: ${systemPrompt}`);
    
    // 定义结构化输出 JSON Schema
    const responseSchema = {
      type: 'object',
      properties: {
        research_background: {
          type: 'object',
          properties: {
            core_problem: { type: 'string', description: '领域核心问题' },
            objectives: { type: 'string', description: '研究目标（格式："本研究旨在..."）' }
          },
          required: ['core_problem', 'objectives']
        },
        methodology: {
          type: 'object',
          properties: {
            technical_approach: { type: 'string', description: '技术方法（标注类型）' },
            key_methods: { type: 'string', description: '关键方法的通俗解释' }
          },
          required: ['technical_approach', 'key_methods']
        },
        key_findings: {
          type: 'object',
          properties: {
            quantitative_results: { type: 'string', description: '定量结果（含统计指标）' },
            novel_discoveries: { type: 'string', description: '创新性发现' }
          },
          required: ['quantitative_results', 'novel_discoveries']
        },
        contributions: {
          type: 'object',
          properties: {
            theoretical_innovation: { type: 'string', description: '理论创新（对比现有文献）' },
            practical_applications: { type: 'string', description: '实际应用价值' }
          },
          required: ['theoretical_innovation', 'practical_applications']
        },
        limitations: {
          type: 'object',
          properties: {
            methodological: { type: 'string', description: '方法学局限' },
            external_validity: { type: 'string', description: '外部效度考虑' }
          },
          required: ['methodological', 'external_validity']
        }
      },
      required: ['research_background', 'methodology', 'key_findings', 'contributions', 'limitations']
    };
    
    // 准备 AI 请求
    const message = {
      model: process.env.NEXT_PUBLIC_MODEL,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: isEnglish 
            ? `Paper content:\n\n${content}` 
            : `论文内容：\n\n${content}`,
        },
      ],
      stream,
      max_tokens: 4096,
      stop: null,
      temperature: 0.3,
      top_p: 0.8,
      frequency_penalty: 0.3,
      presence_penalty: 0.1,
      n: 1,
      response_format: { 
        type: 'json_schema',
        json_schema: {
          name: 'paper_analysis',
          strict: true,
          schema: responseSchema
        }
      },
    };

    // 调用 AI API
    console.log(`API: 正在请求 AI 摘要，内容类型: ${actualSourceType}, 内容长度: ${content.length}, 流模式: ${stream}`);

    const baseUrl = process.env.NEXT_PUBLIC_SILICONFLOW_BASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SILICONFLOW_API;

    if (!baseUrl || !apiKey) {
      console.error('API: 缺少必要的环境变量');
      return NextResponse.json(
        { error: '服务配置错误，请联系管理员', details: '缺少 API 配置' },
        { status: 500 }
      );
    }

    const aiResponse = await fetch(`${baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error(`API: AI 请求失败: ${aiResponse.status}`, errorText);
      return NextResponse.json({ error: `AI 请求失败: ${aiResponse.status}`, details: errorText }, { status: 502 });
    }

    // 处理流式响应
    if (stream) {
      console.log('API: 使用流式响应模式');
      // 直接将AI API的响应流传递给客户端
      const responseStream = new ReadableStream({
        async start(controller) {
          if (!aiResponse.body) {
            console.error('API: AI响应没有响应体');
            controller.close();
            return;
          }

          console.log('API: 开始处理AI响应流');
          const reader = aiResponse.body.getReader();

          try {
            // 先发送一个初始响应，确保客户端开始接收数据
            const initialData = new TextEncoder().encode('data: {"initial":true}\n\n');
            controller.enqueue(initialData);
            console.log('API: 发送初始信号');

            let fullJsonResponse = ''; // 用于收集完整JSON响应

            // 读取流数据
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                console.log('API: AI流读取完成');
                
                // 将JSON转换为Markdown
                try {
                  console.log('API: 收集到的完整JSON:', fullJsonResponse);
                  const jsonData = JSON.parse(fullJsonResponse);
                  const markdownSummary = convertJsonToMarkdown(jsonData, locale);
                  console.log('API: 转换后的Markdown长度:', markdownSummary.length);
                  
                  // 流式发送Markdown内容
                  const words = markdownSummary.split('');
                  for (const char of words) {
                    const chunk = {
                      choices: [{
                        delta: { content: char },
                        index: 0,
                        finish_reason: null
                      }]
                    };
                    const data = `data: ${JSON.stringify(chunk)}\n\n`;
                    controller.enqueue(new TextEncoder().encode(data));
                    // 小延迟以模拟流式效果
                    await new Promise(resolve => setTimeout(resolve, 5));
                  }
                  
                  // 保存到缓存
                  if (slug && useCache && markdownSummary) {
                    const cacheKey = getCacheKey(slug, locale);
                    saveToCache(cacheKey, markdownSummary);
                  }
                } catch (parseError) {
                  console.error('API: JSON解析或转换失败:', parseError);
                  const errorData = `data: ${JSON.stringify({
                    choices: [{
                      delta: { content: '解析响应失败，请重试' },
                      index: 0,
                      finish_reason: 'error'
                    }]
                  })}\n\n`;
                  controller.enqueue(new TextEncoder().encode(errorData));
                }
                
                // 发送结束信号
                const doneData = new TextEncoder().encode('data: [DONE]\n\n');
                controller.enqueue(doneData);
                controller.close();
                break;
              }

              // 收集JSON响应
              try {
                const chunk = new TextDecoder().decode(value, { stream: true });
                const lines = chunk.split('\n').filter(line => line.trim() !== '');
                for (const line of lines) {
                  if (line.startsWith('data:')) {
                    const jsonData = line.replace(/^data:[\s]?/, '').trim();
                    if (jsonData !== '[DONE]') {
                      try {
                        const parsedData = JSON.parse(jsonData);
                        if (parsedData.choices && parsedData.choices[0]) {
                          if (parsedData.choices[0].delta) {
                            const content = parsedData.choices[0].delta.content || '';
                            fullJsonResponse += content;
                          }
                        }
                      } catch (e) {
                        // 忽略解析错误
                      }
                    }
                  }
                }
              } catch (e) {
                console.error('API: 收集JSON时出错:', e);
              }
            }
          } catch (error) {
            console.error('API: 流处理错误:', error);
            // 发送错误信息给客户端
            try {
              const errorMessage = JSON.stringify({
                error: error instanceof Error ? error.message : '流处理错误',
              });
              const errorData = new TextEncoder().encode(`data: ${errorMessage}\n\n`);
              controller.enqueue(errorData);
            } catch (e) {
              console.error('API: 无法发送错误信息', e);
            }
            controller.error(error);
          }
        },
      });

      // 返回流式响应
      return new Response(responseStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no', // 防止Nginx缓冲
        },
      });
    } else {
      // 常规 JSON 响应
      const data = await aiResponse.json();

      if (!data.choices || data.choices.length === 0) {
        console.error(`API: AI 响应格式错误:`, data);
        return NextResponse.json({ error: 'AI 响应格式错误' }, { status: 502 });
      }

      const jsonResponse = data.choices[0].message.content;
      console.log(`API: 收到JSON响应:`, jsonResponse);
      
      // 将JSON转换为Markdown
      try {
        const jsonData = JSON.parse(jsonResponse);
        const summary = convertJsonToMarkdown(jsonData, locale);
        console.log(`API: 成功生成摘要，长度: ${summary.length}`);

        // 保存到缓存
        if (slug && useCache) {
          const cacheKey = getCacheKey(slug, locale);
          saveToCache(cacheKey, summary);
        }

        return NextResponse.json({
          summary,
          sourceType: actualSourceType,
          contentLength: content.length,
        });
      } catch (parseError) {
        console.error('API: JSON解析失败:', parseError);
        return NextResponse.json({ error: 'AI响应解析失败' }, { status: 502 });
      }
    }
  } catch (error) {
    console.error('API: 生成摘要时出错:', error);
    return NextResponse.json(
      { 
        error: '生成摘要时出错', 
        details: error instanceof Error ? error.message : String(error),
        stack: process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined
      },
      { status: 500 },
    );
  }
}
