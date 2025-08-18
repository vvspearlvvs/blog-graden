# 📱 티스토리 블로그에 Graden Widget 적용 가이드

GitHub 스타일의 블로그 활동 기록 위젯을 티스토리 블로그에 직접 삽입하는 방법을 단계별로 안내합니다.

## 🎯 적용 결과 미리보기

적용 후 블로그에 다음과 같은 위젯이 표시됩니다:
- 📅 **최근 1년간의 활동 기록**을 GitHub 잔디 스타일로 시각화
- 🎨 **정확한 GitHub 색상**으로 활동 수준 표시
- 🔄 **24시간마다 자동 업데이트**로 최신 데이터 반영
- 📱 **반응형 디자인**으로 모바일과 데스크톱 모두 지원
- 🚀 **향상된 성능**과 **견고한 에러 처리**

## 📋 사전 준비사항

### 1. RSS 피드 URL 확인
- 티스토리 블로그의 RSS 피드 URL을 확인합니다
- 일반적으로: `https://your-blog-name.tistory.com/rss`
- 예시: `https://pearlluck.tistory.com/rss`

### 2. 브라우저 준비
- Chrome, Firefox, Safari 등 최신 브라우저 사용
- 티스토리 관리자 페이지 접속 가능

## 🚀 적용 방법 1: HTML 편집기 사용 (권장)

