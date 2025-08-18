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

## 🚀 빠른 시작

### 1. 스크립트 로드

```html
<script src="https://cdn.jsdelivr.net/gh/username/tistory-blog-garden-widget@main/tistory-blog-garden-widget.js"></script>
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
<div data-tistory-blog-garden-widget
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

## 🔧 API 메서드

### `update()`
수동으로 데이터를 업데이트합니다.

```javascript
widget.update().then(() => {
    console.log('데이터 업데이트 완료');
});
```

### `destroy()`
위젯을 제거하고 메모리를 정리합니다.

```javascript
widget.destroy();
```

### `setOptions(newOptions)`
위젯 옵션을 변경합니다.

```javascript
widget.setOptions({
    title: '새로운 제목',
    showLegend: false
});
```

## 🌐 CDN 배포

### GitHub Pages
```html
<script src="https://username.github.io/repo-name/tistory-blog-garden-widget.js"></script>
```

### jsDelivr
```html
<script src="https://cdn.jsdelivr.net/gh/username/repo-name@main/tistory-blog-garden-widget.js"></script>
```

### unpkg (npm 패키지 배포 후)
```html
<script src="https://unpkg.com/tistory-blog-garden-widget@1.0.0/tistory-blog-garden-widget.js"></script>
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

### v1.0.0
- 초기 릴리스
- GitHub 스타일 활동 기록 위젯
- RSS 피드 자동 파싱
- 24시간 자동 업데이트
- 완전한 커스터마이징 옵션

---