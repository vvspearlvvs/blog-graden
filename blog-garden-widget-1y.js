/**
 * Graden Widget - GitHub Style Blog Activity Visualization
 * Version: 1.0.0
 * Author: Blog Garden
 * License: MIT
 */

(function(window, document) {
    'use strict';

    // CSS 스타일 동적 추가
    function injectStyles() {
        const styleId = 'graden-widget-1y-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .graden-widget-1y {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
                width: 1000px;
                min-width: 1000px;
                padding: 20px;
                background: #555 !important;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                margin: 20px 0;
                box-sizing: border-box;
            }

            /* 1년 버전 전용 그리드 스타일 */
            .graden-widget-1y .activity-grid {
                display: flex;
                gap: 4px;
                margin-bottom: 16px;
                overflow: visible;
                width: 960px;
                min-width: 960px;
            }

            .activity-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }

            .activity-title {
                font-size: 18px;
                font-weight: 600;
                color: #ffffff;
                margin: 0;
            }

            .activity-legend {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
                color: #e1e4e8;
            }

            .legend-item {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .legend-colors {
                display: flex;
                gap: 2px;
            }

            .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 2px;
            }

            /* 3개월 버전과 공통으로 사용되는 기본 그리드 스타일 */
            .activity-grid {
                display: flex;
                gap: 4px;
                margin-bottom: 16px;
            }

            .week-column {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            /* 1년 버전 전용 day-cell 스타일 */
            .graden-widget-1y .day-cell {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                cursor: pointer;
                transition: transform 0.1s ease;
                position: relative;
            }

            /* 3개월 버전과 공통으로 사용되는 기본 day-cell 스타일 */
            .day-cell {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                cursor: pointer;
                transition: transform 0.1s ease;
                position: relative;
            }

            /* 1년 버전 전용 hover 효과 */
            .graden-widget-1y .day-cell:hover {
                transform: scale(1.2);
            }

            /* 3개월 버전과 공통으로 사용되는 기본 hover 효과 */
            .day-cell:hover {
                transform: scale(1.2);
            }

            .day-cell.today {
                outline: 2px solid #0969da;
                outline-offset: 2px;
            }

            .day-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #24292f;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease, visibility 0.2s ease;
                margin-bottom: 8px;
                pointer-events: none;
            }

            .day-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 4px solid transparent;
                border-top-color: #24292f;
            }

            .day-cell:hover .day-tooltip {
                opacity: 1;
                visibility: visible;
            }

            .activity-footer {
                text-align: center;
                font-size: 11px;
                color: #e0e0e0;
            }

            .loading {
                text-align: center;
                padding: 40px 20px;
                color: #e0e0e0;
            }

            .error {
                text-align: center;
                padding: 20px;
                color: #cf222e;
                background: #ffebe9;
                border-radius: 6px;
                border: 1px solid #ff8182;
            }

            @media (max-width: 768px) {
                .day-cell {
                    width: 10px;
                    height: 10px;
                }
                
                .legend-color {
                    width: 10px;
                    height: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // GradenWidget1Y 클래스
    class GradenWidget1Y {
        constructor(container, options = {}) {
            this.container = typeof container === 'string' ? document.querySelector(container) : container;
            this.options = {
                rssUrl: options.rssUrl || 'https://pearlluck.tistory.com/rss',
                title: options.title || '활동 기록',
                updateInterval: options.updateInterval || 24 * 60 * 60 * 1000, // 24시간
                showLegend: options.showLegend !== false,
                showFooter: options.showFooter !== false,
                colors: options.colors || {
                    0: '#ebedef',
                    1: '#9be9a8',
                    2: '#40c463',
                    3: '#30a14e',
                    4: '#216e39'
                }
            };

            this.data = {};
            this.weeks = [];
            this.maxCount = 1;
            this.intervalId = null;

            if (!this.container) {
                throw new Error('Container element not found');
            }

            this.init();
        }

        async init() {
            try {
                injectStyles();
                this.render();
                await this.fetchActivityData();
                this.generateGrid();
                this.startAutoUpdate();
            } catch (error) {
                this.showError('데이터를 불러올 수 없습니다.');
                console.error('Graden Widget initialization error:', error);
            }
        }

        render() {
            this.container.innerHTML = `
                <div class="graden-widget-1y" style="background:#555;">
                    <div class="activity-header">
                        <h3 class="activity-title">${this.options.title}</h3>
                        ${this.options.showLegend ? `
                            <div class="activity-legend">
                                <span class="legend-item">
                                    <span>적음</span>
                                    <div class="legend-colors">
                                        <div class="legend-color" style="background-color: ${this.options.colors[0]};"></div>
                                        <div class="legend-color" style="background-color: ${this.options.colors[1]};"></div>
                                        <div class="legend-color" style="background-color: ${this.options.colors[2]};"></div>
                                        <div class="legend-color" style="background-color: ${this.options.colors[3]};"></div>
                                        <div class="legend-color" style="background-color: ${this.options.colors[4]};"></div>
                                    </div>
                                    <span>많음</span>
                                </span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div id="graden-widget-1y-grid-${this.container.id || 'default'}" class="activity-grid">
                        <div class="loading">데이터를 불러오는 중...</div>
                    </div>
                    
                    ${this.options.showFooter ? `
                        <div class="activity-footer">
                            최근 1년간의 활동을 보여줍니다
                        </div>
                    ` : ''}
                </div>
            `;
        }

        async fetchActivityData() {
            try {
                // 로컬 프록시 서버 사용 (가장 안정적)
                let dateCounts = null;
                
                // 방법 1: 로컬 프록시 서버의 분석 엔드포인트 시도
                try {
                    const analyzeUrl = `http://localhost:3001/analyze/rss?url=${encodeURIComponent(this.options.rssUrl)}`;
                    const response = await fetch(analyzeUrl);
                    
                    if (response.ok) {
                        dateCounts = await response.json();
                        console.log('로컬 프록시 서버로 RSS 분석 성공');
                    } else {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                } catch (error) {
                    console.log('로컬 프록시 서버 실패, allorigins.win 시도:', error.message);
                }
                
                // 방법 2: allorigins.win 시도 (백업)
                if (!dateCounts) {
                    try {
                        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(this.options.rssUrl)}`;
                        const response = await fetch(proxyUrl);
                        
                        if (response.ok) {
                            const result = await response.json();
                            const rssText = result.contents;
                            
                            // RSS 파싱
                            const parser = new DOMParser();
                            const xmlDoc = parser.parseFromString(rssText, 'text/xml');
                            
                            // 날짜별 게시물 수 계산
                            dateCounts = {};
                            const items = xmlDoc.querySelectorAll('item');
                            
                            items.forEach(item => {
                                const pubDate = item.querySelector('pubDate');
                                if (pubDate && pubDate.textContent) {
                                    const date = new Date(pubDate.textContent);
                                    const dateString = date.toISOString().split('T')[0];
                                    dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
                                }
                            });
                            
                            console.log('allorigins.win 프록시로 RSS 로드 성공');
                        }
                    } catch (error) {
                        console.log('allorigins.win 프록시 실패:', error.message);
                    }
                }
                
                if (!dateCounts) {
                    throw new Error('프록시 서비스가 실패했습니다. 로컬 프록시 서버가 실행 중인지 확인하세요.');
                }

                this.data = dateCounts;
                this.maxCount = Math.max(...Object.values(this.data), 1);
                
                console.log('RSS 데이터 로드 완료:', new Date().toLocaleString('ko-KR'));
            } catch (error) {
                console.error('RSS 데이터 로드 실패:', error);
                console.error('에러 상세 정보:', {
                    message: error.message,
                    stack: error.stack,
                    rssUrl: this.options.rssUrl
                });
                throw error;
            }
        }

        generateGrid() {
            console.log('=== 1년 버전 위젯 generateGrid 시작 ===');
            
            // 그리드 컨테이너를 찾는 방법 개선
            let gridContainer = document.getElementById(`graden-widget-1y-grid-${this.container.id || 'default'}`);
            console.log('ID로 찾은 그리드 컨테이너:', gridContainer);
            
            // 위 방법으로 찾지 못한 경우, 컨테이너 내부에서 직접 찾기
            if (!gridContainer) {
                gridContainer = this.container.querySelector('.activity-grid');
                console.log('클래스로 찾은 그리드 컨테이너:', gridContainer);
            }
            
            // 여전히 찾지 못한 경우, 새로 생성
            if (!gridContainer) {
                console.log('그리드 컨테이너를 새로 생성합니다.');
                gridContainer = document.createElement('div');
                gridContainer.className = 'activity-grid';
                this.container.appendChild(gridContainer);
            }
            
            if (!gridContainer) {
                console.error('그리드 컨테이너를 찾을 수 없습니다.');
                return;
            }
            
            console.log('최종 그리드 컨테이너:', gridContainer);

            gridContainer.innerHTML = '';

            // 최근 1년간의 날짜 생성 (약 53주)
            const endDate = new Date();
            const startDate = new Date(endDate.getTime() - (364 * 24 * 60 * 60 * 1000)); // 364일
            
            console.log('시작 날짜:', startDate.toLocaleDateString('ko-KR'));
            console.log('종료 날짜:', endDate.toLocaleDateString('ko-KR'));
            
            const allDates = [];
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                allDates.push(new Date(d));
            }
            
            console.log('생성된 총 날짜 수:', allDates.length);

            // 주별로 그룹화
            this.weeks = [];
            let currentWeek = [];
            
            allDates.forEach(date => {
                currentWeek.push(date);
                
                if (currentWeek.length === 7) {
                    this.weeks.push([...currentWeek]);
                    currentWeek = [];
                }
            });
            
            if (currentWeek.length > 0) {
                this.weeks.push(currentWeek);
            }
            
            console.log('생성된 주(Week) 개수:', this.weeks.length);
            console.log('마지막 주의 날짜 수:', this.weeks[this.weeks.length - 1]?.length || 0);

            // 그리드 렌더링
            this.weeks.forEach((week, weekIndex) => {
                const weekColumn = document.createElement('div');
                weekColumn.className = 'week-column';
                
                week.forEach((date, dayIndex) => {
                    const dayCell = document.createElement('div');
                    const count = this.getActivityCount(date);
                    const isToday = this.isToday(date);
                    
                    dayCell.className = `day-cell ${isToday ? 'today' : ''}`;
                    dayCell.style.backgroundColor = this.getColorByCount(count);
                    
                    // 마우스 이벤트 추가
                    dayCell.addEventListener('mouseenter', () => {
                        this.updateFooterText(date, count);
                    });
                    
                    dayCell.addEventListener('mouseleave', () => {
                        this.resetFooterText();
                    });
                    
                    weekColumn.appendChild(dayCell);
                });
                
                gridContainer.appendChild(weekColumn);
            });
        }

        getActivityCount(date) {
            const dateString = date.toISOString().split('T')[0];
            return this.data[dateString] || 0;
        }

        getColorByCount(count) {
            if (count === 0) return this.options.colors[0];
            if (count <= this.maxCount * 0.25) return this.options.colors[1];
            if (count <= this.maxCount * 0.5) return this.options.colors[2];
            if (count <= this.maxCount * 0.75) return this.options.colors[3];
            return this.options.colors[4];
        }

        isToday(date) {
            const today = new Date();
            return date.toDateString() === today.toDateString();
        }

        getTooltipText(date, count) {
            const formattedDate = date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            if (count === 0) {
                return `${formattedDate}: 게시물 없음`;
            }
            return `${formattedDate}: ${count}개 게시물`;
        }

        updateFooterText(date, count) {
            const footer = this.container.querySelector('.activity-footer');
            if (footer) {
                const formattedDate = date.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                if (count === 0) {
                    footer.textContent = `${formattedDate}: 게시물 없음`;
                } else {
                    footer.textContent = `${formattedDate}: ${count}개 게시물`;
                }
            }
        }

        resetFooterText() {
            const footer = this.container.querySelector('.activity-footer');
            if (footer) {
                footer.textContent = '최근 1년간 활동을 보여줍니다';
            }
        }

        startAutoUpdate() {
            this.intervalId = setInterval(async () => {
                try {
                    console.log('24시간 주기 RSS 데이터 업데이트 시작:', new Date().toLocaleString('ko-KR'));
                    await this.fetchActivityData();
                    this.generateGrid();
                } catch (error) {
                    console.error('자동 업데이트 실패:', error);
                }
            }, this.options.updateInterval);
        }

        showError(message) {
            let gridContainer = document.getElementById(`graden-widget-1y-grid-${this.container.id || 'default'}`);
            
            if (!gridContainer) {
                gridContainer = this.container.querySelector('.activity-grid');
            }
            
            if (gridContainer) {
                gridContainer.innerHTML = `<div class="error">${message}</div>`;
            }
        }

        // 공개 메서드들
        update() {
            return this.fetchActivityData().then(() => {
                this.generateGrid();
            });
        }

        destroy() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            if (this.container) {
                this.container.innerHTML = '';
            }
        }

        setOptions(newOptions) {
            this.options = { ...this.options, ...newOptions };
            this.render();
            this.generateGrid();
        }
    }

    // 전역 객체에 노출
    window.GradenWidget1Y = GradenWidget1Y;

    // 자동 초기화 (data-graden-widget-1y 속성이 있는 요소들)
    function autoInit() {
        const containers = document.querySelectorAll('[data-graden-widget-1y]');
        containers.forEach(container => {
            const options = {};
            
            // data-* 속성에서 옵션 파싱
            if (container.dataset.rssUrl) options.rssUrl = container.dataset.rssUrl;
            if (container.dataset.title) options.title = container.dataset.title;
            if (container.dataset.updateInterval) options.updateInterval = parseInt(container.dataset.updateInterval);
            if (container.dataset.showLegend !== undefined) options.showLegend = container.dataset.showLegend === 'true';
            if (container.dataset.showFooter !== undefined) options.showFooter = container.dataset.showFooter === 'true';

            new GradenWidget1Y(container, options);
        });
    }

    // DOM 로드 완료 시 자동 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

})(window, document); 