export const feishuDocMap: Record<string, string> = {
  'data-trustee-1': process.env.DOC_TOKEN_DATA_TRUSTEE_1 || '',
  'data-trustee-functions': process.env.DOC_TOKEN_DATA_TRUSTEE_FUNCTIONS || '',
  'data-trustee-trust': process.env.DOC_TOKEN_DATA_TRUSTEE_TRUST || '',
  'toolbox-overview': process.env.DOC_TOKEN_TOOLBOX_OVERVIEW || '',
};

export interface SyncConfig {
  id: string;
  feishuToken: string;
  category: string;
  featured?: boolean;
}

export const syncList: SyncConfig[] = [
  {
    id: 'data-trustee-1',
    feishuToken: process.env.DOC_TOKEN_DATA_TRUSTEE_1 || '',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-functions',
    feishuToken: process.env.DOC_TOKEN_DATA_TRUSTEE_FUNCTIONS || '',
    category: '数据受托者',
    featured: true,
  },
  {
    id: 'data-trustee-trust',
    feishuToken: process.env.DOC_TOKEN_DATA_TRUSTEE_TRUST || '',
    category: '数据受托者',
    featured: true,
  },
];
