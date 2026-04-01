/**
 * 文档映射配置
 * 键：文章的 slug/ID
 * 值：飞书文档 token
 */

export const feishuDocMap: Record<string, string> = {
  // 数据受托者系列
  'data-trustee-1': 'TP3HdXIb8owmPZx1o64cFQ7PnTe',
  'data-trustee-functions': 'ML4HdV95EoRW9XxENYFcE5klnhd',
  'data-trustee-trust': 'GuMgdDU8JoSYRixo9uUckek4nVV',
  
  // 工具箱
  'toolbox-overview': 'FaVdd4PGTof7uIxGJekcSd7Inue',
  
  // 更多文档可以继续添加...
};

export interface SyncConfig {
  /** 文档 ID (slug) */
  id: string;
  /** 飞书文档 token */
  feishuToken: string;
  /** 文章分类 */
  category: string;
  /** 是否发布到首页精选 */
  featured?: boolean;
}

export const syncList: SyncConfig[] = [
  {
    id: 'data-trustee-1',
    feishuToken: 'TP3HdXIb8owmPZx1o64cFQ7PnTe',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-functions',
    feishuToken: 'ML4HdV95EoRW9XxENYFcE5klnhd',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-trust',
    feishuToken: 'GuMgdDU8JoSYRixo9uUckek4nVV',
    category: '数据受托者',
    featured: true,
  },
];
