import matter from 'gray-matter';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  seatsRemaining?: number;
  attendeesCount?: number;
}

export interface Season {
  id: string;
  number: string;
  title: string;
  goal: string;
  outputs: string[];
  image: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tips?: {
    title: string;
    content: string;
    image: string;
  };
}

export const events: Event[] = [
  {
    id: '1',
    title: '隐私护航：个人数据资产化探讨',
    description: '在万物互联的今天，个人数据正成为核心资产。本次研讨会将邀请法学专家与技术大咖，深度剖析数据主权。',
    date: '2024.05.20',
    time: '14:00 - 17:00',
    location: '上海市徐汇区数字创新港',
    category: '主题研讨会',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtMdH0kfsdnJBhTUs5lYHUYWOY5GL7P0RVarvbAgCzRRCyXjHTrKHgMMvZVfAenaJmbIFHvvj5PYa88lk3jrPLIjMSJ0IEIOU1Slr4XsM7WDDu7v1etODCXWfxGQAG33MxlEgMeaQO-DYmWPIO3p2OXXVZwY3fYgIInGMk4IIY9fA9gyCYr-O90IQHqnZboGRGvSEWlk1ytI7x5-2d7mP174T1RjpwpmTF9PQCwFC86W9-D3t77nM0zhN1fr9JiTaFiFrMBUomOwi2'
  },
  {
    id: '2',
    title: '数字身份自托管实战',
    description: '手把手教你建立安全的数字主权，掌握密钥管理的艺术。',
    date: '2024.06.01',
    time: '10:00 - 16:00',
    location: '线上工作坊',
    category: '工作坊',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxhWiauLKP8j2urPkX41X6J4WomAaslJjH-f1jKo7wrTP0VlEgyRgGT9gx31_g4fUxghpb2v2UNyfrutEnWziqeqOPjcT7ROPs-j9AJn57Jmv4OCQMnzNes7WdUP2rphMdAE4CZTaE3L56Vsk8g3qxtCEQSX3YLLBBP51BSrNYpUye5anQvZN-xb8vIwYZHGQVx_NOypd0vTa7sY8nLODpESURRK09SMarvM41YS4m3fZXWh9UXO7OkWpWBTNqv4RsQs5Lx8coSc-q'
  },
  {
    id: '3',
    title: '算法中立与透明度调研',
    description: '在线参与共同探讨算法如何影响我们的日常决策及其背后的权利机制。',
    date: '2024.06.15',
    time: '19:00 - 21:00',
    location: '腾讯会议',
    category: '线上沙龙',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7QsOE3vo_h1BV0REYM_zHwUT1lgnAFUNlTKELT4W51oeZs6KWDyuyqYZ0UzI9YwQPZuHpT3GVDhHPohlVW_C4RGZzVnYbbZhBZRuccD4q3LDuaob_MzagDGfGuhGBgmDq6xWc8XUD7GHqq9QQBRq1cudhlks3NdLZ5kLZEjF9Ihgm1jbg4M3StJkDCZn2Svg5xkysUY7X7Iu6Zg0EEjVAev2qKvSMT9UGV8rlcdGnJ4PI3tUqvPmYlUQWa_FgsbTeIZH02DMLfBxz',
    attendeesCount: 42
  },
  {
    id: '4',
    title: '城市漫游：寻找数字遗址',
    description: '一场结合线下实地考察与线上VR体验的独特旅程，反思互联网基建的演变。',
    date: '2024.07.10',
    time: '09:00 - 18:00',
    location: '北京·798艺术区',
    category: '实地考察',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAS7y3NweE3LwF2v6g-LF6o-tNRHxPN2tqQdTmiVHbwanb_jRrsdOEKpIgX9AhxoDY03P8SI5CLhSYL_v8Y5NXJ1fjJvkpLQmFg4TFae56BGIsEt0ImWOFkhh8Dc3vUWnqAkp9vW_ilR24d50XyGx_UCK22CgP4TcVltIEC90sPY5zmn1hJxt3jpqAoy7PlbNew347YEhqHwuM15UhU-kbmul9Eyi4ZmSNf3GnQltyKA5nUdAY-KNchgfn0sxVONi4gRR33YWCfbmV',
    seatsRemaining: 8
  }
];

