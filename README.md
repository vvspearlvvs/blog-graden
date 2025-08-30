# 🎯 Blog Garden Widget

GitHub 스타일의 블로그 활동 시각화 위젯입니다. RSS 피드를 자동으로 파싱하여 블로그 활동을 GitHub 잔디와 동일한 스타일로 보여줍니다.

## ✨ 주요 기능

- 🎨 **GitHub 스타일**: 정확한 GitHub 잔디 색상 코드 사용
- 📡 **RSS 자동 파싱**: RSS 피드에서 게시물 정보 자동 수집
- 🔄 **자동 업데이트**: 24시간마다 데이터 자동 갱신
- 📱 **반응형 디자인**: 모바일과 데스크톱 모두 지원
- 🌏 **한국어 지원**: 한국어 날짜 형식과 메시지
- ⚙️ **완전 커스터마이징**: 제목, 색상, 업데이트 주기 등 설정 가능
- 🚀 **배포된 프록시 서버**: CORS 문제 해결을 위한 클라우드 프록시 서버 제공
- 🔧 **향상된 성능**: 서버 사이드 RSS 파싱으로 클라이언트 부담 감소
- 📊 **다양한 RSS 형식**: RSS, Atom 피드 모두 지원
- 👥 **다중 사용자 지원**: 여러 사용자가 동시에 사용 가능
- 🛡️ **Rate Limiting**: API 남용 방지를 위한 요청 제한

## 📖 기본 사용법
<!-- 티스토리 관리자 → 꾸미기 → 사이드바 → HTML 위젯 -->
### 3개월 버전 위젯 (html)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
<div data-graden-widget data-rss-url="[블로그 주소URL]/rss">
</div>
```

### 1년 버전 위젯 (html)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
<div data-graden-widget-1y data-rss-url="[블로그 주소URL]/rss">
</div>
```
## 🎨 커스텀 사용법
<!-- 티스토리 관리자 → 꾸미기 → HTML 편집 -->
### 3개월 버전 위젯 (JavaScript)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
<div id="blog-garden-widget"></div>
<script>
new GradenWidget(document.getElementById('blog-garden-widget'), {
    rssUrl: '[블로그 주소URL]/rss',
    title: '커스텀 위젯명',
    showLegend: true,
});
</script>
```

### 1년 버전 위젯 (JavaScript)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
<div id="blog-garden-widget-1y"></div>
<script>
new GradenWidget1Y(document.getElementById('blog-garden-widget-1y'), {
    rssUrl: '[블로그 주소URL]/rss',
    title: '커스텀 위젯명',
    showLegend: true,
});
</script>
```

## 🎨 커스텀 설정 (포도 스타일 예시)

### 3개월 버전 위젯 (JavaScript)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-3m.js"></script>
<div id="blog-garden-widget-3m"></div>
<script>
new GradenWidget3M(document.getElementById('blog-garden-widget-3m'), {
    rssUrl: '[블로그 주소URL]/rss',
    title: '블로그 포도',
    showLegend: true,
    colors: {
        0: '#ede9fe',  
        1: '#c4b5fd', 
        2: '#a99be9',  
        3: '#7c3aed',  
        4: '#4c1d95'  
    }
});
</script>
```
### 1년 버전 위젯 (JavaScript)
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
<div id="blog-garden-widget-1y"></div>
<script>
new GradenWidget1Y(document.getElementById('blog-garden-widget-1y'), {
    rssUrl: '[블로그 주소URL]/rss',
    title: '블로그 포도 (1년)',
    showLegend: true,
    colors: {
        0: '#ede9fe',  
        1: '#c4b5fd', 
        2: '#a99be9',  
        3: '#7c3aed',  
        4: '#4c1d95'  
    }
});
</script>
```
## 🔍 제약 조건

### 지원 브라우저
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 지원 RSS
- /rss
- /feed
- /atom.xml
- /rss.xml
- /feed.xml

### 프록시 서버 
- CORS 제약조건으로 인해 브라우저->프록시 서버->RSS 요청
- 프록시 서버 상태 :  https://blog-graden.vercel.app/health 
- 프록시 서버 조회 : https://blog-graden.vercel.app/proxy/rss?url=[RSS피드URL] 
- 날짜별 게시물 수 조회 :  https://blog-graden.vercel.app/analyze/rss?url=[RSS피드URL] 

### 위젯 스트립트 
- 3개월 CDN URL: https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js
- 1년 CDN URL: https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js

## 📊 위젯 버전별 특징

| 구분 | 3개월 버전 | 1년 버전 |
|------|------------|----------|
| **클래스명** | `GradenWidget` | `GradenWidget1Y` |
| **HTML 속성** | `data-graden-widget` | `data-graden-widget-1y` |
| **크기** | 250px 너비 | 1000px 너비 |
| **기간** | 최근 3개월 | 최근 1년 |
| **그리드** | 12주 × 7일 = 84개 셀 | 52주 × 7일 = 364개 셀 |
| **용도** | 사이드바, 컴팩트한 공간 | 본문, 상세한 연간 분석 |
| **로딩 속도** | 빠름 (~50ms) | 보통 (~80ms) |

## ⚙️ 기본 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `rssUrl` | string | `'https://pearlluck.tistory.com/rss'` | RSS 피드 URL |
| `title` | string | `'활동 기록'` | 위젯 제목 |
| `updateInterval` | number | `86400000` | 업데이트 주기 (밀리초, 24시간) |
| `showLegend` | boolean | `true` | 범례 표시 여부 |
| `color` | json | `` | 그라이데이션 색 표시 (기본: GitHub contribution graph 컬러맵) |


## 📚 더 자세한 정보

- **개발후기 ** [Blog](https://pearlluck.tistory.com/911)
- **사용자 가이드** [User Guide](./user-guide.md)
- **시스템 구조**: [Architecture Guide](./architecture.md)
- **개발자 가이드**: [Developer Guide](./developer-guide.md)
- **프록시 서버 배포**: [Developer Guide](./developer-guide.md#프록시-서버-배포)