### 1단계: 티스토리 관리자 페이지 접속
1. [티스토리](https://www.tistory.com) 로그인
2. **내 블로그** → **관리** 클릭
3. **꾸미기** 메뉴 클릭

### 2단계: HTML 편집기 열기
1. **HTML 편집** 버튼 클릭
2. **HTML 편집** 창이 열립니다

### 3단계: 위젯 코드 삽입
원하는 위치에 다음 코드를 복사/붙여넣기:

```html
<!-- Graden Widget 라이브러리 로드 (v1.2.0) -->
<script src="https://unpkg.com/blog-garden-widget@1.2.0/blog-garden-widget.js"></script>

<!-- 위젯 컨테이너 -->
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

### 4단계: RSS URL 수정
`https://your-blog-name.tistory.com/rss` 부분을 **실제 블로그 RSS URL**로 변경:
```html
data-rss-url="https://pearlluck.tistory.com/rss"
```

### 5단계: 저장 및 확인
1. **저장** 버튼 클릭
2. **블로그로 이동**하여 위젯이 정상적으로 표시되는지 확인

## 🔧 적용 방법 2: 사이드바 위젯으로 추가

### 1단계: 사이드바 설정
1. **꾸미기** → **사이드바** 클릭
2. **위젯 추가** 버튼 클릭

### 2단계: HTML 위젯 선택
1. **HTML** 위젯 찾기
2. **추가** 버튼 클릭

### 3단계: 위젯 코드 입력
HTML 위젯 편집 창에 다음 코드 입력:

```html
<!-- Graden Widget 라이브러리 로드 (v1.2.0) -->
<script src="https://unpkg.com/blog-garden-widget@1.2.0/blog-garden-widget.js"></script>

<!-- 위젯 컨테이너 -->
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

### 4단계: 저장 및 배치
1. **저장** 버튼 클릭
2. **위젯 순서 조정** (드래그 앤 드롭)
3. **적용** 버튼 클릭

## ⚙️ 고급 설정 옵션

### 기본 설정 (권장)
```html
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-show-legend="true"
     data-show-footer="true">
```

### 커스텀 제목 설정
```html
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="내 개발 일지 활동"
     data-show-legend="true"
     data-show-footer="true">
```

### 업데이트 주기 조정 (밀리초 단위)
```html
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-update-interval="43200000"
     data-show-legend="true"
     data-show-footer="true">
```
- `43200000`: 12시간마다 업데이트
- `86400000`: 24시간마다 업데이트 (기본값)
- `172800000`: 48시간마다 업데이트

### 범례 및 푸터 숨기기
```html
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-show-legend="false"
     data-show-footer="false">
```

## 🎨 JavaScript로 고급 커스터마이징

### 프로그래밍 방식으로 위젯 생성
```html
<!-- 위젯 컨테이너 -->
<div id="my-blog-garden-widget"></div>

<script src="https://unpkg.com/blog-garden-widget@1.2.0/blog-garden-widget.js"></script>
<script>
// 위젯 인스턴스 생성
const widget = new GradenWidget('#my-blog-garden-widget', {
    rssUrl: 'https://your-blog-name.tistory.com/rss',
    title: '커스텀 제목',
    updateInterval: 12 * 60 * 60 * 1000, // 12시간
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

// 수동 업데이트
widget.update().then(() => {
    console.log('데이터 업데이트 완료');
});

// 옵션 변경
widget.setOptions({
    title: '새로운 제목',
    showLegend: false
});

// 위젯 제거 (필요시)
// widget.destroy();
</script>
```

## 🔧 문제 해결

### 1. 위젯이 표시되지 않는 경우
- **브라우저 콘솔 확인**: F12 → Console 탭에서 오류 메시지 확인
- **스크립트 로드 확인**: 네트워크 탭에서 스크립트 파일이 정상 로드되는지 확인
- **RSS URL 유효성**: RSS 피드 URL이 정상적으로 접근 가능한지 확인

### 2. CORS 오류가 발생하는 경우
- **프록시 서버 사용**: 로컬 프록시 서버를 실행하여 CORS 문제 해결
- **프록시 서버 설정**:
  ```bash
  npm install cors express node-fetch xml2js
  node proxy-server.js
  ```

### 3. 데이터가 업데이트되지 않는 경우
- **RSS 피드 확인**: RSS 피드에 최신 게시물이 포함되어 있는지 확인
- **업데이트 주기 확인**: `data-update-interval` 값이 적절한지 확인
- **수동 업데이트**: `widget.update()` 메서드로 수동 업데이트 시도

### 4. 모바일에서 레이아웃이 깨지는 경우
- **반응형 디자인**: 위젯은 자동으로 모바일에 최적화됨
- **컨테이너 크기**: 부모 컨테이너의 너비가 충분한지 확인
- **CSS 충돌**: 티스토리 기본 CSS와 충돌이 없는지 확인

## 📱 모바일 최적화

### 모바일에서의 표시
- **자동 반응형**: 모바일 화면에 맞춰 자동으로 크기 조정
- **터치 친화적**: 모바일 터치 인터페이스에 최적화
- **성능 최적화**: 모바일 디바이스에서의 렌더링 성능 향상

### 모바일 전용 설정
```html
<div data-graden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="모바일 최적화 위젯"
     data-show-legend="true"
     data-show-footer="false">
```

## 🚀 성능 최적화 팁

### 1. 업데이트 주기 최적화
- **활성 블로그**: 24시간마다 업데이트 (기본값)
- **비활성 블로그**: 48시간 또는 72시간마다 업데이트
- **테스트 환경**: 1시간마다 업데이트

### 2. 메모리 관리
- **위젯 제거**: 페이지를 벗어날 때 `widget.destroy()` 호출
- **이벤트 리스너**: 자동으로 정리되므로 별도 관리 불필요

### 3. 네트워크 최적화
- **CDN 사용**: unpkg CDN으로 빠른 스크립트 로드
- **캐싱**: 브라우저 자동 캐싱 활용

## 🔄 버전 업데이트

### 최신 버전으로 업데이트
```html
<!-- 최신 버전 (자동) -->
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>

<!-- 특정 버전 고정 (권장) -->
<script src="https://unpkg.com/blog-garden-widget@1.2.0/blog-garden-widget.js"></script>
```

### 버전별 주요 변경사항
- **v1.2.0**: 3개월 위젯(사이드용), 1년 위젯 구분
- **v1.1.0**: 프록시 서버 추가, RSS 분석 기능
- **v1.0.0**: 기본 기능 구현

## 📞 지원 및 문의

### 공식 저장소
- **GitHub**: [blog-garden-widget](https://github.com/vvspearlvvs/blog-garden-widget)
- **npm**: [blog-garden-widget](https://www.npmjs.com/package/blog-garden-widget)

### 문제 리포트
- **Issues**: GitHub 저장소의 Issues 탭에서 버그 리포트
- **Discussions**: 기능 제안 및 질문

### 커뮤니티
- **티스토리 블로그**: [pearlluck.tistory.com](https://pearlluck.tistory.com)
- **개발자 블로그**: 개발 관련 팁과 트릭 공유

---

## 📝 적용 체크리스트

- [ ] RSS 피드 URL 확인 및 테스트
- [ ] HTML 편집기 또는 사이드바에 위젯 코드 삽입
- [ ] RSS URL을 실제 블로그 URL로 수정
- [ ] 저장 후 블로그에서 위젯 표시 확인
- [ ] 모바일에서 레이아웃 확인
- [ ] 자동 업데이트 동작 확인
- [ ] 문제 발생 시 브라우저 콘솔 확인

**🎉 축하합니다! 이제 티스토리 블로그에 GitHub 스타일의 활동 기록 위젯이 성공적으로 적용되었습니다!** 