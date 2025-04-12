'use server';

import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/activities');

// 内存缓存
let _activities = null;
let _cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存有效期

// Mock data for activities when no files are found
const mockActivities = [
  {
    id: 'spring-seminar-2024',
    name: '学术研讨会',
    title: '2024年春季学术研讨会',
    description: '讨论最新的研究成果和方向，邀请多位知名专家进行报告',
    avatar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
    position: 'Office',
    date: '2024-04-15',
    location: '化学学院三楼会议室',
    tags: ['meeting', 'academic'],
    content: `
## 研讨会内容

本次研讨会邀请了来自北京大学、清华大学和中科院的多位专家，围绕材料化学的最新研究成果进行深入交流和讨论。

### 主要议题

1. 新型催化材料的设计与应用
2. 能源转化与存储材料研究进展
3. 环境材料的最新发展
4. 生物医用材料的创新应用

### 参会人员

- 主持人：田甜教授
- 特邀嘉宾：李明教授（北京大学）、王华研究员（中科院）
- 研究生：张三、李四、王五等15名学生
- 本科生：高年级学生代表10名

## 会议成果

1. 达成了3项合作研究协议
2. 为学生提供了与行业专家交流的宝贵机会
3. 形成了明确的未来研究方向
    `
  },
  {
    id: 'lab-safety-training',
    name: '实验室安全培训',
    title: '2024年实验室安全与规范操作培训',
    description: '针对新加入成员的实验室安全培训和操作规范讲解',
    avatar: 'https://images.unsplash.com/photo-1562411052-105105232432?q=80&w=1000',
    position: 'Lab',
    date: '2024-03-10',
    location: '化学实验室B201',
    tags: ['training', 'safety'],
    content: `
## 培训内容

为确保实验室的安全运行和研究工作的顺利进行，本次培训对实验室安全规范和操作流程进行了全面讲解。

### 培训大纲

1. 实验室安全规章制度
2. 化学品安全存储与使用
3. 实验室常见危险源与预防
4. 紧急情况处理流程
5. 实验操作规范示范

### 参与人员

- 主讲：田甜教授、安全员王明
- 参与学生：全体研究生和本科生成员

## 培训效果

所有成员通过了安全知识测试，并能够正确演示基本的安全操作流程。
    `
  },
  {
    id: 'international-conference',
    name: '国际学术会议参会',
    title: '第12届国际材料化学大会参会报告',
    description: '研究组成员参加国际会议并作学术报告',
    avatar: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000',
    position: 'Conference Hall',
    date: '2024-02-25',
    location: '新加坡国际会议中心',
    tags: ['conference', 'academic'],
    content: `
## 会议概况

我组师生共5人参加了在新加坡举办的第12届国际材料化学大会，并作了口头报告和海报展示。

### 参会内容

1. 田甜教授作大会特邀报告《功能材料的设计与应用》
2. 博士研究生李四作口头报告《新型多孔材料的合成与表征》
3. 其他3名学生进行了海报展示

### 交流成果

1. 与来自美国、德国、日本等国家的专家建立了联系
2. 了解了领域最新研究动态和热点方向
3. 获得了大会优秀海报奖

## 后续计划

基于会议交流成果，我们将开展与2个国际研究组的合作研究，并尝试新的研究方向。
    `
  },
  {
    id: 'field-trip-2024',
    name: '企业参观学习',
    title: '2024年春季企业参观与实习',
    description: '组织学生参观化工企业，了解产业应用',
    avatar: 'https://images.unsplash.com/photo-1565689216637-094ef056b991?q=80&w=1000',
    position: 'Industry',
    date: '2024-01-20',
    location: '江苏省化工园区',
    tags: ['field trip', 'industry'],
    content: `
## 参观内容

为了加强学生对行业实践的了解，本次组织学生参观了江苏省内3家知名化工企业。

### 参观企业

1. 江苏恒瑞医药股份有限公司
2. 南京化学工业有限公司
3. 扬州化工研究院

### 参与人员

- 带队老师：田甜教授、张助理教授
- 学生：15名研究生、10名本科生

## 收获与体会

1. 学生了解了科研成果如何转化为实际应用
2. 对产业需求有了更直观的认识
3. 有3名学生获得了暑期实习机会

## 后续活动

计划在下学期继续组织企业参观活动，并邀请企业研发人员来校交流。
    `
  },
  {
    id: 'group-meeting-2024-spring-2',
    name: '组内学术讨论',
    title: '2024年春季学期第二次组会',
    description: '讨论钙钛矿太阳能电池的最新研究进展',
    avatar: 'https://images.unsplash.com/photo-1529448005898-b19fc13465b7?q=80&w=1000',
    position: 'Office',
    date: '2024-03-20',
    location: '化学学院会议室A103',
    tags: ['meeting', 'academic'],
    content: `
## 会议内容

1. 钙钛矿太阳能电池最新研究进展报告
2. 实验方案讨论与优化
3. 下一阶段研究计划制定

## 参会人员

- 教师：田甜教授
- 研究生：张三、李四、王五
- 本科生：赵六、钱七

## 会议成果

1. 解决了实验中关于钙钛矿稳定性的关键问题
2. 制定了提高电池效率的新方案
3. 安排了下周的实验计划
    `
  },
  {
    id: 'online-group-meeting',
    name: '组内学术讨论',
    title: '2024关于项目进展的临时线上组会',
    description: '讨论最新研究进展和文献分享',
    avatar: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1000',
    position: 'Academic',
    date: '2024-03-20',
    location: '线上会议',
    tags: ['meeting', 'academic'],
    content: `
## 会议内容

1. 研究进展汇报
2. 最新文献分享与讨论
3. 实验方案探讨
4. 下一阶段工作计划

## 参会人员

- 教师：田甜教授
- 研究生：张三、李四、王五
- 本科生：赵六

## 会议成果

1. 确定了新实验方案
2. 解决了实验中遇到的关键问题
3. 制定了下一步研究计划
    `
  },
];

