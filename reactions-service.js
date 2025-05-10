const REACTIONS_RSS_URLS = [
    'https://sakamichijyoho46.blog.jp/index.rdf',
    'https://keyakizaka1.blog.jp/index.rdf' // 追加したRSSフィード
];
// api.rss2json.com を使用してRSSフィードをJSONに変換
const RSS2JSON_API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function fetchReactionsFromSource() {
    let allItems = [];

    try {
        const fetchPromises = REACTIONS_RSS_URLS.map(async (rssUrl) => {
            const apiUrl = RSS2JSON_API_URL + encodeURIComponent(rssUrl);
            console.log('Fetching reactions using rss2json from:', apiUrl);
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    console.error(`HTTP error for ${rssUrl}! status: ${response.status}`);
                    // 個別のフィードエラーは全体を止めずに、空配列を返すなどして継続
                    return [];
                }
                const data = await response.json();

                if (data.status !== 'ok') {
                    console.error(`Error from rss2json API for ${rssUrl}:`, data.message || 'Unknown error');
                    return [];
                }

                if (!data.items || data.items.length === 0) {
                    console.warn(`No items found in the RSS feed ${rssUrl} via rss2json.`);
                    return [];
                }

                return data.items.map(item => {
                    const title = item.title || 'タイトルなし';
                    const link = item.link || '#';
                    let thumbnailUrl = item.thumbnail || null;

                    if (!thumbnailUrl && item.content) {
                        const match = item.content.match(/<img[^>]+src="([^">]+)"/);
                        if (match && match[1]) {
                            thumbnailUrl = match[1];
                        }
                    }
                    const pubDateStr = item.pubDate;
                    let date = new Date();
                    if (pubDateStr) {
                        try {
                            date = new Date(pubDateStr);
                        } catch (e) {
                            console.warn("Invalid date format from rss2json:", pubDateStr, e);
                        }
                    }
                    const formattedDate = date.toLocaleDateString('ja-JP', {
                        year: 'numeric', month: 'long', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                    });
                    return { title, link, pubDate: formattedDate, rawDate: date, thumbnailUrl, sourceFeed: rssUrl };
                });
            } catch (error) {
                console.error(`Error fetching or processing feed ${rssUrl}:`, error);
                return []; // エラーが発生したフィードは空として扱う
            }
        });

        const results = await Promise.all(fetchPromises);
        results.forEach(items => {
            allItems = allItems.concat(items);
        });

        // 重複を削除 (link が同じものは重複とみなす)
        const uniqueItems = Array.from(new Map(allItems.map(item => [item.link, item])).values());

        return uniqueItems.sort((a, b) => b.rawDate - a.rawDate); // rawDateでソート (新しい順)
    } catch (error) {
        console.error('Error in fetchReactionsFromSource (processing multiple feeds):', error);
        return []; // エラー時は空配列を返す
    }
}