export const seasons: Season[] = [
  {
    id: 's1',
    number: 'Season 01',
    title: '隐私卫士行动',
    goal: '提升个人敏感信息的自我保护意识，拒绝过度索权。',
    outputs: ['《APP授权黑名单手册》', '隐私防护工具包 v1.0'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxhWiauLKP8j2urPkX41X6J4WomAaslJjH-f1jKo7wrTP0VlEgyRgGT9gx31_g4fUxghpb2v2UNyfrutEnWziqeqOPjcT7ROPs-j9AJn57Jmv4OCQMnzNes7WdUP2rphMdAE4CZTaE3L56Vsk8g3qxtCEQSX3YLLBBP51BSrNYpUye5anQvZN-xb8vIwYZHGQVx_NOypd0vTa7sY8nLODpESURRK09SMarvM41YS4m3fZXWh9UXO7OkWpWBTNqv4RsQs5Lx8coSc-q',
    icon: 'lock_person',
    color: 'primary'
  },
  {
    id: 's2',
    number: 'Season 02',
    title: '数据所有权归还',
    goal: '探讨用户生产内容的数字化价值及其归属权。',
    outputs: ['《个人数据价值白皮书》'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCevAfNBUio6ujZdtm4-pegXV5-1USs5AJgQy0Dri3-CZCkNdfFit3onMeJVvMHOAz7s2OIosaEBBRxmp3T4Hj3z-BeaRN8TGbg8DyY5KrnkecekOWk5WgrPrUM0bgtb2ewWJ9-S7RSjVC1mFc2ANNtRtXu0NVrnn06oUWAYND3zQSZ76KqXu7HsUtLwCuIl4rxGt16QtZxK9F2rmU5DHrxy6mxlubshsWAohKOwvxWI4lhbIaGIpdmmBetNmR57aiNd0BYe3Ch6WdM',
    icon: 'dataset',
    color: 'tertiary'
  },
  {
    id: 's3',
    number: 'Season 03',
    title: '算法透明度实验',
    goal: '拆解推荐系统逻辑，赋予用户"打破信息茧房"的工具。',
    outputs: ['开源"反算法"插件工具'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7QsOE3vo_h1BV0REYM_zHwUT1lgnAFUNlTKELT4W51oeZs6KWDyuyqYZ0UzI9YwQPZuHpT3GVDhHPohlVW_C4RGZzVnYbbZhBZRuccD4q3LDuaob_MzagDGfGuhGBgmDq6xWc8XUD7GHqq9QQBRq1cudhlks3NdLZ5kLZEjF9Ihgm1jbg4M3StJkDCZn2Svg5xkysUY7X7Iu6Zg0EEjVAev2qKvSMT9UGV8rlcdGnJ4PI3tUqvPmYlUQWa_FgsbTeIZH02DMLfBxz',
    icon: 'code',
    color: 'secondary'
  },
  {
    id: 's4',
    number: 'Season 04',
    title: '数字遗忘权倡议',
    goal: '建立科学的互联网"撤回"机制，保护青少年的数字化成长轨迹。',
    outputs: ['《数字遗忘权实践指南》', '年度"被遗忘权"社会调研报告'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu-xDR0xFQUm8ppFGitKoUpUgpkzZNDrAjAJNCReg4F1cg4tm8Z5onnrIS9CurFHs2-gYIVfz_8f0Plm62QsEgQvRw6vXqdescv9En3yXscrIvwkLRQyIybRSJQAFE89XLdgMFYMjLUocLDQyNYwUGXQk-8lkv-t5S0gAItlY7N7IOKgsNoHXkVtUfL9Lv33j8ND2NwN2rW_TicnLACFDxToNQgHoUCmw8SfTzqWflQaST5zKN7RZOYU8CjHWyq1uOYefOdOwQBhrd',
    icon: 'health_and_safety',
    color: 'primary'
  }
];

function parseArticles(): Article[] {
  try {
    const articleModules = import.meta.glob('/content/articles/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
    return Object.values(articleModules).map((raw) => {
      const { data, content } = matter(raw as string);
      return {
        ...(data as Partial<Article>),
        content: content.trim(),
      } as Article;
    }).sort((a, b) => a.id.localeCompare(b.id));
  } catch (e) {
    console.error('Failed to load articles from Markdown files:', e);
    return [
      {
        id: '1',
        title: '如何保护您的数字足迹：从被动防御到主动管理',
        excerpt: '在数字时代，我们每走一步都会留下痕迹。从搜索引擎的查询到社交媒体的点击，这些"足迹"构成了我们的数字身份。',
        category: '隐私安全',
        readTime: '8 分钟',
        author: '数字权利研究院',
        date: '2024年10月24日',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDadHEKh6p6PoGkhhCflMSge5X1rAqnNHW1IuXBlMhY5g_nkkmkSHMIZ-U3OydX6sGVEmxOxi0TU_j4ZeYiV09bWvSsPjrOuMjpKrvlQ3OtKbWPgQjSXw0JCS6lMq8JMBRS8SCDVatXE6pelBEBtp2vS6KuBI1DjJi8QW_dBuiutWRrLGy-jkHkwyylY2wRz9a5mPa_nNaXgqIqt5OT25RrpdMPYLXPZLIrUK28bKyKE-NbsQ7Kzz8aAmrdpsdLesr_VGAz50eBup87',
        tips: {
          title: '定期"断舍离"',
          content: '像清理衣柜一样，每三个月注销一次不再使用的App。不仅节省空间，更能切断数据泄露源。',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGjVDZ9QS8p_Zx0E2zeUf2SsBqtF1i3XwYtyK_2Sj-UstS1aZ3sOkNeEX7yPnJFyVwrkawExF51buL3acHvZH9CPPApWGBRBuGU3uEbZn1RcDmii5G5WB9roL8pguWZ1UMdiNZXAL5FGS99PzdeMdSr671bFobMxAvueb54T6DifgG-Voqx05Y4p5IW6SntC6ysPixtq-PPuU2RPttk5ogW5i8B_fw4YW1y_0gH98hDu4vqzhzPuMeo700Er2taN1h8rt0DzZoZPSu'
        },
        content: `
在数字时代，我们每走一步都会留下痕迹。从搜索引擎的查询到社交媒体的点击，这些"足迹"构成了我们的数字身份。然而，你是否曾想过，谁在掌握这些数据？

## 理解你的数字"影子"

数字足迹分为"主动足迹"和"被动足迹"。主动足迹是你主动分享的内容，如社交媒体动态、发送的邮件；而被动足迹则是你在不知情的情况下产生的痕迹，比如网站通过 Cookie 记录的浏览行为、移动基站捕捉的位置信息。

这些数据不仅仅是零碎的片段。通过大数据分析和人工智能算法，这些信息可以被拼接成一幅精准的个人肖像。从被动地接受平台的隐私协议，到主动地控制自己的数字边界，这是每个数字公民必须完成的转变。

## 从"我有隐私吗"到"我要控制权"

大多数用户的被动防御策略仅限于"不点开垃圾链接"或"使用强密码"。但在现代网络环境下，这远远不够。主动管理意味着你需要深入到系统的权限设置中，去审视每一个开关背后的逻辑。

例如，你是否检查过智能手机中的"定位服务"？许多 App 并不需要全天候获取你的位置，但它们往往默认开启了这一权限。主动关闭这些非必要的权限，就是收回数字权利的第一步。

## 建立个人数字防火墙

除了日常操作，我们还可以利用专业的工具来增强我们的防御。使用注重隐私的浏览器、开启端到端加密的通讯软件、以及采用去中心化的身份验证方案，都是构建个人数字防火墙的有效手段。

记住，隐私并不是为了隐藏什么，而是为了保护你作为独立个体的尊严和自主权。
    `
      }
    ];
  }
}

export const articles: Article[] = parseArticles();

export function getEventById(id: string): Event | undefined {
  return events.find(e => e.id === id);
}

export function getSeasonById(id: string): Season | undefined {
  return seasons.find(s => s.id === id);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}
