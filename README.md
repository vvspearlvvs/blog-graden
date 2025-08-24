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

## 🚀 빠른 시작

### 1. 스크립트 로드

#### 3개월 버전 위젯
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
```

#### 1년 버전 위젯
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
```

### 2. HTML 컨테이너 생성

#### 3개월 버전 위젯
```html
<div id="my-blog-garden-widget"></div>
```

#### 1년 버전 위젯
```html
<div id="my-yearly-blog-garden-widget"></div>
```

### 3. 위젯 초기화

#### 3개월 버전 위젯
```javascript
const widget = new GradenWidget('#my-blog-garden-widget', {
    rssUrl: 'https://your-blog.com/rss',
    title: '내 블로그 활동'
});
```

#### 1년 버전 위젯
```javascript
const yearlyWidget = new GradenWidget1Y('#my-yearly-blog-garden-widget', {
    rssUrl: 'https://your-blog.com/rss',
    title: '1년 활동 기록'
});
```

## 📖 기본 사용법

### HTML 속성으로 자동 초기화

#### 3개월 버전 위젯
```html
<div data-graden-widget
     data-rss-url="https://your-blog.com/rss"
     data-title="블로그 활동">
</div>
```

#### 1년 버전 위젯
```html
<div data-graden-widget-1y
     data-rss-url="https://your-blog.com/rss"
     data-title="1년 활동 기록">
</div>
```

### JavaScript API로 동적 생성

#### 3개월 버전 위젯
```javascript
const widget = new GradenWidget('#container', {
    rssUrl: 'https://your-blog.com/rss',
    title: '커스텀 제목',
    updateInterval: 12 * 60 * 60 * 1000, // 12시간마다 업데이트
    showLegend: true,
    showFooter: true
});
```

#### 1년 버전 위젯
```javascript
const yearlyWidget = new GradenWidget1Y('#container', {
    rssUrl: 'https://your-blog.com/rss',
    title: '1년 활동 기록',
    updateInterval: 12 * 60 * 60 * 1000, // 12시간마다 업데이트
    showLegend: true,
    showFooter: true
});
```

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
| `showFooter` | boolean | `true` | 푸터 표시 여부 |


## 🔍 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📦 설치

### CDN 사용 (권장)

#### 3개월 버전만 사용
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
```

#### 1년 버전만 사용
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
```

#### 두 버전 모두 사용
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
```

### npm 설치
```bash
npm install blog-garden-widget
```

## 📱 티스토리 블로그 적용 예시

### 사이드바에 3개월 버전 위젯 추가
```html
<!-- 티스토리 관리자 → 꾸미기 → 사이드바 → HTML 위젯 -->
<div data-graden-widget
     data-rss-url="https://your-blog.tistory.com/rss"
     data-title="활동 기록"
     data-show-legend="true">
</div>

<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
```

### 본문에 1년 버전 위젯 추가
```html
<!-- 티스토리 관리자 → 꾸미기 → HTML 편집 -->
<div class="yearly-activity-widget">
    <h3>연간 활동 기록</h3>
    <div data-graden-widget-1y
         data-rss-url="https://your-blog.tistory.com/rss"
         data-title="1년 활동 기록">
    </div>
</div>

<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget-1y.js"></script>
```

## 📚 더 자세한 정보

- **사용자 가이드** [User Guide](./user-guide.md)
- **시스템 구조**: [Architecture Guide](./architecture.md)
- **개발자 가이드**: [Developer Guide](./developer-guide.md)
- **프록시 서버 배포**: [Developer Guide](./developer-guide.md#프록시-서버-배포)

