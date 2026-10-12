import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const slugMap = {
  'gQSUdpEm5UshuTMZaXrQuQ': 'uk-personal-data-intermediaries',
  'qUlTnAt5HXn3hAeGJELdjA': 'eu-ai-digital-rights-report',
  'jRnrW2jaJkMVjHUpRxFH0g': 'who-does-ai-agent-work-for',
  'fma5xETQSL-EQxH20xr6tw': 'ai-and-image-based-sexual-violence',
  'OMcBmXrJfgqZ38cEWDOaZg': 'ai-agent-service-entry-data-risks',
  'YcgBENgGaK9mF-hNuBLe5Q': 'why-ordinary-people-must-join-ai-governance',
  'BieliKSHKXtAwA-8h2fvIw': 'is-ai-friend-selling-you-to-advertisers',
  'qvrJxny35Tr2A9xBcpCE_Q': 'china-pipl-report-2025-insights',
  'y1P2igDyz-xQ9Gd5HVpfFQ': 'uk-data-trustees-seven-paths',
  'dQUb3YwL2yg1mKCGIbB1qw': 'xiaoqu-data-governance-guide',
  'uOERFmMY5ioXVWPCB1aHeQ': 'xiaoqu-governance',
  'C-BvHxtvgVeeS1qvCzbR7g': 'xiaoqu-sharing',
  'k3ng0dKh_65CaGlczNVNUw': 'xiaoqu-rights',
  'mK07pDXDFNJHghNgTc21TQ': 'xiaoqu-physical',
  'wOOGR_NQ1qGxexWnmCPvdw': 'xiaoqu-intro',
  'DL8JzoGwVYxKce9KsyqV9Q': 'agent-memory-sovereignty-mydata-myagent',
  'IrO8GqNisj6z7u9hVG1H-g': 'digital-rights-monthly-roundup-2026-02-03',
  'x0MJuzcKr5J9xDz2Tq3__w': 'ai-memory-privacy',
  'NNHLstNzDjpm7c5jbFnI6A': 'digital-rights-monthly-roundup-2026-01',
  'lwOiqRXdL15pujCNoMRnuQ': 'india-consent-manager-and-data-trustee',
  'or5NZbgYIg1daN_gcLLSgQ': 'digital-rights-annual-roundup-2025',
  'G65vLl-J9zT2n1F2g7DY7Q': 'guide-review-design-for-digital-rights',
  'gGNeiccYjR4l0Z77QALmfQ': 'guide-review-algorithmic-decisions-flow-data',
  'Ld0BwMEcqBAv-9jCGEGhhw': 'guide-review-information-disclosure-algorithm-era',
  'A-hC2i82P61EYfn6avLZ7w': 'when-code-meets-code-law-discourse',
  'QXfrDR14cEss3WuUmdTdJg': 'guide-review-bottom-up-digital-rights-stewardship',
  'x9zAGRYGmAWzpTHgA2H-Bw': 'community-digital-trust-wangzucheng-case',
  'JmnBuYe4u9skvMUd_nZkrw': 'design-for-digital-rights-jam-signup',
  'Uh6Ek02GQ2x0cnqnkaTtFw': 'data-justice-in-your-eyes-workshop',
  'uuS-3seT5FeU-_1x7VI8BA': 'new-agenda-of-data-justice-talk',
  'T8tfJouorL35_qp35xCOYg': 'from-security-compliance-to-trust-compliance',
  '3ftHomJcQCzZnEFGwG-Bpw': 'platform-anti-monopoly-compliance-guide',
  'tinuU5T1kmu6QVgR5Y1Xhg': 'agent-era-delegation-dilemma',
  'YrjFUiz9lw7XK2X1TiM3QQ': 'consumer-perspective-personal-data-circulation',
  'OIb9yUySSGsmhg2cTpTUBw': 'personal-data-circulation-consensus-ecupl',
  'k99miaDcmeq7neAiSoglUQ': 'fifteenth-five-year-plan-data-trustee-advice',
  't3GWhWz5dprCeUPfJf-jvw': 'solid-conference-reshaping-data-architecture',
  'CuG0w8Z4bRLYf8E1kQR42Q': 'digital-rights-season-4-plans',
  'ItSOGSjsY8kS7l7W0LdQbw': 'consumer-voice-in-data-fog-song',
  'azAeEzJ1MNUPJPqBGwI_-Q': 'consumer-voice-trustworthy-data-trustee-report',
  'i9pDLX9wUoKo7EDKd_biTA': 'trustworthy-data-trustee-online-launch-event',
  '_u_fR4DjkdHLi8TUMhfaYw': 'trustworthy-data-trustee-launch-event-signup',
  'H02YoS0F7oxbAJcZvXvncw': 'collective-data-rights-governance-framework',
  'c0p_az576-KwjSGZakpXXQ': 'does-privacy-computing-protect-consumers',
  '_PQhrjPzQJQO7u339soXkA': 'consumer-values-reshaping-data-circulation',
  'mGKmHJ4PqxQc1w45D59_gw': 'are-these-data-circulation-cases-trustworthy',
  '5rlMFyTDAoQ7QFXPm8BxTA': 'data-trustee-review-and-improve-signup',
  'bbGxoRTjIFHvNGJGw-3Ijg': 'data-trustee-trust',
  'vlIrGXRA4-GUjPZi8XYbUQ': 'is-private-funded-health-data-trust-trustworthy',
  'q8kOrH1VCvSWFNnzyI9XMg': 'workshop-what-is-trustworthy-data-trustee',
  'eq33be37nY2AnIGLa3duQA': 'uk-healthcare-data-trustee-workshop-2-review',
  'xprJTPQHJ3bMuVvfUGV-vQ': 'data-trustee-functions',
  'YLn8UD-pgPt51GkaouGLrw': 'uk-healthcare-data-trustee-workshop-2-preview',
  'qCovOfvMDo4t6HnWbbC37w': 'privacy-as-preventing-data-creation',
  'c9MiRKE3jeLRvjZ4HPU_uw': 'who-controls-your-data-co-defining-trustee',
  'JU8P3oboEoADPyka9rM0xw': 'workshop-1-data-trustee-functions-signup',
  'xr8f7gouTHpfboxyuozPDQ': 'public-ai-serving-everyone-report',
  'hfurBQcm_neVg6UpmVBLbQ': 'data-trustee-1',
  '7AhI_28-wbF_DPWbpijdbw': 'siege-of-personal-data-recording-available',
  'DgxedOYNnSMYJKgAqRFJ7w': 'early-bird-recruitment-data-trustee-consumers',
  'm0nFRUwdRi0ClPu8pyclRA': 'consumer-protection-and-personal-information-protection',
  'tuyZ7C5m9ynPqANacF0AFg': 'us-consumer-reports-data-rights-case',
  'i8D66C7Ff8VRkrVHeE2d_Q': 'seven-days-countdown-data-trustee-signup',
  'LEfU0qnu8L1_3ySw4CUs1g': 'beijing-data-exchange-auth-platform-case',
  'NZxvvqeh4PLyQYNBEqYrXQ': 'facing-data-power-individual-and-collective-governance',
  'NdAR--a5Ps78_SU88ZmT-A': 'online-talk-siege-of-personal-data',
  '_m9pXMEQXnwZD_XZK1hBmg': 'can-voluntary-data-sharing-protect-consumers',
  'h3NCxu2gFQfUpylPkvbcug': 'can-data-escrow-ensure-informed-consent',
  'iXskvsZCRzVdUgI2enhmFA': 'what-is-personal-data-trustee-system',
  '_kV6WqFCJ4VSvCYgnJ4QxA': 'who-to-entrust-personal-data-rights-signup',
  'vcKyhtzuA7OIDarnqAT5xw': 'co-create-consumer-trusted-data-trustee-preview'
};

