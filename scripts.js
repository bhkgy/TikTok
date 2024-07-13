async function fetchTikTokData() {
    const url = document.getElementById('tiktok-url').value;
    
    // 非公式のTikTok APIエンドポイントを使用してデータを取得
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.data) {
            const videoData = data.data;

            document.getElementById('account-name').innerText = `アカウント名: ${videoData.author.nickname}`;
            document.getElementById('video-name').innerText = `動画名: ${videoData.title}`;
            document.getElementById('view-count').innerText = `視聴回数: ${videoData.play_count}`;
            document.getElementById('like-count').innerText = `いいね数: ${videoData.digg_count}`;
            document.getElementById('tiktok-info').style.display = 'block';
        } else {
            alert('データの取得に失敗しました。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('データの取得に失敗しました。');
    }
}
