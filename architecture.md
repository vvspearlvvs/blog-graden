# 🏗️ Blog Garden Widget 전체 구조 문서

## 📋 프로젝트 개요

Blog Garden Widget은 **GitHub 스타일의 블로그 활동 시각화 위젯**으로, RSS 피드를 통해 티스토리 블로그의 활동을 잔디 형태로 보여주는 JavaScript 라이브러리입니다. 프록시 서버를 통해 CORS 문제를 해결하고, 클라이언트-서버 분리 아키텍처로 안정적이고 확장 가능한 시스템을 제공합니다.

---

## ️ 전체 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                    클라이언트 측 (브라우저)                    │
├─────────────────────────────────────────────────────────────┤
│   HTML 페이지 (cdn-test.html)                            │
│  ├── 3개월 버전 위젯 (data-graden-widget)                  │
│  └── 1년 버전 위젯 (data-graden-widget-1y)                │
├─────────────────────────────────────────────────────────────┤
│   JavaScript 위젯 라이브러리                              │
│  ├── blog-garden-widget.js (3개월 버전)                    │
│  └── blog-garden-widget-1y.js (1년 버전)                  │
├─────────────────────────────────────────────────────────────┤
│  🔄 프록시 서버 (proxy-server.js)                          │
│  ├── CORS 문제 해결                                        │
│  ├── RSS 피드 프록시                                       │
│  └── RSS 데이터 분석                                       │
├─────────────────────────────────────────────────────────────┤
│  📡 외부 RSS 피드 (티스토리 블로그)                          │
│  └── https://pearlluck.tistory.com/rss                    │
└─────────────────────────────────────────────────────────────┘
```

---

##  핵심 구성 요소

### 1. 프록시 서버 (proxy-server.js)

프록시 서버는 전체 시스템의 핵심 구성 요소로, CORS 문제 해결과 RSS 데이터 전처리를 담당합니다.

#### 주요 기능
- **CORS 문제 해결**: 브라우저의 Same-Origin Policy 제한 우회
- **RSS 피드 프록시**: 외부 RSS 피드를 안전하게 가져오기
- **RSS 데이터 분석**: XML을 JSON으로 변환하여 클라이언트 부담 감소
- **데이터 전처리**: 날짜별 게시물 수 계산 및 정규화
- **에러 핸들링**: 네트워크 오류 및 파싱 오류 처리

#### 기술 스택
```javascript
- Express.js: 웹 서버 프레임워크
- CORS: Cross-Origin Resource Sharing 설정
- node-fetch: HTTP 요청 처리
- xml2js: XML 파싱 및 JSON 변환
```

### 2. 위젯 라이브러리

#### 3개월 버전 (blog-garden-widget.js)
- **디자인**: 표준 GitHub 잔디 스타일
- **크기**: 250px 너비 (티스토리 사이드바 맞춤크기)
- **기간**: 최근 3개월간의 활동 기록 표시
- **그리드**: 12주 × 7일 = 84개 셀

#### 1년 버전 (blog-garden-widget-1y.js)
- **디자인**: 확장된 1년 활동 기록
- **크기**: 1000px 너비, 전체 연도 시각화
- **기간**: 1년간의 활동 기록 표시
- **그리드**: 52주 × 7일 = 364개 셀

### 3. 테스트 환경 (cdn-test.html)
- **CDN 로드 상태 확인**: 위젯 라이브러리 로딩 상태 모니터링
- **동시 테스트**: 두 버전 위젯의 동시 작동 테스트
- **RSS 분석 결과**: 프록시 서버를 통한 데이터 분석 결과 표시

---


##  API 엔드포인트

| 엔드포인트 | 기능 | 응답 형식 | 설명 |
|------------|------|-----------|------|
| `/health` | 서버 상태 확인 | `{status: "OK", timestamp: "..."}` | 프록시 서버 상태 모니터링 |
| `/proxy/rss?url=...` | RSS 피드 프록시 | 원본 XML 콘텐츠 | CORS 우회를 위한 RSS 프록시 |
| `/analyze/rss?url=...` | RSS 데이터 분석 | `{"2024-01-01": 2, "2024-01-02": 1}` | 날짜별 게시물 수 분석 |

---

## 🔧 설정 및 커스터마이징

### HTML 속성 기반 설정
```html
<div data-graden-widget
     data-rss-url="https://pearlluck.tistory.com/rss"
     data-title="블로그 활동"
     data-update-interval="86400000"
     data-show-legend="true"
     data-show-footer="true">
</div>
```

### JavaScript API 기반 설정
```javascript
const widget = new GradenWidget('#container', {
    rssUrl: 'https://pearlluck.tistory.com/rss',
    title: '커스텀 제목',
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

---

## ⚠️ 주의사항 및 제한사항

### 필수 요구사항
- **프록시 서버 실행**: CORS 문제 해결을 위해 로컬 프록시 서버 실행 필요
- **RSS 피드 형식**: 표준 RSS 2.0 또는 Atom 형식 지원
- **브라우저 호환성**: ES6+ 지원 브라우저 필요

### 제한사항
- **데이터 정확성**: RSS 피드의 날짜 정보 품질에 의존
- **네트워크 의존성**: 외부 RSS 피드 접근성에 영향받음
- **로컬 개발 환경**: 프록시 서버가 localhost에서만 실행

---

##  설치 및 실행 방법

### 1. 의존성 설치
```bash
npm install cors express node-fetch xml2js
```

### 2. 프록시 서버 실행
```bash
node proxy-server.js
```

### 3. HTML 페이지에서 위젯 사용
```html
<script src="https://unpkg.com/blog-garden-widget@latest/blog-garden-widget.js"></script>
<div data-graden-widget data-rss-url="YOUR_RSS_URL"></div>
```

---

##  성능 및 최적화

### 클라이언트 최적화
- **지연 로딩**: 필요할 때만 위젯 초기화
- **메모리 관리**: destroy() 메서드로 리소스 정리
- **CSS 최적화**: 동적 스타일 주입으로 번들 크기 감소

### 서버 최적화
- **캐싱**: RSS 피드 데이터 캐싱으로 중복 요청 방지
- **에러 처리**: 네트워크 오류에 대한 graceful degradation
- **로깅**: 상세한 요청/응답 로깅으로 디버깅 지원


---

## 📚 참고 자료

- [GitHub Contribution Graph](https://github.com/contributions)
- [RSS 2.0 Specification](https://cyber.harvard.edu/rss/rss.html)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

*이 문서는 Blog Garden Widget의 전체 구조와 아키텍처를 이해하는 데 도움이 됩니다. 추가 질문이나 개선 사항이 있으시면 언제든지 문의해 주세요.*
