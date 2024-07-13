async function fetchTikTokData() {
    const url = document.getElementById('tiktok-url').value;
    // ここでTikTokのAPIを呼び出してデータを取得する
    // この例では、モックデータを使用します

    const mockData = {
        accountName: 'example_account',
        videoName: 'example_video',
        viewCount: 1000,
        likeCount: 150
    };

    document.getElementById('account-name').innerText = `アカウント名: ${mockData.accountName}`;
    document.getElementById('video-name').innerText = `動画名: ${mockData.videoName}`;
    document.getElementById('view-count').innerText = `視聴回数: ${mockData.viewCount}`;
    document.getElementById('like-count').innerText = `いいね数: ${mockData.likeCount}`;
    document.getElementById('tiktok-info').style.display = 'block';
}
