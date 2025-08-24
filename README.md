# 🎯 Graden Widget

GitHub 스타일의 티스토리 블로그 활동 기록 시각화 위젯입니다. RSS 피드를 자동으로 파싱하여 최근 1년간의 블로그 활동을 GitHub 잔디와 동일한 스타일로 보여줍니다.

## ✨ 주요 기능

- 🎨 **GitHub 스타일**: 정확한 GitHub 잔디 색상 코드 사용
- 📡 **RSS 자동 파싱**: RSS 피드에서 게시물 정보 자동 수집
- 🔄 **자동 업데이트**: 24시간마다 데이터 자동 갱신
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🌏 **한국어 지원**: 한국어 날짜 형식과 메시지
- ⚙️ **완전 커스터마이징**: 제목, 색상, 업데이트 주기 등 설정 가능
- 🧹 **메모리 관리**: destroy() 메서드로 리소스 정리
- 🚀 **로컬 프록시 서버**: CORS 문제 해결을 위한 로컬 프록시 서버 제공
- 🔧 **향상된 성능**: 서버 사이드 RSS 파싱으로 클라이언트 부담 감소
- 📊 **다양한 RSS 형식**: RSS, Atom 피드 모두 지원

## 🚀 빠른 시작

### 1. 스크립트 로드

```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
```

### 2. HTML 컨테이너 생성

```html
<div id="my-tistory-blog-garden-widget"></div>
```

### 3. 위젯 초기화

```javascript
const widget = new GradenWidget('#my-tistory-blog-garden-widget', {
    rssUrl: 'https://pearlluck.tistory.com/rss',
    title: '내 블로그 활동'
});
```

## 🔧 프록시 서버 설정 (v1.1.0+)

CORS 문제를 해결하기 위해 로컬 프록시 서버를 제공합니다.

### 프록시 서버 실행

```bash
# 의존성 설치
npm install cors express node-fetch xml2js

# 프록시 서버 실행
node proxy-server.js
```

### 프록시 서버 엔드포인트

- **RSS 분석**: `http://localhost:3001/analyze/rss?url=RSS_URL`
- **원본 RSS**: `http://localhost:3001/proxy/rss?url=RSS_URL`
- **헬스체크**: `http://localhost:3001/health`

### 프록시 서버 기능

- RSS 피드 자동 파싱
- 날짜별 게시물 수 계산
- CORS 문제 해결
- 다양한 RSS 형식 지원 (RSS, Atom)
- 에러 핸들링 및 로깅

## 📖 사용법

### 기본 사용법

```javascript
// 가장 간단한 사용법
const widget = new GradenWidget('#container');

// RSS URL과 제목 설정
const widget = new GradenWidget('#container', {
    rssUrl: 'https://pearlluck.tistory.com/rss',
    title: '내 블로그 활동'
});
```

### 고급 설정

```javascript
const widget = new GradenWidget('#container', {
    rssUrl: 'https://pearlluck.tistory.com/rss',
    title: '고급 설정 위젯',
    updateInterval: 12 * 60 * 60 * 1000, // 12시간마다 업데이트
    showLegend: true,
    showFooter: true,
    colors: {
        0: '#ebedef',  // 활동 없음
        1: '#9be9a8',  // 낮은 활동
        2: '#40c463',  // 중간 활동
        3: '#30a14e',  // 높은 활동
        4: '#216e39'   // 최고 활동
    }
});
```

### HTML 속성으로 자동 초기화

```html
<div data-graden-widget
     data-rss-url="https://pearlluck.tistory.com/rss"
     data-title="자동 초기화 위젯"
     data-update-interval="86400000"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

## ⚙️ 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `rssUrl` | string | `'https://pearlluck.tistory.com/rss'` | RSS 피드 URL |
| `title` | string | `'활동 기록'` | 위젯 제목 |
| `updateInterval` | number | `86400000` | 업데이트 주기 (밀리초, 24시간) |
| `showLegend` | boolean | `true` | 범례 표시 여부 |
| `showFooter` | boolean | `true` | 푸터 표시 여부 |
| `colors` | object | GitHub 스타일 색상 | 색상 커스터마이징 |


## 🌐 npm 패키지 배포

### unpkg (npm 패키지 배포 후)
```bash
npm login  # npm 로그인
npm publish --dry-run  # 퍼블리시 전 검증
npm pack  # 패키지에 포함될 파일 확인
npm publish  # 배포
```

## 🌐 CDN 배포

### unpkg (최신 버전 자동 추적)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
```

### unpkg 권장방식 (특정 버전 고정)
```html
<script src="https://unpkg.com/blog-garden-widget@1.2.0/blog-garden-widget.js"></script>
```

## 📱 티스토리 블로그에 삽입

### HTML 편집기 사용
1. 티스토리 관리자 페이지 → **꾸미기** → **HTML 편집**
2. 원하는 위치에 위젯 코드 삽입
3. **저장** 후 블로그 확인

### 사이드바 위젯으로 추가
1. 티스토리 관리자 페이지 → **꾸미기** → **사이드바**
2. **HTML** 위젯 추가
3. 위젯 코드 삽입

## 🎨 색상 커스터마이징

기본 GitHub 스타일 색상:
```javascript
colors: {
    0: '#ebedef',  // 활동 없음 (회색)
    1: '#9be9a8',  // 낮은 활동 (연한 초록)
    2: '#40c463',  // 중간 활동 (중간 초록)
    3: '#30a14e',  // 높은 활동 (진한 초록)
    4: '#216e39'   // 최고 활동 (가장 진한 초록)
}
```

## 🔍 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📈 버전 히스토리

### v1.3.0
- 🚀 **프록시 서버 배포** : https://blog-graden.vercel.app

### v1.2.1
- 🚀 **CDN 테스트 수정** : 3개월,1년 위젯 수정

### v1.2.0
- 🚀 **성능 최적화**: 메모리 사용량 개선 및 렌더링 성능 향상
- 🔧 **에러 핸들링 강화**: 네트워크 오류 및 RSS 파싱 오류에 대한 견고한 처리
- 📊 **데이터 처리 개선**: RSS 피드 파싱 정확도 향상

### v1.1.0
- 🚀 **로컬 프록시 서버 추가**: CORS 문제 해결을 위한 프록시 서버 제공
- 📊 **RSS 분석 엔드포인트**: 날짜별 게시물 수 자동 계산
- 🔧 **성능 최적화**: 서버 사이드 RSS 파싱으로 클라이언트 부담 감소
- 🌐 **다양한 RSS 형식 지원**: RSS, Atom 피드 모두 지원
- 📝 **프록시 서버 문서화**: 상세한 설정 및 사용법 제공

### v1.0.0
- 초기 릴리스
- GitHub 스타일 활동 기록 위젯
- RSS 피드 자동 파싱
- 24시간 자동 업데이트
- 완전한 커스터마이징 옵션

## 🚀 프록시 서버 배포

### 자체 프록시 서버 사용
```javascript
const widget = new GradenWidget('#container', {
    rssUrl: 'https://your-blog.com/rss',
    proxyUrl: 'https://blog-graden.vercel.app'
});
```

### 기본 프록시 서버 사용 (제한적)
```javascript
const widget = new GradenWidget('#container', {
    rssUrl: 'https://your-blog.com/rss'
    // proxyUrl을 설정하지 않으면 기본 프록시 서버 사용
});
```
```


## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---