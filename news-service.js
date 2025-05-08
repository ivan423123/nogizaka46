// ニュースサービス - RSSフィードからニュース記事を取得するための機能

// CORSプロキシのURL (RSSフィードを取得するために必要)
const NEWS_CORS_PROXY = 'https://api.allorigins.win/get?url=';
const HINATAZAKA_NEWS_RSS = 'https://news.google.com/rss/search?q=%E4%B9%83%E6%9C%A8%E5%9D%8246&hl=ja&gl=JP&ceid=JP:ja';

// 日向坂46メンバーの一覧
const HINATAZAKA_MEMBERS = [
  '五百城茉央','池田瑛紗','一ノ瀬美空','伊藤理々杏','井上和','岩本蓮加',
  '梅澤美波','遠藤さくら','岡本姫奈','小川彩','奥田いろは','賀喜遥香',
  '金川紗耶','川崎桜','久保史緒里','黒見明香','佐藤楓','佐藤璃果','柴田柚菜',
  '菅原咲月','田村真佑','筒井あやめ','冨里奈央','中西アルノ','中村麗乃','林瑠奈',
  '松尾美佑','矢久保美緒','弓木奈於','吉田綾乃クリスティー','愛宕心響','大越ひなの',
  '小津玲奈','海邉朱莉','川端晃菜','鈴木佑捺','瀬戸口心月','長嶋凛桜','増田三莉音',
  '森平麗心','矢田萌華'
];

// RSSフィードからニュース記事を取得する関数
async function getRssNews(limit = 10) {
  try {
    const proxyUrl = `${NEWS_CORS_PROXY}${encodeURIComponent(HINATAZAKA_NEWS_RSS)}`;
    console.log('Fetching news from:', proxyUrl);

    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, 'text/xml');
    const items = xml.querySelectorAll('item');

    const articles = [];
    let count = 0;

     for (let i = 0; i < items.length && count < limit; i++) {
      try {
        const item = items[i];
        const title = item.querySelector('title')?.textContent;
        const link = item.querySelector('link')?.textContent;
        const pubDate = item.querySelector('pubDate')?.textContent;
        const description = item.querySelector('description')?.textContent;
        const source = item.querySelector('source')?.textContent || 'Google News';

        if (title && link) {
          // HTML文字列をエスケープする
          const cleanDescription = description
            ? description.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, ' ').trim()
            : '';

          // 日付をフォーマット
          const date = pubDate ? new Date(pubDate) : new Date();
          const formattedDate = date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          articles.push({
            title,
            link,
            pubDate: formattedDate,
            description: cleanDescription,
            source,
            rawDate: date, // ソート用
            memberTags: extractMemberTags({ title, description: cleanDescription })
          });
          
          count++;
        }
      } catch (err) {
        console.error('Error parsing news item:', err);
      }
    }

    // 日付の新しい順に並べ替え
    articles.sort((a, b) => b.rawDate - a.rawDate);

    return articles;
  } catch (error) {
    console.error('Error fetching RSS news:', error);
    throw error;
  }
}

// 記事からメンバータグを抽出
function extractMemberTags(article) {
  const tags = [];

  HINATAZAKA_MEMBERS.forEach(member => {
    if (article.title.includes(member) ||
        (article.description && article.description.includes(member))) {
      tags.push(member);
    }
  });

  return tags;
}

// メンバーでフィルタリング
function filterByMember(articles, memberName) {
  if (!memberName || memberName === 'all') {
    return articles;
  }

  return articles.filter(article =>
    article.title.includes(memberName) ||
    (article.description && article.description.includes(memberName))
  );
}

// 記事のHTMLを生成
function generateNewsCardHtml(article) {
  const tagsHtml = article.memberTags && article.memberTags.length > 0
    ? `<div class="news-tags">
        ${article.memberTags.map(tag => `<span class="news-tag">${tag}</span>`).join('')}
       </div>`
    : '';

  return `
    <div class="news-card">
      <div class="news-content">
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">
          <div class="news-title">${article.title}</div>
        </a>
        <div class="news-source">${article.source}</div>
        <div class="news-date">${article.pubDate}</div>
        ${article.description ? `<div class="news-description">${article.description}</div>` : ''}
        ${tagsHtml}
      </div>
    </div>
  `;
}