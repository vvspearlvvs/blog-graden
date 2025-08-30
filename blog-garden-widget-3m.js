/**
 * Graden Widget - GitHub Style Blog Activity Visualization (3 Months)
 * Version: 2.0.0
 * Author: Blog Garden
 * License: MIT
 */

(function(window, document) {
    'use strict';

    // CSS 스타일 동적 추가
    function injectStyles() {
        const styleId = 'graden-widget-3m-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .graden-widget-3m {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
                width: 250px;
                max-width: 250px;
                padding: 20px;
                background: #555 !important;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                margin: 20px 0;
                box-sizing: border-box;
                overflow: hidden;
            }

            /* 3개월 버전 전용 그리드 스타일 */
            .graden-widget-3m .activity-grid {
                display: flex;
                gap: 4px;
                margin-bottom: 16px;
                overflow: hidden;
                width: 210px;
                max-width: 210px;
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
                flex-shrink: 0;
                min-width: 0;
                width: 14px;
            }

            /* 3개월 버전 전용 day-cell 스타일 */
            .graden-widget-3m .day-cell {
                width: 12px;
                height: 12px;
                border-radius: 2px;
                cursor: pointer;
                transition: transform 0.1s ease;
                position: relative;
                flex-shrink: 0;
                min-width: 0;
                max-width: 12px;
            }

            /* 오늘 날짜 표시 */
            .graden-widget-3m .day-cell.today {
                border: 2px solid #ffffff;
                box-sizing: border-box;
            }

            .graden-widget-3m .day-cell:hover {
                transform: scale(1.2);
                z-index: 10;
            }

            /* 활동 레벨별 색상 (기본값) */
            .level-0 { background-color: #ebedef; }
            .level-1 { background-color: #9be9a8; }
            .level-2 { background-color: #40c463; }
            .level-3 { background-color: #30a14e; }
            .level-4 { background-color: #216e39; }

            .activity-footer {
                font-size: 12px;
                color: #e1e4e8;
                text-align: center;
                margin-top: 16px;
                padding-top: 8px;
                border-top: 1px solid #333;
            }

            .loading {
                color: #e1e4e8;
                text-align: center;
                padding: 40px 0;
                font-size: 14px;
            }

            .error {
                color: #f85149;
                text-align: center;
                padding: 40px 0;
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }

    // 날짜 범위를 생성하는 함수 (3개월)
    function generateDateRange() {
        const dates = [];
        const today = new Date();
        const startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 3); // 3개월 전부터

        for (let date = new Date(startDate); date <= today; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }

        return dates;
    }

    // RSS URL에서 프록시 서버를 통해 게시물 날짜 데이터를 가져오는 함수
    async function fetchRSSData(rssUrl) {
        try {
            // 방법 1: 로컬 프록시 서버의 분석 엔드포인트 시도
            try {
                const analyzeUrl = `http://localhost:3001/analyze/rss?url=${encodeURIComponent(rssUrl)}`;
                const response = await fetch(analyzeUrl);
                
                if (response.ok) {
                    const dateCounts = await response.json();
                    console.log('로컬 프록시 서버로 RSS 분석 성공');
                    return dateCounts;
                }
            } catch (error) {
                console.log('로컬 프록시 서버 연결 실패, 배포된 서버로 시도');
            }

            // 방법 2: 배포된 프록시 서버의 분석 엔드포인트 시도
            try {
                const deployedAnalyzeUrl = `https://blog-garden-widget.vercel.app/analyze/rss?url=${encodeURIComponent(rssUrl)}`;
                const response = await fetch(deployedAnalyzeUrl);
                
                if (response.ok) {
                    const dateCounts = await response.json();
                    console.log('배포된 프록시 서버로 RSS 분석 성공');
                    return dateCounts;
                }
            } catch (error) {
                console.log('배포된 프록시 서버 연결 실패');
            }

            // 방법 3: CORS 프록시를 통한 직접 RSS 파싱 시도
            const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
            const response = await fetch(corsProxyUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            const items = xmlDoc.querySelectorAll('item');
            const dateCounts = {};
            
            items.forEach(item => {
                const pubDate = item.querySelector('pubDate');
                if (pubDate) {
                    const date = new Date(pubDate.textContent);
                    const dateString = date.toISOString().split('T')[0];
                    dateCounts[dateString] = (dateCounts[dateString] || 0) + 1;
                }
            });
            
            console.log('CORS 프록시를 통한 RSS 파싱 성공');
            return dateCounts;
            
        } catch (error) {
            console.error('RSS 데이터 가져오기 실패:', error);
            return {};
        }
    }

    class GradenWidget3M {
        constructor(container, options = {}) {
            this.container = typeof container === 'string' ? document.querySelector(container) : container;
            
            // 기본 옵션 설정
            const defaultOptions = {
                rssUrl: 'https://pearlluck.tistory.com/rss',
                title: '활동 기록 (3개월)',
                updateInterval: 24 * 60 * 60 * 1000, // 24시간
                showLegend: true,
                showFooter: true,
                colors: {
                    0: '#ebedef',
                    1: '#9be9a8',
                    2: '#40c463',
                    3: '#30a14e',
                    4: '#216e39'
                }
            };
            
            // 사용자 옵션과 기본 옵션 병합
            this.options = Object.assign({}, defaultOptions, options);
            
            // colors 옵션 별도 처리 (깊은 병합)
            if (options.colors) {
                this.options.colors = Object.assign({}, defaultOptions.colors, options.colors);
            }

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
                console.error('Graden Widget 3M initialization error:', error);
            }
        }

        render() {
            this.container.innerHTML = `
                <div class="graden-widget-3m" style="background:#555;">
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
                    
                    <div id="graden-widget-3m-grid-${this.container.id || 'default'}" class="activity-grid">
                        <div class="loading">데이터를 불러오는 중...</div>
                    </div>
                    
                    ${this.options.showFooter ? `
                        <div class="activity-footer">
                            최근 3개월간의 활동을 보여줍니다
                        </div>
                    ` : ''}
                </div>
            `;
        }

        async fetchActivityData() {
            try {
                const dateCounts = await fetchRSSData(this.options.rssUrl);
                this.data = dateCounts;
                
                // 최대 게시물 수 계산
                this.maxCount = Math.max(...Object.values(this.data), 1);
                console.log('Activity data loaded:', this.data);
                console.log('Max count:', this.maxCount);
            } catch (error) {
                console.error('Failed to fetch activity data:', error);
                this.data = {};
            }
        }

        generateGrid() {
            const gridContainer = this.container.querySelector(`#graden-widget-3m-grid-${this.container.id || 'default'}`);
            if (!gridContainer) return;

            gridContainer.innerHTML = '';

            // 3개월 범위의 날짜 생성
            const allDates = generateDateRange();
            
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
                footer.textContent = '최근 3개월간의 활동을 보여줍니다';
            }
        }

        showError(message) {
            const gridContainer = this.container.querySelector(`#graden-widget-3m-grid-${this.container.id || 'default'}`);
            if (gridContainer) {
                gridContainer.innerHTML = `<div class="error">${message}</div>`;
            }
        }

        startAutoUpdate() {
            // 자동 업데이트 간격 설정
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            
            this.intervalId = setInterval(async () => {
                try {
                    await this.fetchActivityData();
                    this.generateGrid();
                } catch (error) {
                    console.error('Auto update failed:', error);
                }
            }, this.options.updateInterval);
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

        updateOptions(newOptions) {
            // 옵션 업데이트
            this.options = Object.assign({}, this.options, newOptions);
            
            // colors 옵션 별도 처리 (깊은 병합)
            if (newOptions.colors) {
                this.options.colors = Object.assign({}, this.options.colors, newOptions.colors);
            }
            
            // 다시 렌더링
            this.render();
            this.generateGrid();
        }
    }

    // 전역 객체에 클래스 등록
    window.GradenWidget3M = GradenWidget3M;

    // DOM이 로드된 후 자동 초기화
    document.addEventListener('DOMContentLoaded', function() {
        // data-graden-widget-3m 속성을 가진 요소들 자동 초기화
        const widgets = document.querySelectorAll('[data-graden-widget-3m]');
        
        widgets.forEach(element => {
            const rssUrl = element.getAttribute('data-rss-url');
            const title = element.getAttribute('data-title') || '활동 기록 (3개월)';
            const showLegend = element.getAttribute('data-show-legend') !== 'false';
            const showFooter = element.getAttribute('data-show-footer') !== 'false';
            
            // 커스텀 색상 파싱
            let colors = {};
            for (let i = 0; i <= 4; i++) {
                const color = element.getAttribute(`data-color-${i}`);
                if (color) {
                    colors[i] = color;
                }
            }
            
            const options = {
                rssUrl,
                title,
                showLegend,
                showFooter
            };
            
            if (Object.keys(colors).length > 0) {
                options.colors = colors;
            }
            
            new GradenWidget3M(element, options);
        });
    });

})(window, document); 