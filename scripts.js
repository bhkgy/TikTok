let intervalId;
let currentViewCount = 0;
let currentLikeCount = 0;

function startFetchingData() {
    const url = document.getElementById('tiktok-url').value;
    if (!url) {
        alert('TikTokのURLを入力してください。');
        return;
    }

    // 既にintervalが設定されている場合、クリアする
    if (intervalId) {
        clearInterval(intervalId);
    }

    // 初回のデータ取得
    fetchTikTokData(url);

    // 60秒毎にデータを取得して更新する
    intervalId = setInterval(() => {
        fetchTikTokData(url);
    }, 10000); // 60,000ミリ秒 = 60秒
}

async function fetchTikTokData(url) {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.data) {
            const videoData = data.data;

            document.getElementById('account-name').innerText = `アカウント名: ${videoData.author.nickname}`;
            document.getElementById('video-name').innerText = `動画名: ${videoData.title}`;
            updateCounter('view-count', videoData.play_count);
            updateCounter('like-count', videoData.digg_count);
            document.getElementById('tiktok-info').style.display = 'block';
        } else {
            alert('データの取得に失敗しました。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('データの取得に失敗しました。');
    }
}

function updateCounter(id, newCount) {
    const element = document.getElementById(id);
    const currentCount = id === 'view-count' ? currentViewCount : currentLikeCount;

    if (currentCount !== newCount) {
        const increment = newCount - currentCount;
        animateCounter(element, currentCount, newCount, increment);

        if (id === 'view-count') {
            currentViewCount = newCount;
        } else {
            currentLikeCount = newCount;
        }
    }
}

function animateCounter(element, start, end, increment) {
    const duration = 1000; // 1秒間
    const steps = 20;
    const stepIncrement = increment / steps;
    let current = start;

    const interval = setInterval(() => {
        current += stepIncrement;
        element.innerText = `${element.id === 'view-count' ? '視聴回数' : 'いいね数'}: ${Math.round(current)}`;

        if ((stepIncrement > 0 && current >= end) || (stepIncrement < 0 && current <= end)) {
            clearInterval(interval);
            element.innerText = `${element.id === 'view-count' ? '視聴回数' : 'いいね数'}: ${end}`;
        }
    }, duration / steps);
}
