const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const xml2js = require('xml2js');

const app = express();
const PORT = 3001;

// CORS 설정
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://localhost:3000', 'http://127.0.0.1:3000', 'null'],
    credentials: true
}));

// RSS 프록시 엔드포인트
app.get('/proxy/rss', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        console.log(`프록시 요청: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const content = await response.text();
        
        res.set('Content-Type', 'text/xml; charset=utf-8');
        res.send(content);
        
        console.log(`프록시 성공: ${url}`);
        
    } catch (error) {
        console.error('프록시 에러:', error.message);
        res.status(500).json({ 
            error: '프록시 요청 실패', 
            details: error.message 
        });
    }
});

// RSS 분석 엔드포인트 (날짜별 게시물 수)
app.get('/analyze/rss', async (req, res) => {
    try {
        const { url } = req.query;
        
        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        console.log(`RSS 분석 요청: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const xmlContent = await response.text();
        
        // XML을 JSON으로 파싱
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xmlContent);
        
        // RSS 피드에서 아이템 추출
        const items = result.rss?.channel?.[0]?.item || result.feed?.entry || [];
        
        if (!items || items.length === 0) {
            return res.json({});
        }
        
        // 날짜별 게시물 수 계산
        const dateCounts = {};
        
        items.forEach(item => {
            let date;
            
            // RSS 형식에 따라 날짜 필드 확인
            if (item.pubDate && item.pubDate[0]) {
                date = new Date(item.pubDate[0]);
            } else if (item.published && item.published[0]) {
                date = new Date(item.published[0]);
            } else if (item.updated && item.updated[0]) {
                date = new Date(item.updated[0]);
            } else {
                // 날짜가 없으면 현재 날짜 사용
                date = new Date();
            }
            
            if (date && !isNaN(date.getTime())) {
                const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
                dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
            }
        });
        
        console.log(`RSS 분석 완료: ${url} - ${Object.keys(dateCounts).length}개 날짜`);
        res.json(dateCounts);
        
    } catch (error) {
        console.error('RSS 분석 에러:', error.message);
        res.status(500).json({ 
            error: 'RSS 분석 실패', 
            details: error.message 
        });
    }
});

// 헬스체크
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 CORS 프록시 서버가 http://localhost:${PORT}에서 실행 중입니다`);
    console.log(`📡 RSS 프록시: http://localhost:${PORT}/proxy/rss?url=YOUR_RSS_URL`);
    console.log(`📊 RSS 분석: http://localhost:${PORT}/analyze/rss?url=YOUR_RSS_URL`);
    console.log(`💚 헬스체크: http://localhost:${PORT}/health`);
}); 