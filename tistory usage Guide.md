# 📱 티스토리 블로그에 Graden Widget 적용 가이드

GitHub 스타일의 블로그 활동 기록 위젯을 티스토리 블로그에 직접 삽입하는 방법을 단계별로 안내합니다.

## 🎯 적용 결과 미리보기

적용 후 블로그에 다음과 같은 위젯이 표시됩니다:
- 📅 **최근 1년간의 활동 기록**을 GitHub 잔디 스타일로 시각화
- 🎨 **정확한 GitHub 색상**으로 활동 수준 표시
- 🔄 **24시간마다 자동 업데이트**로 최신 데이터 반영
- 📱 **반응형 디자인**으로 모바일과 데스크톱 모두 지원

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
<!-- Graden Widget 라이브러리 로드 -->
<script src="https://cdn.jsdelivr.net/gh/username/tistory-blog-garden-widget@main/tistory-blog-garden-widget.js"></script>

<!-- 위젯 컨테이너 -->
<div data-tistory-blog-garden-widget
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
<!-- Graden Widget 라이브러리 로드 -->
<script src="https://cdn.jsdelivr.net/gh/username/tistory-blog-garden-widget@main/tistory-blog-garden-widget.js"></script>

<!-- 위젯 컨테이너 -->
<div data-tistory-blog-garden-widget
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
<div data-tistory-blog-garden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="블로그 활동 기록"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

### 모든 옵션 사용
```html
<div data-tistory-blog-garden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="커스텀 제목"
     data-update-interval="43200000"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

### 옵션 설명
| 속성 | 값 | 설명 |
|------|-----|------|
| `data-rss-url` | RSS URL | 블로그 RSS 피드 주소 (필수) |
| `data-title` | 문자열 | 위젯 제목 (기본값: "활동 기록") |
| `data-update-interval` | 밀리초 | 업데이트 주기 (기본값: 24시간) |
| `data-show-legend` | true/false | 범례 표시 여부 (기본값: true) |
| `data-show-footer` | true/false | 푸터 표시 여부 (기본값: true) |

## 🎨 커스터마이징

### 색상 변경
기본 GitHub 스타일 색상을 사용하지만, 필요시 JavaScript로 변경 가능:

```html
<script>
// 위젯 생성 후 색상 변경
const widget = document.querySelector('[data-tistory-blog-garden-widget]')._GradenWidget;
widget.setOptions({
    colors: {
        0: '#f0f0f0',  // 활동 없음
        1: '#c6e48b',  // 낮은 활동
        2: '#7bc96f',  // 중간 활동
        3: '#239a3b',  // 높은 활동
        4: '#196127'   // 최고 활동
    }
});
</script>
```

### 제목 변경
```html
<script>
const widget = document.querySelector('[data-tistory-blog-garden-widget]')._GradenWidget;
widget.setOptions({
    title: '새로운 제목'
});
</script>
```

## 🔍 문제 해결

### 문제 1: 위젯이 표시되지 않음
**원인**: JavaScript 라이브러리 로드 실패
**해결방법**:
1. 브라우저 개발자 도구 (F12) 열기
2. Console 탭에서 에러 메시지 확인
3. 네트워크 연결 상태 확인
4. CDN URL이 올바른지 확인

### 문제 2: "활동 데이터를 불러올 수 없습니다" 메시지
**원인**: RSS 피드 접근 실패
**해결방법**:
1. RSS URL이 올바른지 확인
2. 블로그가 비공개 설정인지 확인
3. RSS 피드가 활성화되어 있는지 확인

### 문제 3: 색상이 이상하게 표시됨
**원인**: CSS 충돌
**해결방법**:
1. 블로그 테마와의 호환성 확인
2. 다른 위젯과의 충돌 확인
3. 브라우저 캐시 삭제

### 문제 4: 모바일에서 레이아웃 깨짐
**원인**: 반응형 CSS 충돌
**해결방법**:
1. 블로그 테마의 모바일 설정 확인
2. 위젯 위치 조정
3. CSS 우선순위 확인

## 📱 모바일 최적화

### 모바일에서의 표시
- 위젯이 자동으로 모바일 크기에 맞춰 조정됩니다
- 터치 인터페이스에 최적화되어 있습니다
- 작은 화면에서도 가독성이 좋습니다

### 모바일 전용 설정
```html
<!-- 모바일에서만 표시 -->
<div data-tistory-blog-garden-widget
     data-rss-url="https://your-blog-name.tistory.com/rss"
     data-title="모바일 활동 기록"
     class="mobile-only">