// 加载活动数据
const load = async () => {
  try {
    // 如果缓存有效，直接返回缓存数据
    if (_activities && (Date.now() - _cacheTime < CACHE_DURATION)) {
      return _activities;
    }

    const files = fs.readdirSync(BLOG_DIR);

    if (files.length === 0) {
      // 如果没有文件，使用模拟数据并缓存
      _activities = mockActivities;
      _cacheTime = Date.now();
      return mockActivities;
    }

    const activities = await Promise.all(
      files
        .filter((filename) => filename.endsWith('.md'))
        .map(async (filename) => {
          const id = filename.replace('.md', '');
          return await findActivitiesByName(id);
        }),
    );

    // 缓存结果
    _activities = activities;
    _cacheTime = Date.now();
    
    return activities;
  } catch (error) {
    console.error('Error loading activities:', error);
    // 如果读取文件失败，使用模拟数据
    _activities = mockActivities;
    _cacheTime = Date.now();
    return mockActivities;
  }
};

/** */
export const fetchActivities = async () => {
  return await load();
};

/** */
export const findLatestActivities = async (count = 20) => {
  const activities = await fetchActivities();
  
  // 按日期排序
  return activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

/** */
export const findActivitiesByName = async (id) => {
  if (!id) return null;

  try {
    const readFile = fs.readFileSync(join(BLOG_DIR, `${id}.md`), 'utf-8');
    const { data: frontmatter, content } = matter(readFile);
    return {
      id,
      ...frontmatter,
      content,
    };
  } catch (e) {
    // 如果文件不存在，从模拟数据中查找
    const mockActivity = mockActivities.find(activity => activity.id === id);
    if (mockActivity) {
      return mockActivity;
    }
  }

  return null;
};

/** */
export const findPostsByIds = async (ids) => {
  if (!Array.isArray(ids)) return [];

  const activities = await fetchActivities();

  return ids.reduce(function (r, id) {
    activities.some(function (post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};