function inferCategory(title) {
  if (/受托者|受托|数据信托|同意管理人|中介/.test(title)) return '数据受托者';
  if (/AI|Agent|智能体|算法|大模型/.test(title)) return 'AI 与隐私';
  if (/小区|社区/.test(title)) return '集体数据权利';
  if (/报告|调研|指引|反垄断/.test(title)) return '研究报告';
  if (/月度盘点|全盘点|年终收官/.test(title)) return '资讯动态';
  if (/工作坊|设计松|活动|讲座|回顾|预告|报名/.test(title)) return '社区活动';
  return '数字权利';
}

function inferType(title) {
  if (/月度盘点|全盘点/.test(title)) return 'monthly';
  if (/双周刊/.test(title)) return 'biweekly';
  return 'article';
}

function calcReadTime(text) {
  const chars = text.replace(/\s+/g, '').length;
  const minutes = Math.max(3, Math.round(chars / 350));
  return `${minutes} 分钟`;
}

async function main() {
  const archiveRoot = path.resolve('archive/普通人的数字权利存档');
  const indexFile = path.join(archiveRoot, 'index.json');
  const opinionsDir = path.resolve('src/content/opinions');

  if (!fs.existsSync(indexFile)) {
    console.error(`Index file not found: ${indexFile}`);
    process.exit(1);
  }

  const { items } = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
  console.log(`Processing ${items.length} articles from archive...`);

  let count = 0;
  for (const item of items) {
    const slug = slugMap[item.id];
    if (!slug) {
      console.warn(`No slug mapped for item id: ${item.id}`);
      continue;
    }

    const rawFilePath = path.join(archiveRoot, item.file);
    if (!fs.existsSync(rawFilePath)) {
      console.warn(`File not found: ${rawFilePath}`);
      continue;
    }

    const rawContent = fs.readFileSync(rawFilePath, 'utf8');

    // Strip frontmatter
    let body = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();

    // Strip leading h1 title if present
    body = body.replace(/^#\s+[^\n]+\n+/, '').trim();

    // Strip WeChat template header boilerplates
    body = body.replace(/^\s*!\[.*?\]\(.*?(?:0d2d9b24e3b7d4b378430d699723c000037c59f78a769ee0ddfee9fb2b21ee56)\.(?:png|jpg)\)\s*/i, '');
    body = body.replace(/^\s*@普通人\s*/, '');
    body = body.replace(/^\s*点击上方蓝字关注我们\s*/, '');
    body = body.replace(/^\s*!\[.*?\]\(.*?(?:96c61ad35ecc031fcafd69f3b27be423a33835b7d50f25abe0ba47bc49d41233)\.(?:png|jpg)\)\s*/i, '');

    // Strip WeChat template footer boilerplates
    const footerPattern = /(?:\n+\s*点个在看让更多普通人看到.*|\n+\s*!\[.*?\]\(.*?(?:1400bf360c85387e32f65b40c2d383c523718dde6e15c40685537b0d02b1ac7c|ce37c8f5c1f2e6bb8b8c99dfc62cc3d918594524c44b5c01b201eff0fdbebdfa|f14865387db238d969b71468f518b50593d2e513241c7c6a1454b675cb392dee|876aa046ae5fd1c47d0ffd0116a2a9c84ca1b8a0909e8d53481dd911d910e496|b583336ec409e72d2275e62472437e4f365f3d9fc5049d35cba9d2e7e4a0ed6b|419f0d489263b8bf2d031fceaec985bb91826da9b18de76df441a55977e4e160)\.(?:png|jpg)\).*|\n+\s*普通人的数字权利\s*|\n+\s*\[原文链接\]\(.*?\)\s*)+$/i;
    body = body.trimEnd().replace(footerPattern, '').trimEnd();

    // Strip query parameters from image filenames if any
    body = body.replace(/(\.\.\/images\/[^)\s]+)\?[^)\s]+/g, '$1');

    // Replace images
    body = body.replace(/\.\.\/images\//g, '/images/opinions/');

    // Append sync footer
    body += `\n\n---\n\n本文同步自微信公众号「普通人的数字权利」。[查看微信原文](${item.url})\n`;

    // Excerpt
    let excerpt = (item.excerpt || '').trim();
    if (!excerpt) {
      const plainText = body
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
        .replace(/[#*`_>~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      excerpt = plainText.slice(0, 130) + (plainText.length > 130 ? '...' : '');
    }

    // Date
    const beijingDate = new Date(item.created * 1000 + 8 * 3600 * 1000);
    const year = beijingDate.getUTCFullYear();
    const month = String(beijingDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(beijingDate.getUTCDate()).padStart(2, '0');
    const dateStr = `${year}年${month}月${day}日`;

    // Cover
    const coverFilename = path.basename(item.cover || '');
    const coverPath = `/images/opinions/${coverFilename}`;

    const frontmatter = {
      id: slug,
      title: item.title,
      excerpt,
      category: inferCategory(item.title),
      readTime: calcReadTime(body),
      author: '普通人的数字权利',
      date: dateStr,
      image: coverPath,
      type: inferType(item.title),
      sourceUrl: item.url,
      wechatId: item.id
    };

    // Keep special mappings
    if (slug.startsWith('xiaoqu-')) {
      frontmatter.topicId = 'collective-governance';
      frontmatter.projectId = 'xiaoqu-data';
    }
    if (slug === 'data-trustee-functions') {
      frontmatter.homeFeatured = true;
      frontmatter.homeOrder = 2;
      frontmatter.topicId = 'personal-data';
      frontmatter.projectId = 'data-trustee';
    }
    if (slug === 'data-trustee-trust') {
      frontmatter.homeFeatured = true;
      frontmatter.homeOrder = 3;
      frontmatter.topicId = 'personal-data';
      frontmatter.projectId = 'data-trustee';
    }
    if (slug === 'data-trustee-1') {
      frontmatter.topicId = 'personal-data';
      frontmatter.projectId = 'data-trustee';
    }

    const fullContent = matter.stringify(body, frontmatter);
    const targetFile = path.join(opinionsDir, `${slug}.md`);

    fs.writeFileSync(targetFile, fullContent, 'utf8');
    count++;
  }

  console.log(`Successfully generated ${count} opinion markdown files in ${opinionsDir}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
