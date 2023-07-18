document.addEventListener("DOMContentLoaded", () => {
    const fullPage = document.getElementById("fullPage");
    const section = document.querySelectorAll('#scrollPage section');
    const menuList = document.querySelector('.menuList');
    const navBtn = menuList.querySelectorAll('li');
    const mobBtn = document.querySelector('.mNav');
    const service = document.querySelector('.service');
    const header = document.getElementsByTagName('header')[0];
    const dim = document.querySelector('.dim');
    const floatingBtn = document.getElementById('floatingBtn');
    const mobBtnContainer = document.querySelector('.mob-btn-container');
    const app = document.querySelector('.app');
    const ios = app.querySelector('.iosApp');
    const android = app.querySelector('.androidApp');
    const web = app.querySelector('.web');
    const checkUserAgent = navigator.userAgent.toLowerCase();
    let isMobile= () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    let mainBottom
    let windowH
    let windowW

    const findingHomeBtn = (target) => { // 파인딩 홈 오픈 후 class d-none 지우기
        document.getElementById('findingHomeLink') == null ? target.insertAdjacentHTML('beforeend', `<button id="findingHomeLink" onclick="window.open('')" class="d-none">파인딩 홈</button>`) : null;
    };

    const floatingBtnStyle = (windowW) => {
        document.getElementById('findingHomeLink') !== null ? document.getElementById('findingHomeLink').remove() : null;
        if(windowW < 820 || isMobile()) { // 모바일 and 브라우져 가로가 작아질때
            floatingBtn.classList.add('mob-floating-btn');
            mobBtnContainer.classList.add('d-none');
            service.style.backgroundImage = 'none'
            findingHomeBtn(app);
        } else {
            floatingBtn.classList.remove('mob-floating-btn');
            mobBtnContainer.classList.remove('d-none');
            service.style.backgroundImage = `url('../../assets/img/finding-lab/bg/service_01.webp')`
            findingHomeBtn(header);
            Array.from(service.querySelectorAll('li')).forEach( el => {
                el.addEventListener('mouseenter', e => {
                    service.style.backgroundImage = `url('../../assets/img/finding-lab/bg/${e.target.dataset.img}')`
                });
            });
        }
        if(isMobile()) {
            web.classList.add('d-none');
            if(checkUserAgent.indexOf("iphone") != -1 || checkUserAgent.indexOf("ipad") != -1 || checkUserAgent.indexOf("ipod") != -1) {
                android.classList.add('d-none');
            } else {
                ios.classList.add('d-none');
            }
        } else {
            android.classList.add('d-none');
            ios.classList.add('d-none');
        }
    }

    const fullPageH = () => {
        windowH = window.innerHeight;
        windowW = window.innerWidth;
        fullPage.style.height = `${windowH}px`;
        if(windowW > 820) {
            Array.from(section).forEach( el => {
                el.style.height = `${windowH}px`
            })
        }
        floatingBtnStyle(windowW);
    }
    fullPageH();

    const fullPageS = () => {
        mainBottom = fullPage.getBoundingClientRect().bottom;
        if(mainBottom+100 < windowH){ // 메인에서 스크롤 아래로
            header.classList.add('subNav');
            floatingBtn.classList.add('mob-floating-btn');
            mobBtnContainer.classList.add('d-none')

        } else if(mainBottom+500 > windowH){ // 메인 보일때
            header.classList.remove('subNav');
            if(windowW > 820) {
                floatingBtn.classList.remove('mob-floating-btn');
                mobBtnContainer.classList.remove('d-none')
            }
        }
        if(mobBtn.classList.contains('on')){
            removeClass()
        }
        Array.from(section).forEach( el => {
            if(el.getBoundingClientRect().top > -(windowH/3) && el.getBoundingClientRect().top < windowH/3) {
                Array.from(navBtn).forEach( gnb => {
                    gnb.classList.remove('active');
                    if(gnb.dataset.scroll === el.id) {
                        document.querySelector(`[data-scroll= ${el.id}]`).classList.add('active');
                    }
                })
            }
        })
    }

    const navLink = e => {
        let scroll = e.target.dataset.scroll;
        let scrollY = window.scrollY + document.getElementById(scroll).getBoundingClientRect().top;
        window.scrollTo(0,scrollY);
        if(isMobile()) {
            Array.from(navBtn).forEach( el => {
                el.classList.remove('active');
            });
            if(scroll !== 'fullPage'){
                header.classList.add('subNav');
                e.target.classList.add('active');
            } else {
                header.classList.remove('subNav');
            }
            removeClass();
            mobBtnContainerClose();
        }
    }
    
    const removeClass = () => {
        mobBtn.classList.remove('on');
        menuList.classList.remove('down');
        dim.classList.remove('dimOn');
    }
    
    const mNav = () => {
        if(!mobBtn.classList.contains('on')){
            mobBtn.classList.add('on');
            menuList.classList.add('down');
            dim.classList.add('dimOn');
            header.classList.add('subNav');
        } else {
            removeClass()
            window.scrollY === 0 ? header.classList.remove('subNav') : null;
        }
    }
    const png = '.png';
    for (let i = 1; i < 16; i++) {
        document.getElementsByClassName('clientList')[0].insertAdjacentHTML('beforeend', `<li><p style="background-image:url('../../assets/img/finding-lab/client/${i+png}')">주요 고객사 로고 이미지</p></li>`);
    }

    const clientSubList = ['원진아이앤디', '핵코', '동구밭', '와이즈알앤디', '에이스엔터테인먼트', '에스엘아이 평생교육원', '백퍼센트', '다올비전', '아이니네트웍스', '미디어그룹 사람과숲', '제이에프파트너스', '펫핀스', '아이디큐', '엠아이디파트너스', '디브릿지벤처스', '씨노드', '마켓오브메테리얼', '미르인컴', '비즈스프링', '다이나시스템', '파콤', '베스트핀', '레플러스', '인비전랩', '에이플러스 정보기술', '인포트롤 테크놀로지', '애니포인트미디어', '클로봇', '인터엠디컴퍼니', '제제컴즈', '에스엘포젠', '아이티앤베이직', '델타엑스', '와탭랩스', '난소프트', '비플러스랩', '시너지', '뉴턴정보기술', '링네트', '서울소프트', '플렉스이엔엠', '오가노이드사이언스', '씨엠엑스', '뷰런테크놀로지', '모노리스', '아이테크', '디비비전', '에스에스트레이딩', '팡스카이', '레뷰코퍼레이션', '레듀텍', '리브리오', '러닝뱅크', '디티에스아이', '액티브스', '케어마인드', '업템포글로벌', '초원식품', '원큐브마케팅', '브레싱스', '삼분의일', '인스웨이브 시스템즈', '빅팟', '프롬더레드', '스템위드', '로완', '굿스플로', '비포플레이', '송아리아이티', '트래블월렛', '에이치알니즈', '에이트원', '에이팀벤처스', '테크빌교육', '로콘', '김집사', '디지털다임', '시어스랩', '상생소프트', '아티웰스', '비본데이즈', '투씨엘시스템', '넥스트케이', '더매트릭스', '단군소프트', '베이비드로우', '테이크솔루션', '로댄어패럴', '엠넷소프트', '아이투맥스', '블록오디세이', '지아이데이타', '웨이센', '피치솔루션', '홍익과학기술', '포네트', '유비앤에스', '핀마트', '핏투게더','프로보티브', '포엠에스', '아이락 커뮤니케이션', '코보티스'];
    clientSubList.forEach( txt => {
        document.getElementsByClassName('clientSubList')[0].insertAdjacentHTML('beforeend', `<li>${txt}</li>`);
    })

    const webp = '.webp';
    for (let i = 1; i < 6; i++) {
        document.getElementsByClassName('aboutImg')[0].insertAdjacentHTML('beforeend', `<li style="background-image:url('../../assets/img/finding-lab/about/${i+webp}')">파인딩 말풍선 이미지</li>`);
    }

    const mobBtnContainerClose = ()=> {
        if(floatingBtn.classList.contains('mob-floating-btn')) {
            floatingBtn.classList.remove('active');
            mobBtnContainer.classList.remove('fadeInUp');
            mobBtnContainer.classList.add('d-none');
        }
    }

    window.addEventListener('scroll', (e) => {
        !isMobile() ? fullPageS() : null; //피씨 일때만
        mobBtnContainerClose();

        const section01 = document.getElementById('section_1');
        const section02 = document.getElementById('section_2');
        let time=500;

        if(section01.getBoundingClientRect().top < (windowH/3)*2 && section01.getBoundingClientRect().top > windowH/3) {
            section01.querySelector('h2').classList.add('fadeInLeft');

            Array.from(section01.querySelectorAll('li')).forEach( (el, idx) => {

                !el.classList.contains('fadeInUp') && setTimeout( ()=> el.classList.add('fadeInUp'), time*idx++);
            });
        }
        if(section02.getBoundingClientRect().top < (windowH/3)*2 && section02.getBoundingClientRect().top > windowH/3) {
            section02.querySelector('h2').classList.add('fadeInLeft');

            Array.from(section02.querySelectorAll('li')).forEach( (el, idx) => {

                !el.classList.contains('fadeInLeft') && setTimeout( ()=> el.classList.add('fadeInLeft'), time*idx++);
            });
        }

    });

    floatingBtn.addEventListener("click", () => {
        if(floatingBtn.classList.contains('mob-floating-btn')) {
            if(mobBtnContainer.classList.contains('d-none')) {
                mobBtnContainer.classList.remove('d-none')
                mobBtnContainer.classList.add('fadeInUp')
                floatingBtn.classList.add('active')
            } else {
                mobBtnContainerClose();
            }
        }
    });
    document.addEventListener("click", e => {
        e.preventDefault();
        undefined !== e.target.dataset.scroll ? navLink(e) : null;
        dim === e.target ? removeClass() : null;
    });
    
    mobBtn.addEventListener("click", e => {
        e.preventDefault();
        mNav()
    });

    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout( fullPageH, 400);
    });

    let startX
    window.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageY;
    });
    
    window.addEventListener('touchmove', e => {
        mainBottom = fullPage.getBoundingClientRect().bottom
        dim === e.touches[0].target ? removeClass() : null;
        if(startX < e.changedTouches[0].pageY && mainBottom > (windowH - 50)){ //아래방향
            header.classList.remove('subNav');
        } else {
            header.classList.add('subNav')
        }
    });
    
    // window.addEventListener('touchend', (e) => {
    //     if(startX < e.changedTouches[0].pageY && mainBottom > (windowH/3)){ //위로
    //         header.classList.remove('subNav');
    //         window.scrollTo(0,0)
    //     }
    // });
});

window.addEventListener('load', () => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0,0)
});

