# 🛠️ Blog Garden Widget 개발자 가이드

## 📋 개요

이 가이드는 Blog Garden Widget을 커스터마이징하고, 프록시 서버를 배포하며, 고급 기능을 구현하는 방법을 설명합니다.

---

### 프록시 서버 엔드포인트

- **RSS 분석**: `/analyze/rss?url=RSS_URL`
- **원본 RSS**: `/proxy/rss?url=RSS_URL`
- **헬스체크**: `/health`

### 프록시 서버 기능

- RSS 피드 자동 파싱
- 날짜별 게시물 수 계산
- CORS 문제 해결
- 다양한 RSS 형식 지원 (RSS, Atom)
- 에러 핸들링 및 로깅
- Rate Limiting (IP당 15분에 100개 요청)

## 🚀 프록시 서버 배포

### Vercel 배포 (권장)

#### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

#### 2. 프로젝트 배포
```bash
# 프로젝트 디렉토리에서
vercel --prod
```

---

## 📦 npm 패키지 배포

### 1. 배포 전 준비

#### package.json 설정 확인
```json
{
  "name": "blog-garden-widget",
  "version": "1.3.0",
  "description": "GitHub style blog activity visualization widget",
  "main": "blog-garden-widget.js",
  ...
}
```

#### 배포할 파일 확인
```bash
# npm pack으로 패키지 내용 확인
npm pack

# 생성된 .tgz 파일 내용 확인
tar -tzf blog-garden-widget-1.3.0.tgz
```

### 2. npm 로그인 및 배포

#### npm 계정 로그인
```bash
# npm 로그인
npm login

# 로그인 상태 확인
npm whoami
```

#### 배포 전 검증
```bash
# 배포 시뮬레이션 (실제 배포되지 않음)
npm publish --dry-run

# 패키지 유효성 검사
npm pack
```

#### 실제 배포
```bash
# 프로덕션 배포
npm publish
```

### 3. 버전 관리

#### 시맨틱 버저닝
```bash
# 패치 버전 (1.2.0 → 1.2.1) - 버그 수정
npm version patch

# 마이너 버전 (1.2.0 → 1.3.0) - 새로운 기능
npm version minor

# 메이저 버전 (1.2.0 → 2.0.0) - 호환성 깨뜨리는 변경
npm version major
```

#### 버전 태그 관리
```bash
# 최신 버전을 latest 태그로 설정
npm dist-tag add blog-garden-widget@1.3.0 latest

# 베타 버전을 beta 태그로 설정
npm dist-tag add blog-garden-widget@1.3.0-beta.1 beta

# 태그 목록 확인
npm dist-tag ls blog-garden-widget
```

### 4. 배포 후 확인

#### CDN에서 패키지 확인
```bash
# unpkg에서 패키지 확인
curl https://unpkg.com/blog-garden-widget@1.3.0/package.json

# 특정 파일 확인
curl https://unpkg.com/blog-garden-widget@1.3.0/blog-garden-widget.js
```

---





---


## 🔍 디버깅 및 테스트

### 1. 로컬 테스트

#### 프록시 서버 로컬 실행
```bash
# 의존성 설치
npm install

# 환경 변수 설정
export NODE_ENV=development
export PORT=3001

# 서버 실행
node proxy-server.js
```

#### 위젯 테스트 페이지 (cdn-test.html)
```html
<!DOCTYPE html>
<html>
<head>
    <title>위젯 테스트</title>
</head>
<body>
    <div data-graden-widget
         data-rss-url="https://your-blog.com/rss"
         data-title="테스트 위젯">
    </div>
    
    <script src="blog-garden-widget.js"></script>
</body>
</html>
```



```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

app.get('/api/analyze/rss', async (req, res) => {
    const { url } = req.query;
    const cacheKey = `rss:${Buffer.from(url).toString('base64')}`;
    
    try {
        // Redis에서 캐시 확인
        const cached = await redis.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached));
        }
        
        // RSS 분석
        const data = await analyzeRssFeed(url);
        
        // Redis에 캐시 저장 (1시간)
        await redis.setex(cacheKey, 3600, JSON.stringify(data));
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
```

---

## 📚 추가 자료

### 유용한 링크
- [Express.js 공식 문서](https://expressjs.com/)
- [Vercel 배포 가이드](https://vercel.com/docs)
- [npm 배포 가이드](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [RSS 2.0 명세](https://cyber.harvard.edu/rss/rss.html)



---

*이 가이드를 통해 Blog Garden Widget을 더욱 강력하게 커스터마이징하고 확장할 수 있습니다! 🚀* 