</div>

<style>
@media (min-width: 768px) {
    .mobile-only { display: none; }
}
</style>
```

## 🔄 업데이트 및 유지보수

### 자동 업데이트
- 위젯은 **24시간마다 자동으로** RSS 데이터를 업데이트합니다
- 별도의 설정이나 관리가 필요하지 않습니다

### 수동 업데이트
필요시 수동으로 데이터를 업데이트할 수 있습니다:
```javascript
const widget = document.querySelector('[data-tistory-blog-garden-widget]')._GradenWidget;
widget.update().then(() => {
    console.log('데이터 업데이트 완료');
});
```

### 위젯 제거
위젯을 완전히 제거하려면:
```javascript
const widget = document.querySelector('[data-tistory-blog-garden-widget]')._GradenWidget;
widget.destroy();
```

## 📊 성능 최적화

### 로딩 최적화
- 위젯은 **비동기적으로** 로드되어 페이지 로딩 속도에 영향을 주지 않습니다
- CSS와 JavaScript가 자동으로 최적화됩니다

### 메모리 관리
- 위젯은 **메모리 누수 없이** 동작합니다
- 페이지 이동 시 자동으로 리소스를 정리합니다

## 🌟 추가 팁

### 1. 여러 위젯 동시 사용
```html
<!-- 첫 번째 위젯 -->
<div data-tistory-blog-garden-widget
     data-rss-url="https://blog1.tistory.com/rss"
     data-title="블로그 1 활동">
</div>

<!-- 두 번째 위젯 -->
<div data-tistory-blog-garden-widget
     data-rss-url="https://blog2.tistory.com/rss"
     data-title="블로그 2 활동">
</div>
```

### 2. 특정 페이지에서만 표시
```html
<!-- 메인 페이지에서만 표시 -->
<script>
if (window.location.pathname === '/') {
    // 위젯 코드
}
</script>
```

### 3. 계절별 테마 적용
```html
<script>
const month = new Date().getMonth();
let theme = 'default';

if (month >= 2 && month <= 4) theme = 'spring';
else if (month >= 5 && month <= 7) theme = 'summer';
else if (month >= 8 && month <= 10) theme = 'autumn';
else theme = 'winter';

// 테마에 따른 색상 적용
</script>
```

## 📞 지원 및 문의

### 문제 발생 시
1. **브라우저 개발자 도구**에서 에러 메시지 확인
2. **Console 탭**에서 로그 메시지 확인
3. **Network 탭**에서 API 호출 상태 확인

### 추가 도움
- GitHub Issues: [이슈 등록](https://github.com/username/tistory-blog-garden-widget/issues)
- 이메일: your-email@example.com

## 🎉 완성!

이제 티스토리 블로그에 GitHub 스타일의 활동 기록 위젯이 완벽하게 적용되었습니다!

**주요 장점:**
- ✅ **한 번 설정으로 영구 사용**
- ✅ **24시간 자동 업데이트**
- ✅ **GitHub와 동일한 시각적 효과**
- ✅ **모바일과 데스크톱 모두 지원**
- ✅ **한국어 완벽 지원**

위젯이 정상적으로 작동하는지 확인하고, 블로그 방문자들에게 멋진 활동 기록을 보여주세요! 🚀

---

**참고**: 위젯 적용 후 문제가 발생하거나 추가 설정이 필요하시면 언제든지 문의해주세요. 