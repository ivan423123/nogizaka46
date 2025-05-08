// ブログサービス - 乃木坂46メンバーのブログを取得する機能

// ブログ用CORSプロキシとAPI
const BLOG_API = 'https://api.rss2json.com/v1/api.json?rss_url=';

// メンバーブログ情報
const MEMBER_BLOGS = [
  {
    id: '12',
    name: '五百城茉央',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/mao.ioki'
  },{
    id: '13',
    name: '池田瑛紗',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/teresa.ikeda'
  },{
    id: '14',
    name: '一ノ瀬美空',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/miku.ichinose'
  },{
    id: '15',
    name: '伊藤理々杏',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/ito.riria'
  },{
    id: '18',
    name: '井上和',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/nagi.inoue'
  },{
    id: '21',
    name: '岩本蓮加',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/iwamoto.renka'
  },{
    id: '22',
    name: '梅澤美波',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/umezawa.minami'
  },{
    id: '23',
    name: '遠藤さくら',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/endo.sakura'
  },{
    id: '24',
    name: '岡本姫奈',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/hina.okamoto'
  },{
    id: '25',
    name: '小川彩',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/aya.ogawa'
  },{
    id: '27',
    name: '奥田いろは',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/iroha.okuda'
  },{
    id: '28',
    name: '賀喜遥香',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/kaki.haruka'
  },
  {
    id: '29',
    name: '金川紗耶',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/kanagawa.saya'
  },
  {
    id: '30',
    name: '川崎桜',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/sakura.kawasaki'
  },
  {
    id: '31',
    name: '久保史緒里',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/kubo.shiori'
  },
  {
    id: '32',
    name: '黒見明香',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/kuromi.haruka'
  },{
    id: '33',
    name: '佐藤楓',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/sato.kaede'
  },{
    id: '34',
    name: '佐藤璃果',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/sato.rika'
  },{
    id: '35',
    name: '柴田柚菜',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/shibata.yuna'
  },{
    id: '36',
    name: '菅原咲月',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/satsuki.sugawara'
  },{
    id: '37',
    name: '田村真佑',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/tamura.mayu'
  },{
    id: '38',
    name: '筒井あやめ',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/tsutsui.ayame'
  },{
    id: '39',
    name: '冨里奈央',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/nao.tomisato'
  },{
    id: '40',
    name: '中西アルノ',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/aruno.nakanishi'
  },{
    id: '41',
    name: '中村麗乃',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/nakamura.reno'
  },{
    id: ' 42',
    name: '林瑠奈',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/hayashi.runa'
  },{
    id: '43',
    name: '松尾美佑',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/matsuo.miyu'
  },{
    id: '44',
    name: '矢久保美緒',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/yakubo.mio'
  },{
    id: '45',
    name: '弓木奈於',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/yumiki.nao'
  },{
    id: '46',
    name: '吉田綾乃クリスティー',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/yoshida.ayanochristie'
  },{
    id: '47',
    name: '愛宕心響',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/kokone.atago'
  },{
    id: '48',
    name: '大越ひなの',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/hinano.okoshi'
  },{
    id: '49',
    name: '小津玲奈',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/reina.ozu'
  },{
    id: '50',
    name: '海邉朱莉',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/akari.kaibe'
  },{
    id: '51',
    name: '川端晃菜',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/hina.kawabata'
  },{
    id: '52',
    name: '鈴木佑捺',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/yuuna.suzuki'
  },{
    id: '53',
    name: '瀬戸口心月',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/mitsuki.setoguchi'
  },{
    id: '54',
    name: '長嶋凛桜',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/rio.nagashima'
  },{
    id: '55',
    name: '増田三莉音',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/mirine.masuda'
  },{
    id: '56',
    name: '森平麗心',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/urumi.morihira'
  },{
    id: '57',
    name: '矢田萌華',
    rssUrl: 'https://nogizaka46-blog-rss.kasper.workers.dev/moeka.yada'
  },
  // 他のメンバーも必要に応じて追加
];

// ブログを取得する関数
async function getMemberBlogs(memberId = null, limit = 5) {
  try {
    // メンバーIDが指定されていない場合はすべてのメンバーから取得
    const targetMembers = memberId && memberId !== 'all'
      ? MEMBER_BLOGS.filter(member => member.id === memberId)
      : MEMBER_BLOGS;
    
    // 各メンバーのブログを取得するPromiseの配列
    const promises = targetMembers.map(member => {
      const apiUrl = `${BLOG_API}${encodeURIComponent(member.rssUrl)}`;
      
      return fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (!data.items || data.items.length === 0) {
            return [];
          }
          
          // 各ブログ記事にメンバー情報を追加
          return data.items.map(item => {
            // サムネイル画像を取得
            let thumbnail = '';
            try {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = item.content;
              const img = tempDiv.querySelector('img');
              if (img) {
                thumbnail = img.src;
              }
            } catch (err) {
              console.warn('Error extracting thumbnail:', err);
            }
            
            // 日付をフォーマット
            const date = new Date(item.pubDate);
            const formattedDate = date.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            // テキスト抜粋を取得
            let excerpt = '';
            try {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = item.content;
              excerpt = tempDiv.textContent.trim().substring(0, 100) + '...';
            } catch (err) {
              console.warn('Error extracting excerpt:', err);
            }
            
            return {
              title: item.title,
              link: item.link,
              pubDate: formattedDate,
              excerpt: excerpt,
              thumbnail: thumbnail,
              memberId: member.id,
              memberName: member.name,
              rawDate: date // ソート用
            };
          });
        });
    });
    
    // すべてのPromiseが解決するのを待つ
    const results = await Promise.all(promises);
    
    // 結果を1つの配列にフラット化
    let allBlogs = [];
    results.forEach(blogs => {
      allBlogs = allBlogs.concat(blogs);
    });
    
    // 日付で降順にソート
    allBlogs.sort((a, b) => b.rawDate - a.rawDate);
    
    // 指定された数だけ返す
    return allBlogs.slice(0, limit);
  } catch (error) {
    console.error('Error fetching member blogs:', error);
    throw error;
  }
}

// ブログカードのHTMLを生成する関数
function generateBlogCardHtml(blog) {
  const thumbnailHtml = blog.thumbnail 
    ? `<img src="${blog.thumbnail}" alt="${blog.title}" class="blog-thumbnail">`
    : '';

  return `
    <div class="blog-card">
      ${thumbnailHtml}
      <div class="blog-content">
        <div class="blog-member">${blog.memberName}</div>
        <a href="${blog.link}" target="_blank" rel="noopener noreferrer">
          <div class="blog-title">${blog.title}</div>
        </a>
        <div class="blog-date">${blog.pubDate}</div>
        <div class="blog-excerpt">${blog.excerpt}</div>
        <a href="${blog.link}" target="_blank" rel="noopener noreferrer" class="read-more">続きを読む</a>
      </div>
    </div>
  `;
}
