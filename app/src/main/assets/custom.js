window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ========== 请根据你的实际情况修改这里 ==========
// 情况1：网页在线上（如 GitHub Pages）
const BASE_URL = 'https://mayipan.github.io/';   // 末尾记得加斜杠

// 情况2：如果网页是 App 内的本地文件，把这行改成 const BASE_URL = ''; 然后用相对路径
// const BASE_URL = '';

// 三个页面的文件名（顺序即底部按钮顺序）
const PAGES = [
    { file: 'xinao.html', name: '采集' },
    { file: 'i.html',     name: '工具' },
    { file: 'tj.html',    name: '统计' }
];

// 自动拼接完整URL
const PAGE_URLS = PAGES.map(p => BASE_URL + p.file);
const PAGE_NAMES = PAGES.map(p => p.name);
// ========== 以上为配置区，下方代码无需修改 ==========

(function() {
    // 1. 拦截所有链接点击（让返回键有效）
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a');
        if (anchor && anchor.href && !anchor.href.startsWith('javascript:')) {
            e.preventDefault();
            location.href = anchor.href;
        }
    }, { capture: true });

    // 2. 拦截 window.open
    window.open = function(url) {
        location.href = url;
    };

    // 3. 添加底部导航栏
    window.addEventListener('DOMContentLoaded', function() {
        if (document.getElementById('custom-bottom-nav')) return;

        const nav = document.createElement('div');
        nav.id = 'custom-bottom-nav';
        nav.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: rgba(30, 30, 40, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255,255,255,0.2);
            padding: 8px 0 12px;
            z-index: 9999;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        `;

        PAGE_URLS.forEach((url, idx) => {
            const btn = document.createElement('button');
            btn.textContent = PAGE_NAMES[idx];
            btn.style.cssText = `
                flex: 1;
                background: transparent;
                border: none;
                color: #eeeeee;
                font-size: 16px;
                font-weight: 500;
                padding: 8px 0;
                margin: 0 4px;
                border-radius: 30px;
                transition: all 0.2s;
                cursor: pointer;
            `;
            // 高亮当前页面
            if (location.href === url || (BASE_URL === '' && location.href.endsWith(PAGES[idx].file))) {
                btn.style.background = '#007aff';
                btn.style.color = 'white';
            }
            btn.onclick = () => { location.href = url; };
            nav.appendChild(btn);
        });

        document.body.appendChild(nav);
        document.body.style.paddingBottom = '60px';
    });
})();